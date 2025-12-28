const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "help",
  description: "Shows all available commands",
  execute(message) {
    const embed = new EmbedBuilder()
      .setTitle("📋 Available Commands")
      .setColor("#00ff99")
      .setDescription("Here’s a list of all commands you can use:")
      .addFields(
        { name: "!list", value: "Show all bosses with levels and cycles", inline: false },
        { name: "!upcoming", value: "Show upcoming boss spawns (live update every 15s)", inline: false },
        { name: "!nextspawn", value: "Show bosses spawning in the next 24h (live update)", inline: false },
        { name: "!status", value: "View all active boss timers", inline: false },
        { name: "!killed <boss name>", value: "Report a boss kill", inline: false },
        { name: "!remove <boss name>", value: "Remove a boss timer", inline: false },
        { name: "!help", value: "Show this help message", inline: false }
      )
      .setFooter({ text: "Use !<command> to run a command" });

    message.channel.send({ embeds: [embed] });
  }
};
