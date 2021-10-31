const mongoose = require("mongoose")


const walletSchema = mongoose.Schema({
    userId: {
        type : String,
        required: true 
    },
    username: {
        type: String,
        required: true
    },
    amount: {
        type : Number,
        required: true
    }
})

module.exports = mongoose.model("Wallets", walletSchema)