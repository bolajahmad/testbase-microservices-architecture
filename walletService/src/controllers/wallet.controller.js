const transferFund = require("../services/transferService");
const validation = require("../utils/validation");
const Wallet = require("../models/wallet.model");

const handleValidation = (body) => {
  const { error } = validation(body);
  if (error) {
    throw Error(error.details[0].message);
  }
};

const walletController = async (req, res) => {
  const wallet = await new Wallet({
    userId: req.params.userId,
    username: req.body.username,
    amount: req.body.amount,
  });
  try {
    handleValidation({
      userId: req.params.userId,
      username: req.body.username,
      amount: req.body.amount,
    });
    const username = req.body.username;
    const usernameExist = await Wallet.findOne({ username });

    if (usernameExist) {
      return res.status(400).json({ err_message: "User wallet exist" });
    }
    const savedWallet = wallet.save((err, data) => {
      if (err) return res.status(400).json({ err_msg: err });
      return res.status(201).json(data);
    });
  } catch (error) {
    res.json({ error });
  }
};

const transferController = async (req, res) => {
  try {
    const userId = req.params.userId;
    const transfer = await transferFund(
      req.body.username,
      userId,
      req.body.amount
    );
    res.status(200).json(transfer)
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const getWalletController = async (req, res) => {
  try {
    const userId = await req.params.userId;
    const wallet = await Wallet.findOne({ userId });
    if (!wallet) res.json({ err_message: "Wallet doesn't exist" });
    return res.status(200).json(wallet);
  } catch (error) {
    return res.json(error);
  }
};

module.exports = { walletController, getWalletController, transferController };
