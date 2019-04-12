const Discord = require("discord.js");
const fs = require('fs');
let banque = require('../data/banque.json');
let time = require('../data/time.json');
const mongoose = require('mongoose');
const Coins = require('../models/coins.js');
var uri = 'mongodb://localhost/Kilga';
mongoose.connect(uri, {useNewUrlParser: true});

module.exports.run = async (bot, message, args) => {

    Coins.findOne({
        userid: message.author.id
    }, (err, coins) => {
        if(coins){
            return message.channel.send("Tu ne peux pas recréer un compte !");
        } else {
            start_time1 = new Date()
            start_time2 = start_time1.getTime()

            time[message.author.id] = {
                time: start_time2
            }

            fs.writeFile("./data/time.json", JSON.stringify(time), (err) => {
                if (err) console.log(err)
            });

            const newCoins = new Coins({
                _id: mongoose.Types.ObjectId(),
                userid: message.author.id,
                coins: 100
            })

            newCoins.save()

            message.channel.send("Compte créé avec succès ! **100 coins** ont été ajoutés  à votre compte en guise de bienvenue.\nCommencez votre empire avec la commande `!get` !\nhttps://tenor.com/view/lord-of-the-rings-lotr-so-it-begins-begins-beginning-gif-5322326")

            logchan = bot.channels.get('565591121510793226');
            logchan.send("**Un nouveau compte vient d'être créé !**");

            banque[bot.user.id] = {
                banque: banque[bot.user.id].banque + 100
            }
            fs.writeFile("./data/banque.json", JSON.stringify(banque), (err) => {
                if (err) console.log(err)
            });


        }

    });



}

module.exports.help = {
    name: "create"
}