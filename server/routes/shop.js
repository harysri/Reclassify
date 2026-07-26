const router = require("express").Router();
const Product = require("../models/Product");
const User = require("../models/User");
const upload = require("../middleware/upload");
const { protect, requireUser, requireAdmin } = require("../middleware/auth");

// ── GET /api/shop ──────────────────────────────────────────────────────────
// Public product list for the user-facing shop.
// Returns only active products + the requesting user's points balance.
router.get("/", protect, requireUser, async (req, res) => {
  try {
    const [products, user] = await Promise.all([
      Product.find({ isActive: true }).sort({ points: 1 }),
      User.findById(req.user._id).select("rewardPoints"),
    ]);
    res.json({ products, userPoints: user.rewardPoints });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ── GET /api/shop/product/:id ──────────────────────────────────────────────
router.get("/product/:id", protect, requireUser, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || !product.isActive)
      return res.status(404).json({ message: "Product not found" });
    res.json({ product });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ── POST /api/shop/products/batch ─────────────────────────────────────────
// Cart hydration — returns full product details for an array of IDs
// Body: { ids: ["p1", "p2", ...] }
router.post("/products/batch", protect, requireUser, async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || !ids.length)
      return res.status(400).json({ message: "ids array is required" });

    const [products, user] = await Promise.all([
      Product.find({ _id: { $in: ids } }),
      User.findById(req.user._id).select("rewardPoints"),
    ]);

    res.json({ products, userPoints: user.rewardPoints });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ── POST /api/admin/products/upload ───────────────────────────────────────
// Admin only — uploads a product image, returns the URL
// Frontend receives: { imageUrl: "/uploads/products/filename.jpg" }
router.post(
  "/upload",
  protect,
  requireAdmin,
  upload.single("image"),
  (req, res) => {
    if (!req.file)
      return res.status(400).json({ message: "No image uploaded" });
    const protocol = req.protocol;
    const host = req.get("host");
    const imageUrl = `${protocol}://${host}/uploads/products/${req.file.filename}`;
    res.json({ imageUrl });
  },
);

module.exports = router;
