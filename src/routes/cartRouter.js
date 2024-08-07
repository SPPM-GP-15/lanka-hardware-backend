const express = require("express");
const {
  addItemToCart,
  removeItemFromCart,
  getCartItems,
  updateCartItemQuantity,
  removeAllItemsFromCart,
} = require("../controllers/cartController");
const router = express.Router();

router.post("/add", addItemToCart);
router.post("/remove", removeItemFromCart);
router.post("/", getCartItems);
router.put("/:productId", updateCartItemQuantity);
router.post("/clear", removeAllItemsFromCart);

module.exports = router;
