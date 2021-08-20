const router = require("express").Router();
const {
  getWalletController,
  transferController,
  walletController,
} = require("../controllers/wallet.controller");

//@desc To create user wallet
// api/auth/register
router.post("/wallet/createwallet/:userId", walletController)

router.post("/wallet/transfer/:userId", transferController)

router.get("/wallet/getwallet/:userId", getWalletController)

module.exports = router