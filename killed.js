const killLog = require("../data/killLog");

module.exports = {
  name: "killed",
  description: "Report a boss kill",
  execute(message, args) {
    const boss = args[0];
    if (!boss) return message.channel.send("❌ Please provide a boss name.");

    const now = new Date();
    killLog[boss.toUpperCase()] = now;

    message.channel.send(`✅ Boss **${boss.toUpperCase()}** has been reported as killed at **${now.toLocaleString()}**.`);
  }
};
