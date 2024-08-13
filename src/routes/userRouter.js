const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  updateUser,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  getUserProfile, // Import the new controller
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware"); // Import the auth middleware

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/getAllUsers", getAllUsers);
router.put("/updateUser/:userId", updateUser);
router.post("/wishlist/add/:userId/:productId", addToWishlist);
router.delete("/wishlist/remove/:userId/:productId", removeFromWishlist);
router.get("/wishlist/:userId", getWishlist);
router.get("/me", protect, getUserProfile); // Add the new route with protection

module.exports = router;
