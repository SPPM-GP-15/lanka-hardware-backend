const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    oldPrice: {
      type: Number,
      required: false,
    },
    newPrice: {
      type: Number,
      required: true,
    },
    discountPercentage: {
      type: Number,
      required: false,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    stock: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    manufacturer: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "products",
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
