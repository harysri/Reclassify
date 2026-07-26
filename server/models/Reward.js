const mongoose = require("mongoose");

// Every points credit or debit is logged here.
// earned  → pickup completed
// bonus   → streak / first-pickup bonus
// redeemed → order placed
const RewardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // bookingId populated for earned/bonus; orderId populated for redeemed
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      default: null,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      default: null,
    },
    type: {
      type: String,
      enum: ["earned", "bonus", "redeemed"],
      required: true,
    },
    points: { type: Number, required: true }, // positive for earned/bonus, negative for redeemed
    reason: { type: String, default: "" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Reward", RewardSchema);
