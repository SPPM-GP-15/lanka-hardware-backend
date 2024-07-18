const Cart = require("../models/cartModel");

const addItemToCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      const newCart = new Cart({
        user: req.user._id,
        items: [req.body],
      });
      await newCart.save();
      return res.status(201).send(newCart);
    }
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === req.body.product
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += req.body.quantity;
    } else {
      cart.items.push(req.body);
    }
    await cart.save();
    res.send(cart);
  } catch (error) {
    res.status(400).send(error);
  }
};

const removeItemFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).send();
    }
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== req.params.productId
    );
    await cart.save();
    res.send(cart);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getCartItems = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );
    if (!cart) {
      return res.status(404).send();
    }
    res.send(cart);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateCartItemQuantity = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).send();
    }
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === req.params.productId
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = req.body.quantity;
      await cart.save();
      return res.send(cart);
    }
    res.status(404).send();
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  addItemToCart,
  removeItemFromCart,
  getCartItems,
  updateCartItemQuantity,
};
