const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    points: { type: Number, required: true, min: 1 },
    stock: { type: Number, required: true, min: 0, default: 0 },
    category: {
      type: String,
      enum: ["Accessories", "Clothing", "Home", "Fitness", "Electronics"],
      required: true,
    },
    // URL returned from POST /api/admin/products/upload
    // Served statically from /uploads/products/
    imageUrl: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", ProductSchema);
