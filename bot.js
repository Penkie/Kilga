const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');
const fs = require('fs');
bot.commands = new Discord.Collection();
const coins = require('./data/coins.json');

fs.readdir("./commands/", (err, files) => {
  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Aucune commandes trouvée");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} chargé`)
    bot.commands.set(props.help.name, props);
  });

});

bot.on('ready', () => {
  console.log(`Connecté en tant que ${bot.user.tag}!`);
  bot.user.setActivity("les coins arriver", {type: "WATCHING"})
});

bot.on('message', async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args)

  if(cmd === `${prefix}ping`){
    return message.channel.send(`Pong! **${bot.ping}ms**`);
  }

});

bot.on('error', console.error);

bot.login(config.token);