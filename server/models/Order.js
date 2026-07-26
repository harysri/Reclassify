const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: { type: String, required: true }, // snapshot at time of order
    imageUrl: { type: String, default: "" },
    points: { type: Number, required: true }, // points per unit at time of order
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false },
);

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: { type: [OrderItemSchema], required: true },
    totalPoints: { type: Number, required: true },
    deliveryAddress: { type: String, required: true },

    // processing → shipped → delivered | cancelled
    status: {
      type: String,
      enum: ["processing", "shipped", "delivered", "cancelled"],
      default: "processing",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", OrderSchema);
