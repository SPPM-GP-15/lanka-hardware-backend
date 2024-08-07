const Cart = require("../models/cartModel");

const addItemToCart = async (req, res) => {
  try {
    const { user, product } = req.body;

    if (!user || !product) {
      return res
        .status(400)
        .send({ error: "User ID and product ID are required." });
    }

    const cart = await Cart.findOne({ user });

    if (!cart) {
      const newCart = new Cart({
        user,
        items: [{ product, quantity: 1 }],
      });
      await newCart.save();
      return res.status(201).send(newCart);
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === product
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += 1;
    } else {
      cart.items.push({ product, quantity: 1 });
    }

    await cart.save();
    res.send(cart);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(400).send({ error: error.message });
  }
};

const removeItemFromCart = async (req, res) => {
  try {
    const { user, productId } = req.body;

    if (!user || !productId) {
      return res
        .status(400)
        .send({ error: "User ID and product ID are required." });
    }

    const cart = await Cart.findOne({ user });

    if (!cart) {
      return res.status(404).send({ error: "Cart not found." });
    }

    const initialLength = cart.items.length;
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    if (cart.items.length === initialLength) {
      return res.status(404).send({ error: "Item not found in cart." });
    }

    await cart.save();
    res.send(cart);
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).send({ error: error.message });
  }
};

const removeAllItemsFromCart = async (req, res) => {
  try {
    const { user } = req.body;

    if (!user) {
      return res.status(400).send({ error: "User ID is required." });
    }

    const cart = await Cart.findOne({ user });

    if (!cart) {
      return res.status(404).send({ error: "Cart not found." });
    }

    cart.items = []; // Remove all items
    await cart.save();
    res.send(cart);
  } catch (error) {
    console.error("Error removing all items from cart:", error);
    res.status(500).send({ error: error.message });
  }
};

const getCartItems = async (req, res) => {
  try {
    const { user } = req.body;

    if (!user) {
      return res.status(400).send({ error: "User ID is required." });
    }

    const cart = await Cart.findOne({ user }).populate("items.product").exec();

    if (!cart) {
      return res.status(404).send({ error: "Cart not found." });
    }

    const cartItems = cart.items.map((item) => ({
      product: item.product,
      quantity: item.quantity,
    }));

    res.send({ cartItems });
  } catch (error) {
    console.error("Error getting cart items:", error);
    res.status(500).send({ error: error.message });
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
  removeAllItemsFromCart,
};
