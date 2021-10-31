const validation = require("../utils/validation");
const Wallet = require("../models/wallet.model");

const handleValidation = (body) => {
  const { error } = validation(body);
  if (error) {
    throw Error(error.details[0].message);
  }
};

const creditWalletController = async (req, res) => {
    const { userId, username, amount } = req.body;

  const wallet = await new Wallet({
    userId: req.params.userId,
    username: req.body.username,
    amount: req.body.amount,
  });
  try {
    // handleValidation({
    //   userId: req.params.userId,
    //   username: req.body.username,
    //   amount: req.body.amount,
    // });
    const walletData = await Wallet.findOne({ userId });
    console.log({ walletData })

    if (walletData) {
        const savedWallet = wallet.findOneAndUpdate({ userId }, {
            amount: walletData.amount + amount,
            userId,
            username
        }, (err, data) => {
        if (err) throw error;
        return res.status(201).json(data);
        });
    } else {
        const walletData = new Wallet({ userId, username, amount })
        walletData.save((err, data) => {
            if (err) throw err;

            return res.status(200).json({
                message: 'Wallet Created Successfully',
                isSuccessful: true,
                data
            })
        })
    }    
  } catch (error) {
      console.log({ error });
    res.json({ error });
  }
};

module.exports = { creditWalletController };
