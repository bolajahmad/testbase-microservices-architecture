<<<<<<< HEAD
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

=======
const router = require("express").Router();
const { creditWalletController } = require("../controllers/credit-wallet.controller");
const ValidateToken = require('../middlewares/verrify-token');
const { getWalletController } = require('../controllers/get-wallet-controller');

//@desc To create user wallet
router.post("/credit-wallet", ValidateToken, creditWalletController)

router.get("/get-wallet-balance", ValidateToken, getWalletController)

>>>>>>> 1770bd5944385bbb24c15fe468a8dc778cd480e0
module.exports = router