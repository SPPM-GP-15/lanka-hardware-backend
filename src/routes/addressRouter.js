const express = require("express");
const router = express.Router();
const {
  addAddress,
  updateAddress,
  deleteAddress,
} = require("../controllers/addressController");

router.post("/:userId/address", addAddress);
router.put("/:userId/address/:addressId", updateAddress);
router.delete("/:userId/address/:addressId", deleteAddress);

module.exports = router;
