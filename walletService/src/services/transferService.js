<<<<<<< HEAD
const Wallet = require("../models/wallet.model");

const transferFund = async (username, userId, amount) => {
  try {
    const wallet = await Wallet.findOne({ userId });
    const receiverWallet = await Wallet.findOne({ username });

    if(!receiverWallet){
      return {error: "User not found"}
    }
    if(!wallet){
      return {error:"You dont have a wallet account"}
    }
    if (wallet.amount > amount) {
      wallet.amount -= amount;
      receiverWallet.amount += amount;

      await wallet.save();
      await receiverWallet.save();
      return wallet;
    }
    return {error:"unable to tranfer due to insufficient fund"};
  } catch (error) {
    throw Error(error);
  }
};

module.exports = transferFund;
=======
const Wallet = require("../models/wallet.model");

const transferFund = async (username, userId, amount) => {
  try {
    const wallet = await Wallet.findOne({ userId });
    const receiverWallet = await Wallet.findOne({ username });

    if(!receiverWallet){
      return {error: "User not found"}
    }
    if(!wallet){
      return {error:"You dont have a wallet account"}
    }
    if (wallet.amount > amount) {
      wallet.amount -= amount;
      receiverWallet.amount += amount;

      await wallet.save();
      await receiverWallet.save();
      return wallet;
    }
    return {error:"unable to tranfer due to insufficient fund"};
  } catch (error) {
    throw Error(error);
  }
};

module.exports = transferFund;
>>>>>>> 1770bd5944385bbb24c15fe468a8dc778cd480e0
