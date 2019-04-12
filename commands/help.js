const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    message.channel.send("Tout commence... par `!create`")
}

module.exports.help = {
    name: "help"
}