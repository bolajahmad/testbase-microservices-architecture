const router = require("express").Router();
const authenticateToken = require("../middlewares/authenticateToken");

//Controller
const {
  getCurrentUserController,
  getAllUsersController,
} = require("../controllers/user.controller");

// @desc To get all users
// api/user
router.get("/", authenticateToken, getAllUsersController);

// @desc To get current user
// api/user/currentUser
router.get("/currentUser", authenticateToken, getCurrentUserController);

module.exports = router;
