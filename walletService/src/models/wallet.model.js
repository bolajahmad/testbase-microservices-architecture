<<<<<<< HEAD
const mongoose = require("mongoose")


const walletSchema = mongoose.Schema({
    userId: {
        type : String,
        required: true 
    },
    username :{
        type: String,
        required: true
    },
    amount : {
        type : Number,
        required: true
    }
})

=======
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

>>>>>>> 1770bd5944385bbb24c15fe468a8dc778cd480e0
module.exports = mongoose.model("Wallets", walletSchema)