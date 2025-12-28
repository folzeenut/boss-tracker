module.exports = {
  name: "remove",
  description: "Remove a boss timer",
  execute(message, args) {
    const boss = args[0];
    if (!boss) return message.channel.send("❌ Please provide a boss name to remove.");
    message.channel.send(`🛑 Timer for ${boss.toUpperCase()} removed.`);
  }
};
