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
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    type: {
      type: String,
      required: false,
    },
    typeCatergory: [
      {
        type: String,
        required: false,
      },
    ],
    stock: {
      type: Number,
      required: true,
    },
    imageUrl: {
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
