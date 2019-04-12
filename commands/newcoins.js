const Discord = require("discord.js");
const mongoose = require('mongoose');
const Coins = require('../models/coins.js');
var uri = 'mongodb://localhost/Kilga';
mongoose.connect(uri, {useNewUrlParser: true});

module.exports.run = async (bot, message, args) => {


    const coins = new Coins({
        _id: mongoose.Types.ObjectId(),
        userid: message.author.id,
        coins: 100
    })

    coins.save()
    

    message.channel.send("Normalement c'est bon !")


}

module.exports.help = {
    name: "newcoins"
}