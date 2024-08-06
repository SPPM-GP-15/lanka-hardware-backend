const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("../models/userModel.js");
const Product = require("../models/productModel.js");
const generateAuthToken = require("../config/generateToken.js");

const registerUser = async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;

  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    const user = await User.create({
      name,
      phoneNumber,
      email,
      password,
    });

    if (user) {
      res.json({
        success: true,
        user,
      });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No user found on this email",
      });
    }

    const auth = await bcrypt.compare(password, user.password);

    if (!auth) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    user.isVerified = true;
    res.json({
      success: true,
      user,
      token: generateAuthToken(user._id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateUser = async (req, res) => {
  const { name, phoneNumber } = req.body;
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.name = name || user.name;
    user.phoneNumber = phoneNumber || user.phoneNumber;

    await user.save();

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addToWishlist = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    if (!user || !product) {
      return res.status(404).json({ message: "User or Product not found" });
    }

    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
      return res.status(200).json({ message: "Product added to wishlist" });
    } else {
      return res.status(400).json({ message: "Product already in wishlist" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Remove a product from the user's wishlist
const removeFromWishlist = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
    await user.save();

    return res.status(200).json({ message: "Product removed from wishlist" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get a user's wishlist
const getWishlist = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate("wishlist");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const wishlist = user.wishlist;

    return res.status(200).json(wishlist);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  updateUser,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
};
