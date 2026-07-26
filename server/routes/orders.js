const router = require("express").Router();
const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const Reward = require("../models/Reward");
const { protect, requireUser, requireAdmin } = require("../middleware/auth");

// ── POST /api/orders/create ────────────────────────────────────────────────
// User places an order — deducts points, reduces stock, logs reward transaction
router.post("/create", protect, requireUser, async (req, res) => {
  try {
    const { cartItems, totalCost, deliveryAddress } = req.body;
    // cartItems: [{ id, name, imageUrl, points, quantity }]

    if (!cartItems?.length)
      return res.status(400).json({ message: "Cart is empty" });
    if (!deliveryAddress?.trim())
      return res.status(400).json({ message: "Delivery address is required" });

    const user = await User.findById(req.user._id);
    if (user.rewardPoints < totalCost)
      return res.status(400).json({ message: "Insufficient points" });

    // Verify stock for each item and build order items
    const orderItems = [];
    for (const item of cartItems) {
      const product = await Product.findById(item.id);
      if (!product || !product.isActive)
        return res
          .status(400)
          .json({ message: `Product "${item.name}" is no longer available` });
      if (product.stock < item.quantity)
        return res
          .status(400)
          .json({ message: `Insufficient stock for "${product.name}"` });

      orderItems.push({
        productId: product._id,
        name: product.name,
        imageUrl: product.imageUrl,
        points: product.points,
        quantity: item.quantity,
      });

      // Deduct stock
      await Product.findByIdAndUpdate(product._id, {
        $inc: { stock: -item.quantity },
      });
    }

    // Deduct user points
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { rewardPoints: -totalCost },
    });

    // Create order
    const order = await Order.create({
      userId: req.user._id,
      items: orderItems,
      totalPoints: totalCost,
      deliveryAddress,
    });

    // Log reward transaction (negative — points spent)
    await Reward.create({
      userId: req.user._id,
      orderId: order._id,
      type: "redeemed",
      points: -totalCost,
      reason: `Order placed — ${orderItems.map((i) => i.name).join(", ")}`,
    });

    res.status(201).json({
      message: "Order placed successfully",
      orderId: order._id,
      remainingPoints: user.rewardPoints - totalCost,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ── GET /api/orders ────────────────────────────────────────────────────────
// User's own order history
router.get("/", protect, requireUser, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    res.json({
      orders: orders.map((o) => ({
        id: o._id,
        date: o.createdAt,
        status: o.status,
        total: o.totalPoints,
        items: o.items.map((i) => ({
          name: i.name,
          quantity: i.quantity,
          image: i.imageUrl,
          points: i.points,
        })),
      })),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ── GET /api/orders/:id ────────────────────────────────────────────────────
// Single order detail — accessible by the order owner or admin
router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "userId",
      "fullName",
    );
    if (!order) return res.status(404).json({ message: "Order not found" });

    const isOwner =
      req.user.role === "user" &&
      order.userId._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";
    if (!isOwner && !isAdmin)
      return res.status(403).json({ message: "Access denied" });

    res.json({
      order: {
        id: order._id,
        date: order.createdAt,
        status: order.status,
        totalPoints: order.totalPoints,
        deliveryAddress: order.deliveryAddress,
        userName: order.userId?.fullName ?? "User",
        items: order.items.map((i) => ({
          productId: i.productId,
          name: i.name,
          image: i.imageUrl,
          points: i.points,
          quantity: i.quantity,
          subtotal: i.points * i.quantity,
        })),
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ── GET /api/orders/admin/all ──────────────────────────────────────────────
// Admin — all orders with customer name
router.get("/admin/all", protect, requireAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("userId", "fullName");

    res.json({
      orders: orders.map((o) => ({
        id: o._id,
        userName: o.userId?.fullName ?? "User",
        date: o.createdAt,
        items: o.items.length,
        status: o.status,
        totalPoints: o.totalPoints,
      })),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ── PATCH /api/orders/admin/:id/status ────────────────────────────────────
// Admin updates order status (processing → shipped → delivered)
router.patch("/admin/:id/status", protect, requireAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const valid = ["processing", "shipped", "delivered", "cancelled"];
    if (!valid.includes(status))
      return res.status(400).json({ message: "Invalid status" });

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );
    if (!order) return res.status(404).json({ message: "Order not found" });

    // If cancelled, refund points
    if (status === "cancelled") {
      await User.findByIdAndUpdate(order.userId, {
        $inc: { rewardPoints: order.totalPoints },
      });
      await Reward.create({
        userId: order.userId,
        orderId: order._id,
        type: "earned",
        points: order.totalPoints,
        reason: `Order #${order._id} cancelled — points refunded`,
      });
    }

    res.json({ message: "Order status updated", order });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
