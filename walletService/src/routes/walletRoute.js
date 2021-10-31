const router = require("express").Router();
const { creditWalletController } = require("../controllers/credit-wallet.controller");
const ValidateToken = require('../middlewares/verrify-token');
const { getWalletController } = require('../controllers/get-wallet-controller');

//@desc To create user wallet
router.post("/credit-wallet", ValidateToken, creditWalletController)

router.get("/get-wallet-balance", ValidateToken, getWalletController)

module.exports = router