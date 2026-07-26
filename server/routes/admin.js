const router = require("express").Router();
const User = require("../models/User");
const Driver = require("../models/Driver");
const Booking = require("../models/Booking");
const Product = require("../models/Product");
const Order = require("../models/Order");
const upload = require("../middleware/upload");
const { protect, requireAdmin } = require("../middleware/auth");

// All admin routes require authentication + admin role
router.use(protect, requireAdmin);

// ══════════════════════════════════════════════════════════════════════════
// DASHBOARD
// ══════════════════════════════════════════════════════════════════════════

// ── GET /api/admin/dashboard ──────────────────────────────────────────────
router.get("/dashboard", async (req, res) => {
  try {
    const [
      totalUsers,
      totalDrivers,
      pendingPickups,
      pendingVerifications,
      recentUsers,
      recentDrivers,
      recentPickups,
      recentOrders,
    ] = await Promise.all([
      User.countDocuments({ role: "user" }),
      Driver.countDocuments(),
      Booking.countDocuments({ status: "pending" }),
      Driver.countDocuments({ isVerified: false }),
      User.find({ role: "user" }).sort({ createdAt: -1 }).limit(2),
      Driver.find({ isVerified: false }).sort({ createdAt: -1 }).limit(2),
      Booking.find({ status: "completed" })
        .sort({ updatedAt: -1 })
        .limit(2)
        .populate("userId", "fullName"),
      Order.find()
        .sort({ createdAt: -1 })
        .limit(2)
        .populate("userId", "fullName"),
    ]);

    // Build recent activity feed from all four sources
    const activity = [
      ...recentUsers.map((u) => ({
        id: u._id,
        action: "New user registered",
        subject: u.email,
        time: u.createdAt,
        type: "user",
      })),
      ...recentDrivers.map((d) => ({
        id: d._id,
        action: "Driver awaiting verification",
        subject: d.fullName,
        time: d.createdAt,
        type: "driver",
      })),
      ...recentPickups.map((b) => ({
        id: b._id,
        action: "Pickup completed",
        subject: b._id.toString(),
        time: b.updatedAt,
        type: "pickup",
      })),
      ...recentOrders.map((o) => ({
        id: o._id,
        action: "Order placed",
        subject: o._id.toString(),
        time: o.createdAt,
        type: "product",
      })),
    ]
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      .slice(0, 6)
      .map((a) => ({ ...a, time: timeAgo(a.time) }));

    // Drivers awaiting verification — shown in the alert panel
    const pendingDriverList = await Driver.find({ isVerified: false })
      .sort({ createdAt: 1 })
      .select("fullName place licenseNumber createdAt");

    res.json({
      stats: { totalUsers, totalDrivers, pendingPickups, pendingVerifications },
      recentActivity: activity,
      pendingDrivers: pendingDriverList,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ══════════════════════════════════════════════════════════════════════════
// USER MANAGEMENT
// ══════════════════════════════════════════════════════════════════════════

// ── GET /api/admin/users ──────────────────────────────────────────────────
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({ role: "user" })
      .sort({ createdAt: -1 })
      .select("-passwordHash");

    const withStats = await Promise.all(
      users.map(async (u) => {
        const pickups = await Booking.countDocuments({
          userId: u._id,
          status: "completed",
        });
        return {
          id: u._id,
          fullName: u.fullName,
          email: u.email,
          location: u.location,
          pickups,
          points: u.rewardPoints,
          status: u.status,
        };
      }),
    );

    res.json({ users: withStats });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ── PATCH /api/admin/users/:id/status ─────────────────────────────────────
// Activate or deactivate a user account
router.patch("/users/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    if (!["active", "inactive"].includes(status))
      return res.status(400).json({ message: "Invalid status" });

    const user = await User.findOneAndUpdate(
      { _id: req.params.id, role: "user" },
      { status },
      { new: true },
    ).select("-passwordHash");

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: `User ${status}`, user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ══════════════════════════════════════════════════════════════════════════
// DRIVER MANAGEMENT
// ══════════════════════════════════════════════════════════════════════════

// ── GET /api/admin/drivers ────────────────────────────────────────────────
router.get("/drivers", async (req, res) => {
  try {
    const drivers = await Driver.find()
      .sort({ createdAt: -1 })
      .select("-passwordHash");
    res.json({
      drivers: drivers.map((d) => ({
        id: d._id,
        fullName: d.fullName,
        email: d.email,
        licenseNumber: d.licenseNumber,
        place: d.place,
        completedPickups: d.completedPickups,
        isVerified: d.isVerified,
      })),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ── PATCH /api/admin/drivers/:id/verify ───────────────────────────────────
// Verify or unverify a driver. Verified drivers can receive pickup notifications.
router.patch("/drivers/:id/verify", async (req, res) => {
  try {
    const { isVerified } = req.body;
    if (typeof isVerified !== "boolean")
      return res.status(400).json({ message: "isVerified must be a boolean" });

    const driver = await Driver.findByIdAndUpdate(
      req.params.id,
      { isVerified },
      { new: true },
    ).select("-passwordHash");

    if (!driver) return res.status(404).json({ message: "Driver not found" });
    res.json({
      message: `Driver ${isVerified ? "verified" : "unverified"}`,
      driver,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ── GET /api/admin/drivers/:id ────────────────────────────────────────────
router.get("/drivers/:id", async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id).select("-passwordHash");
    if (!driver) return res.status(404).json({ message: "Driver not found" });
    res.json({ driver });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ══════════════════════════════════════════════════════════════════════════
// PRODUCT MANAGEMENT
// ══════════════════════════════════════════════════════════════════════════

// ── GET /api/admin/products ───────────────────────────────────────────────
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ products });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ── POST /api/admin/products ──────────────────────────────────────────────
router.post("/products", async (req, res) => {
  try {
    const { name, description, points, stock, category, imageUrl, isActive } =
      req.body;
    const product = await Product.create({
      name,
      description,
      points,
      stock,
      category,
      imageUrl: imageUrl ?? "",
      isActive: isActive !== false,
    });
    res.status(201).json({ message: "Product created", product });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ── POST /api/admin/products/upload ──────────────────────────────────────
// Uploads product image to /uploads/products/, returns the URL.
// Frontend sends multipart/form-data with field name "image".
// router.post("/products/upload", upload.single("image"), (req, res) => {
//   if (!req.file) return res.status(400).json({ message: "No image uploaded" });
//   const imageUrl = `/uploads/products/${req.file.filename}`;
//   res.json({ imageUrl });
// });

// ── POST /api/admin/products/upload ──────────────────────────────────────
// Uploads product image to /uploads/products/, returns the URL.
// Frontend sends multipart/form-data with field name "image".
router.post("/products/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No image uploaded" });

  // Get the base URL from the request
  const protocol = req.protocol;
  const host = req.get("host");
  const baseUrl = `${protocol}://${host}`;
  const imageUrl = `${baseUrl}/uploads/products/${req.file.filename}`;

  res.json({ imageUrl });
});

// ── PATCH /api/admin/products/:id ─────────────────────────────────────────
router.patch("/products/:id", async (req, res) => {
  try {
    const { name, description, points, stock, category, imageUrl, isActive } =
      req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, points, stock, category, imageUrl, isActive },
      { new: true, runValidators: true },
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product updated", product });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ── DELETE /api/admin/products/:id ────────────────────────────────────────
// Deletes product record. Image file cleanup can be added with fs.unlink.
router.delete("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Optional: delete image file from disk
    // if (product.imageUrl) {
    //   const filePath = path.join(__dirname, "../", product.imageUrl);
    //   if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    // }

    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ══════════════════════════════════════════════════════════════════════════
// PICKUP OVERSIGHT
// ══════════════════════════════════════════════════════════════════════════

// ── GET /api/admin/pickups ────────────────────────────────────────────────
router.get("/pickups", async (req, res) => {
  try {
    const pickups = await Booking.find()
      .sort({ createdAt: -1 })
      .populate("userId", "fullName")
      .populate("driverId", "fullName");

    res.json({
      pickups: pickups.map((p) => ({
        id: p._id,
        userName: p.userId?.fullName ?? "User",
        driverName: p.driverId?.fullName ?? null,
        place: p.location,
        status: p.status,
        scheduledDate: p.scheduledDate,
        items: p.items,
      })),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ── GET /api/admin/orders ─────────────────────────────────────────────────
router.get("/orders", async (req, res) => {
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

// ══════════════════════════════════════════════════════════════════════════
// Helpers
// ══════════════════════════════════════════════════════════════════════════
function timeAgo(date) {
  const secs = Math.floor((Date.now() - new Date(date)) / 1000);
  if (secs < 60) return "just now";
  if (secs < 3600) return `${Math.floor(secs / 60)} mins ago`;
  if (secs < 86400) return `${Math.floor(secs / 3600)} hours ago`;
  return `${Math.floor(secs / 86400)} days ago`;
}

module.exports = router;
