const Wallet = require("../models/wallet.model");

async function creditWallet(model) {
    console.log({ model })
    const { userId, username, amount } = model;

    const wallet = await new Wallet({
        userId,
        username,
        amount
    });

    const walletData = await Wallet.findOne({ userId });
    console.log({ walletData });

    if (walletData) {
        const savedWallet = wallet.findOneAndUpdate({ userId }, {
            amount: walletData.amount + amount,
            userId,
            username
        })
        console.log({ savedWallet });
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
}

module.exports = { creditWallet };
