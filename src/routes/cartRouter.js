const express = require("express");
const {
  addItemToCart,
  removeItemFromCart,
  getCartItems,
  updateCartItemQuantity,
} = require("../controllers/cartController");
const router = express.Router();

router.post("/add", addItemToCart);
router.post("/remove", removeItemFromCart);
router.post("/", getCartItems);
router.put("/:productId", updateCartItemQuantity);

module.exports = router;
