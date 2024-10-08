const express = require("express");
const {
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
  getOrdersByUserId,
  getTotalIncome,
} = require("../controllers/orderController");
const router = express.Router();

router.post("/create", createOrder);
router.get("/:id", getOrderById);
router.get("/", getAllOrders);
router.put("/:id/status", updateOrderStatus);
router.put("/:id/cancel", cancelOrder);
router.get("/user/:userId", getOrdersByUserId);
router.get("/income/total", getTotalIncome);

module.exports = router;
