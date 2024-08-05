const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("../models/userModel.js");
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
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        createdAt: user.createdAt,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  updateUser,
};
