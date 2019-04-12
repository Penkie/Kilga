const Discord = require("discord.js");
const mongoose = require('mongoose');
const Coins = require('../models/coins.js');
var uri = 'mongodb://localhost/Kilga';
mongoose.connect(uri, {useNewUrlParser: true});

module.exports.run = async (bot, message, args) => {

    let user = message.mentions.users.first();

    if(!user){
        Coins.findOne({
            userid: message.author.id
        }, (err, coins) => {
            if(!coins){
                return message.channel.send("Tu n'as pas de compte. Fais `!create` pour crée un!");
            } else {

                return message.channel.send(`Tu as **${coins.coins} coins** ! Pour en avoir plus fais la commande ` + "``!get``")
            }
        });
    } else {

        Coins.findOne({
            userid: user.id
        }, (err, coins) => {

            if(!coins){
                return message.channel.send(`${user.username} n'as pas de compte`)
            } else {
                return message.channel.send(`${user.username} a **${coins.coins} coins** !`)
            }

        })

    }


}

module.exports.help = {
    name: "coins"
}