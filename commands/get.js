const Discord = require("discord.js");
let time = require('../data/time.json');
let banque = require('../data/banque.json');
let date = require('date-and-time');
const fs = require('fs');
const prettyMs = require('pretty-ms');
const mongoose = require('mongoose');
const Coins = require('../models/coins.js');
var uri = 'mongodb://localhost/Kilga';
mongoose.connect(uri, {useNewUrlParser: true});

module.exports.run = async (bot, message, args) => {


    Coins.findOne({
        userid: message.author.id
    }, (err, coins) => {
        if(err) console.log(err);
        if(!coins) {
            return message.channel.send("Tu dois créer d'abord un compte. Fais: `!create` pour en crée un!");
        } else {

            if (Date.now() - parseInt(time[message.author.id]["time"]) < 100000) {
                return message.channel.send(`Pas si vite ! Tu dois attendre **${prettyMs(parseInt((Date.now() - (time[message.author.id]["time"] + 100000)) * -1, {secDecimalDigits: 4}))}** avant de refaire cette commande!`)
            }
        
            calculate_total = Date.now() - time[message.author.id]["time"]
        
            result_ = calculate_total / 100000
            result = parseInt(result_);
        
            Coins.findOne({
                userid: message.author.id
            }, (err, coins) => {
                if(err) console.log(err);
                coins.coins = coins.coins + result
                coins.save()
            });
        
            time[message.author.id]["time"] = Date.now();
            fs.writeFileSync('./data/time.json', JSON.stringify(time));
        
            logchan = bot.channels.get('565591121510793226');
            logchan.send(`**${result} coins** pour ` + message.author.tag);
        
            banque[bot.user.id] = {
                banque: banque[bot.user.id].banque + result
            }
        
            fs.writeFile("./data/banque.json", JSON.stringify(banque), (err) => {
                if (err) console.log(err)
            });
        
        
            // return message.channel.send(`Tu n'as pas fait cette commande depuis **${prettyMs(calculate_total)}**!\nTu as gagné **${result} coins** !`);
            return message.channel.send(":alarm_clock: **Temps écoulés**: `" + prettyMs(calculate_total) + "`\n:trophy: **Récompense**: `" + result + " coins" + "`\n:stopwatch: **Booster**: x1")
        
        }
    });


}

module.exports.help = {
    name: "get"
}