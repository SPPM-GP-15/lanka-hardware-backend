const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  updateUser,
} = require("../controllers/userController");
const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/getAllUsers", getAllUsers);
router.put("/updateUser/:userId", updateUser); 

module.exports = router;
