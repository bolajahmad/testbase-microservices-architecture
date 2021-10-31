const router = require("express").Router();

//Controllers
const {
  loginController,
  registerController,
  verifyEmailController,
} = require("../controllers/authController");

// @desc To activate a user
router.get("/confirm/:confirmationCode", verifyEmailController);

// @desc To register users
// api/auth/register
router.post("/register", registerController);

// @desc To login a user
// api/auth/login
router.post("/login", loginController);

module.exports = router;
