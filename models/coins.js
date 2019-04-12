const mongoose = require('mongoose');

const coinsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userid: String,
    coins: Number
});

module.exports = mongoose.model("Coins", coinsSchema);