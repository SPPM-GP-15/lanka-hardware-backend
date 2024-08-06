const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  updateUser,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} = require("../controllers/userController");
const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/getAllUsers", getAllUsers);
router.put("/updateUser/:userId", updateUser);
router.post("/wishlist/add/:userId/:productId", addToWishlist);
router.delete("/wishlist/remove/:userId/:productId", removeFromWishlist);
router.get("/wishlist/:userId", getWishlist);
module.exports = router;
