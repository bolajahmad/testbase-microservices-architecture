const Wallet = require("../models/wallet.model");


const getWalletController = async (req, res) => {
  try {
    const { user: { id } } = req.body;
    const wallet = await Wallet.findOne({ userId: id });
    if (!wallet) res.status(400).json({ 
      message: "Wallet doesn't exist",
      isSuccessful: false
    });

    return res.status(200).json({
      message: 'Wallet Retrieved Successfully',
      isSuccessful: true, 
      data: {
        amount: wallet.amount,
        id: wallet._id,
        username: wallet.username
      }
    });
  } catch (error) {
    console.log(error)
    res.json(error);
  }
};

module.exports = { getWalletController };
