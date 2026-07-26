const router = require("express").Router();
const User = require("../models/User");
const Booking = require("../models/Booking");
const Reward = require("../models/Reward");
const Order = require("../models/Order");
const bcrypt = require("bcrypt");
const { protect, requireUser } = require("../middleware/auth");

// All routes require authenticated user
router.use(protect, requireUser);

// ── GET /api/user/dashboard ────────────────────────────────────────────────
// Returns stats + recent activity + next upcoming pickup
router.get("/dashboard", async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    const [completedPickups, allPickups, recentRewards, nextPickup] =
      await Promise.all([
        Booking.countDocuments({ userId, status: "completed" }),
        Booking.countDocuments({ userId }),
        Reward.find({ userId }).sort({ createdAt: -1 }).limit(4),
        Booking.findOne({
          userId,
          status: { $in: ["pending", "accepted", "in_progress"] },
        })
          .sort({ scheduledDate: 1 })
          .populate("driverId", "fullName"),
      ]);

    // CO2 saved: rough estimate 1kg per completed pickup
    const co2Saved = `${completedPickups}kg`;

    const recentActivity = recentRewards.map((r) => ({
      id: r._id,
      action: r.reason,
      points: r.points,
      time: r.createdAt,
      type: r.type === "redeemed" ? "redeem" : "scan",
      icon: r.type === "redeemed" ? "🎁" : "♻️",
    }));

    res.json({
      user: {
        name: user.fullName,
        rank: getRank(user.rewardPoints),
        level: getLevel(user.rewardPoints),
        xp: user.rewardPoints % 1000,
        xpNext: 1000,
        memberSince: user.createdAt.toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        }),
      },
      stats: {
        totalPoints: user.rewardPoints,
        itemsRecycled: allPickups,
        co2Saved,
        totalPickups: completedPickups,
      },
      recentActivity,
      nextPickup: nextPickup
        ? {
            id: nextPickup._id,
            date: nextPickup.scheduledDate,
            slot: nextPickup.timeSlot,
            status: nextPickup.status,
          }
        : null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ── GET /api/user/profile ──────────────────────────────────────────────────
router.get("/profile", async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-passwordHash");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address: user.address,
      location: user.location,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ── PATCH /api/user/profile ────────────────────────────────────────────────
// Email is NOT editable here — requires separate verify flow
router.patch("/profile", async (req, res) => {
  try {
    const { fullName, phoneNumber, address, location } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { fullName, phoneNumber, address, location },
      { new: true, runValidators: true },
    ).select("-passwordHash");
    res.json({ message: "Profile updated", user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ── POST /api/user/change-password ────────────────────────────────────────
router.post("/change-password", async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);
    const valid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!valid)
      return res.status(400).json({ message: "Incorrect current password." });
    user.passwordHash = await bcrypt.hash(newPassword, 12);
    await user.save();
    res.json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ── GET /api/user/pickups ──────────────────────────────────────────────────
// User's pickup history
router.get("/pickups", async (req, res) => {
  try {
    const pickups = await Booking.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .populate("driverId", "fullName");

    const formatted = pickups.map((p) => ({
      id: p._id,
      date: p.scheduledDate,
      status: p.status,
      items: p.items,
      points: p.pointsAwarded,
      driver: p.driverId?.fullName ?? "—",
    }));

    res.json({ pickups: formatted });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ── GET /api/user/rewards ──────────────────────────────────────────────────
router.get("/rewards", async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const transactions = await Reward.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    const totalEarned = transactions
      .filter((t) => t.type !== "redeemed")
      .reduce((s, t) => s + t.points, 0);
    const totalRedeemed = Math.abs(
      transactions
        .filter((t) => t.type === "redeemed")
        .reduce((s, t) => s + t.points, 0),
    );

    res.json({
      currentBalance: user.rewardPoints,
      totalEarned,
      totalRedeemed,
      transactions: transactions.map((t) => ({
        id: t._id,
        type: t.type,
        description: t.reason,
        points: t.points,
        date: t.createdAt,
        icon: t.type === "redeemed" ? "🎁" : t.type === "bonus" ? "🔥" : "♻️",
      })),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ── GET /api/user/points ───────────────────────────────────────────────────
// Lightweight — used by ProductDetail to get balance without full profile
router.get("/points", async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("rewardPoints");
    res.json({ points: user.rewardPoints });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ── PATCH /api/user/settings ───────────────────────────────────────────────
// Notification preferences are stored client-side for now;
// extend User model with a settings subdoc when needed
router.patch("/settings", async (req, res) => {
  res.json({ message: "Settings saved" });
});

// ── DELETE /api/user/account ───────────────────────────────────────────────
router.delete("/account", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    res.json({ message: "Account deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ── Helpers ────────────────────────────────────────────────────────────────
function getRank(points) {
  if (points >= 10000) return "Eco Champion";
  if (points >= 5000) return "Green Guardian";
  if (points >= 2000) return "Eco Warrior";
  if (points >= 500) return "Recycler";
  return "Newcomer";
}
function getLevel(points) {
  return Math.floor(points / 1000) + 1;
}

module.exports = router;
