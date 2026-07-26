const mongoose = require("mongoose");

const DriverSchema = new mongoose.Schema(
  {
    // ── Common registration fields ─────────────────────────────────────────
    fullName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true },
    phoneNumber: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },

    // ── Driver-specific ────────────────────────────────────────────────────
    // place must match a user's location for pickup matching
    place: { type: String, required: true, trim: true },
    licenseNumber: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    // ── Role is always "driver" ────────────────────────────────────────────
    role: { type: String, default: "driver", immutable: true },

    // ── Admin verification — unverified drivers cannot receive bookings ─────
    isVerified: { type: Boolean, default: false },

    // ── Stats ──────────────────────────────────────────────────────────────
    completedPickups: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Driver", DriverSchema);
