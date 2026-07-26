const router = require("express").Router();
const Booking = require("../models/Booking");
const Driver = require("../models/Driver");
const Notification = require("../models/Notification");
const User = require("../models/User");
const Reward = require("../models/Reward");
const {
  protect,
  requireUser,
  requireVerifiedDriver,
} = require("../middleware/auth");
const { calculatePoints } = require("../config/points");

// ── POST /api/bookings ─────────────────────────────────────────────────────
// User creates a pickup booking. Backend notifies all verified drivers
// whose place === booking.location (first-accept wins).
router.post("/", protect, requireUser, async (req, res) => {
  try {
    const { items, address, location, scheduledDate, timeSlot, notes } =
      req.body;

    if (!items?.length)
      return res.status(400).json({ message: "At least one item is required" });

    const booking = await Booking.create({
      userId: req.user._id,
      items,
      address,
      location,
      scheduledDate,
      timeSlot,
      notes: notes ?? "",
      pointsAwarded: calculatePoints(items),
    });

    // Notify every verified driver in the same place
    const drivers = await Driver.find({
      place: { $regex: new RegExp(`^${location.trim()}$`, "i") },
      isVerified: true,
    });

    if (drivers.length) {
      const notifications = drivers.map((d) => ({
        driverId: d._id,
        bookingId: booking._id,
        message: `New pickup request in ${location} on ${scheduledDate}`,
      }));
      await Notification.insertMany(notifications);
    }

    res.status(201).json({
      message: "Booking created. Drivers in your area have been notified.",
      bookingId: booking._id,
      driversNotified: drivers.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ── GET /api/bookings/pending ──────────────────────────────────────────────
// Verified driver sees pending bookings in their place
router.get("/pending", protect, requireVerifiedDriver, async (req, res) => {
  try {
    const bookings = await Booking.find({
      location: { $regex: new RegExp(`^${req.user.place.trim()}$`, "i") },
      status: "pending",
    }).populate("userId", "fullName");

    const formatted = bookings.map((b) => ({
      id: b._id,
      userName: b.userId?.fullName ?? "User",
      address: b.address,
      items: b.items,
      scheduledDate: b.scheduledDate,
      timeSlot: b.timeSlot,
      notes: b.notes,
    }));

    res.json({ pendingBookings: formatted });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ── POST /api/bookings/:id/accept ──────────────────────────────────────────
// Atomic first-accept. Returns 409 if already taken by another driver.
router.post("/:id/accept", protect, requireVerifiedDriver, async (req, res) => {
  try {
    // findOneAndUpdate with filter status:"pending" is atomic
    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, status: "pending" },
      { $set: { driverId: req.user._id, status: "accepted" } },
      { new: true },
    );

    if (!booking)
      return res
        .status(409)
        .json({ message: "Booking already accepted by another driver" });

    // Mark this driver's notification as accepted, others as read
    await Notification.updateMany(
      { bookingId: booking._id, driverId: req.user._id },
      { $set: { accepted: true, isRead: true } },
    );
    await Notification.updateMany(
      { bookingId: booking._id, driverId: { $ne: req.user._id } },
      { $set: { isRead: true } },
    );

    res.json({ message: "Booking accepted", bookingId: booking._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ── POST /api/bookings/:id/decline ────────────────────────────────────────
// Marks this driver's notification as declined; booking stays open for others
router.post(
  "/:id/decline",
  protect,
  requireVerifiedDriver,
  async (req, res) => {
    try {
      await Notification.updateMany(
        { bookingId: req.params.id, driverId: req.user._id },
        { $set: { isRead: true, accepted: false } },
      );
      res.json({ message: "Booking declined" });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  },
);

// ── POST /api/bookings/:id/arrived ────────────────────────────────────────
// Driver marks themselves as arrived — transitions to in_progress
router.post(
  "/:id/arrived",
  protect,
  requireVerifiedDriver,
  async (req, res) => {
    try {
      const booking = await Booking.findOneAndUpdate(
        { _id: req.params.id, driverId: req.user._id, status: "accepted" },
        { $set: { status: "in_progress" } },
        { new: true },
      );
      if (!booking)
        return res
          .status(404)
          .json({ message: "Booking not found or not assigned to you" });
      res.json({ message: "Status updated to in_progress" });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  },
);

// ── POST /api/bookings/:id/complete ───────────────────────────────────────
// Driver marks pickup complete.
// Backend: credits user reward points + logs reward transaction + updates driver stats
router.post(
  "/:id/complete",
  protect,
  requireVerifiedDriver,
  async (req, res) => {
    try {
      const booking = await Booking.findOneAndUpdate(
        { _id: req.params.id, driverId: req.user._id, status: "in_progress" },
        { $set: { status: "completed", completedAt: new Date() } },
        { new: true },
      );

      if (!booking)
        return res
          .status(404)
          .json({ message: "Booking not found or already completed" });

      const pts = booking.pointsAwarded;

      // Credit user points
      await User.findByIdAndUpdate(booking.userId, {
        $inc: { rewardPoints: pts },
      });

      // Log reward transaction
      await Reward.create({
        userId: booking.userId,
        bookingId: booking._id,
        type: "earned",
        points: pts,
        reason: `Pickup completed — ${booking.items.map((i) => i.wasteType).join(", ")}`,
      });

      // Update driver completed count
      await require("../models/Driver").findByIdAndUpdate(req.user._id, {
        $inc: { completedPickups: 1 },
      });

      res.json({
        message: "Pickup completed. User points credited.",
        pointsAwarded: pts,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },
);

// ── GET /api/bookings/:id ──────────────────────────────────────────────────
// Get single booking detail — accessible by the assigned driver OR the booking's user
router.get("/:id", protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("userId", "fullName")
      .populate("driverId", "fullName");

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const isUser =
      req.user.role === "user" &&
      booking.userId?._id.toString() === req.user._id.toString();
    const isDriver =
      req.user.role === "driver" &&
      booking.driverId?._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isUser && !isDriver && !isAdmin)
      return res.status(403).json({ message: "Access denied" });

    res.json({
      id: booking._id,
      userName: booking.userId?.fullName,
      driverName: booking.driverId?.fullName ?? null,
      address: booking.address,
      location: booking.location,
      scheduledDate: booking.scheduledDate,
      timeSlot: booking.timeSlot,
      items: booking.items,
      notes: booking.notes,
      status: booking.status,
      pointsAwarded: booking.pointsAwarded,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
