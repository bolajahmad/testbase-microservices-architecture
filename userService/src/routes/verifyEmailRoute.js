const router = require("express").Router();

//Controller
const {
  verifyEmailController,
} = require("../controllers/authController");

// @desc To activate a user
router.post("/confirm", verifyEmailController);

module.exports = router;
