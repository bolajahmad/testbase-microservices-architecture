const router = require("express").Router();
const authenticateToken = require("../middlewares/authenticateToken");

//Controller
const {
  getCurrentUserController,
  getAllUsersController,
} = require("../controllers/user.controller");

// @desc To get all users
// queue message
// router.post('/queue', async(req, res, next)=>{
//   let { queueName, payload } = req.body;
//   await publishToQueue(queueName, payload).then((data) => console.log({ data }));
//   res.status(200).json({
//     message: 'Message Queued Successfully',
//     isSuccessful: true,
//     data: payload
//   });
//   next();
// })

// api/user
router.get("/", authenticateToken, getAllUsersController);

// @desc To get current user
// api/user/currentUser
router.get("/currentUser", authenticateToken, getCurrentUserController);

module.exports = router;
