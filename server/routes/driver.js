const router = require("express").Router();
const Driver = require("../models/Driver");
const Booking = require("../models/Booking");
const bcrypt = require("bcrypt");
const { protect, requireDriver } = require("../middleware/auth");

router.use(protect, requireDriver);

// ── GET /api/driver/dashboard ─────────────────────────────────────────────
router.get("/dashboard", async (req, res) => {
  try {
    const driver = await Driver.findById(req.user._id);

    const [pending, completed, total] = await Promise.all([
      Booking.countDocuments({
        location: { $regex: new RegExp(`^${driver.place.trim()}$`, "i") },
        status: "pending",
      }),
      Booking.countDocuments({ driverId: driver._id, status: "completed" }),
      Booking.countDocuments({ driverId: driver._id }),
    ]);

    // Pending bookings in driver's place
    const pendingBookings = await Booking.find({
      location: { $regex: new RegExp(`^${driver.place.trim()}$`, "i") },
      status: "pending",
    })
      .populate("userId", "fullName")
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      driver: {
        fullName: driver.fullName,
        place: driver.place,
        isVerified: driver.isVerified,
      },
      stats: {
        completedPickups: completed,
        pendingRequests: pending,
        totalPickups: total,
      },
      pendingBookings: pendingBookings.map((b) => ({
        id: b._id,
        userName: b.userId?.fullName ?? "User",
        address: b.address,
        items: b.items,
        scheduledDate: b.scheduledDate,
        timeSlot: b.timeSlot,
      })),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ── GET /api/driver/active-pickup/:id ─────────────────────────────────────
router.get("/active-pickup/:id", async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      driverId: req.user._id,
      status: { $in: ["accepted", "in_progress"] },
    }).populate("userId", "fullName");

    if (!booking)
      return res.status(404).json({ message: "Active pickup not found" });

    res.json({
      id: booking._id,
      userName: booking.userId?.fullName ?? "User",
      address: booking.address,
      scheduledDate: booking.scheduledDate,
      timeSlot: booking.timeSlot,
      items: booking.items,
      notes: booking.notes,
      status: booking.status,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ── GET /api/driver/pickups ───────────────────────────────────────────────
// Driver's completed pickup history
router.get("/pickups", async (req, res) => {
  try {
    const pickups = await Booking.find({
      driverId: req.user._id,
      status: "completed",
    })
      .sort({ completedAt: -1 })
      .populate("userId", "fullName");

    res.json({
      pickups: pickups.map((p) => ({
        id: p._id,
        date: p.scheduledDate,
        userName: p.userId?.fullName ?? "User",
        items: p.items,
      })),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ── GET /api/driver/profile ───────────────────────────────────────────────
router.get("/profile", async (req, res) => {
  try {
    const driver = await Driver.findById(req.user._id).select("-passwordHash");
    res.json({
      fullName: driver.fullName,
      email: driver.email,
      phoneNumber: driver.phoneNumber,
      address: driver.address,
      place: driver.place,
      licenseNumber: driver.licenseNumber,
      isVerified: driver.isVerified,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ── PATCH /api/driver/profile ─────────────────────────────────────────────
// Email and licenseNumber are NOT editable
router.patch("/profile", async (req, res) => {
  try {
    const { fullName, phoneNumber, address, place } = req.body;
    const driver = await Driver.findByIdAndUpdate(
      req.user._id,
      { fullName, phoneNumber, address, place },
      { new: true, runValidators: true },
    ).select("-passwordHash");
    res.json({ message: "Profile updated", driver });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ── POST /api/driver/change-password ─────────────────────────────────────
router.post("/change-password", async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const driver = await Driver.findById(req.user._id);
    const valid = await bcrypt.compare(currentPassword, driver.passwordHash);
    if (!valid)
      return res.status(400).json({ message: "Incorrect current password." });
    driver.passwordHash = await bcrypt.hash(newPassword, 12);
    await driver.save();
    res.json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ── DELETE /api/driver/account ────────────────────────────────────────────
router.delete("/account", async (req, res) => {
  try {
    await Driver.findByIdAndDelete(req.user._id);
    res.json({ message: "Account deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

//newly added route for driver
// POST /api/driver/active-pickup/:id/arrived
router.post("/active-pickup/:id/arrived", async (req, res) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, driverId: req.user._id, status: "accepted" },
      { status: "in_progress" },
      { new: true },
    );
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Arrived status updated" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/driver/active-pickup/:id/complete
router.post("/active-pickup/:id/complete", async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      driverId: req.user._id,
      status: "in_progress",
    });
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Update booking status and credit user points
    booking.status = "completed";
    booking.completedAt = new Date();
    await booking.save();

    // Credit user reward points
    const user = await User.findById(booking.userId);
    if (user) {
      user.rewardPoints = (user.rewardPoints || 0) + 100; // Adjust points as needed
      await user.save();
    }

    res.json({ message: "Pickup completed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
