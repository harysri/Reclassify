const mongoose = require("mongoose");

// Each item the user scanned and wants collected
const ItemSchema = new mongoose.Schema(
  {
    wasteType: { type: String, required: true }, // plastic | glass | cardboard | paper | metal | mixed
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false },
);

const BookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      default: null,
    },

    // Items from WasteClassification scan
    items: { type: [ItemSchema], required: true },

    // Pickup address — from SchedulePickup page (pre-filled from user profile)
    address: { type: String, required: true },

    // location must equal a driver's place for matching
    location: { type: String, required: true },

    scheduledDate: { type: String, required: true }, // ISO date string "2024-03-28"
    timeSlot: { type: String, required: true }, // "Morning (8 AM – 12 PM)"

    notes: { type: String, default: "" },

    // pending → accepted → in_progress → completed | cancelled
    status: {
      type: String,
      enum: ["pending", "accepted", "in_progress", "completed", "cancelled"],
      default: "pending",
    },

    // Points credited to user on completion (sum of item points × qty)
    pointsAwarded: { type: Number, default: 0 },

    completedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Booking", BookingSchema);
