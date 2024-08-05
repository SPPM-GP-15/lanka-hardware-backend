const express = require("express");
const router = express.Router();
const {
  addOrUpdateAddress,
  deleteAddress,
} = require("../controllers/addressController");

router.post("/:userId/address", addOrUpdateAddress);
router.put("/:userId/address", addOrUpdateAddress);
router.delete("/:userId/address", deleteAddress);

module.exports = router;
