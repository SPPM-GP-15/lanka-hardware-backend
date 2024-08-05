const User = require("../models/userModel");

// Add or update address
const addOrUpdateAddress = async (req, res) => {
  try {
    const userId = req.params.userId;
    const address = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.address = address; // Set the address directly
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete the address
const deleteAddress = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.address = undefined; // Remove the address
    await user.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  addOrUpdateAddress,
  deleteAddress,
};
