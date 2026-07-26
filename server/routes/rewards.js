const router = require("express").Router();
const Reward = require("../models/Reward");
const { protect, requireUser } = require("../middleware/auth");

// ── GET /api/rewards ──────────────────────────────────────────────────────
// Full reward transaction list for the authenticated user.
// (Same data as /api/user/rewards — kept as a separate route for clarity)
router.get("/", protect, requireUser, async (req, res) => {
  try {
    const transactions = await Reward.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    res.json({ transactions });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
