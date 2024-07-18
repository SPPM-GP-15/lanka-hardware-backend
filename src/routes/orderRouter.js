const express = require("express");
const {
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
} = require("../controllers/orderController");
const router = express.Router();

router.post("/create", createOrder);
router.get("/:id", getOrderById);
router.get("/", getAllOrders);
router.put("/:id/status", updateOrderStatus);
router.put("/:id/cancel", cancelOrder);

module.exports = router;
