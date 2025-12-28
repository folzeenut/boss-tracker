require('dotenv').config();
const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const prefix = "!";

// Import commands
const helpCommand = require("./commands/help");
const listCommand = require("./commands/list");
const upcomingCommand = require("./commands/upcoming");
const nextspawnCommand = require("./commands/nextspawn");
const statusCommand = require("./commands/status");
const killedCommand = require("./commands/killed");
const removeCommand = require("./commands/remove");

client.on("messageCreate", message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  switch(command) {
    case "help": helpCommand.execute(message); break;
    case "list": listCommand.execute(message, args); break;
    case "upcoming": upcomingCommand.execute(message, args); break;
    case "nextspawn": nextspawnCommand.execute(message, args); break;
    case "status": statusCommand.execute(message, args); break;
    case "killed": killedCommand.execute(message, args); break;
    case "remove": removeCommand.execute(message, args); break;
    default: message.channel.send(`❌ Unknown command: \`${command}\``);
  }
});

client.login(process.env.BOT_TOKEN)
  .then(() => console.log(`🤖 Logged in as ${client.user.tag}`))
  .catch(err => console.error("❌ Login failed. Check BOT_TOKEN in .env", err));
