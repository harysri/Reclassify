const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
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

    // ── User-specific ──────────────────────────────────────────────────────
    // location must match a driver's place for pickup matching
    location: { type: String, trim: true, default: "" },

    // ── Role: "user" | "admin" ─────────────────────────────────────────────
    role: { type: String, enum: ["user", "admin"], default: "user" },

    // ── Reward points ──────────────────────────────────────────────────────
    rewardPoints: { type: Number, default: 0 },

    // ── Account status ─────────────────────────────────────────────────────
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", UserSchema);
