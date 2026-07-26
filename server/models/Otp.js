const mongoose = require("mongoose");

// Stores a single active OTP per email.
// On each new request the old record is replaced (upsert in the route).
const OTPSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    // 6-digit numeric code (stored as string to preserve leading zeros)
    code: {
      type: String,
      required: true,
    },

    // Which collection to update on reset — "user" | "driver"
    // Determined at send time by searching both collections.
    accountType: {
      type: String,
      enum: ["user", "driver"],
      required: true,
    },

    // OTP expires after 10 minutes.
    // MongoDB TTL index will auto-delete the document after expiry.
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 10 * 60 * 1000), // 10 min
      index: { expireAfterSeconds: 0 },
    },

    // Marked true after the OTP is verified in step 2.
    // Step 3 (reset password) requires verified: true so the OTP
    // cannot be skipped by calling /reset-password directly.
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("OTP", OTPSchema);
