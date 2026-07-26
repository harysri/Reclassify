const mongoose = require("mongoose");

// One notification doc per driver per booking.
// When a booking is created, one notification is inserted for every
// verified driver whose place === booking.location.
const NotificationSchema = new mongoose.Schema(
  {
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      required: true,
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    // accepted: true  → this driver accepted the booking
    // accepted: false → declined or not yet actioned
    accepted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Notification", NotificationSchema);
