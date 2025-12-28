const { EmbedBuilder } = require("discord.js");
const bosses = require("../data/bosses");

module.exports = {
  name: "list",
  description: "Show all bosses with levels and cycles",
  execute(message) {
    const shortCycle = bosses.filter(b => b.cycleType === "short");
    const longCycle = bosses.filter(b => b.cycleType === "long");
    const scheduled = bosses.filter(b => b.cycleType === "scheduled");

    const embed = new EmbedBuilder()
      .setTitle("🗡️ Boss List")
      .setColor("#ff9900")
      .addFields(
        { name: "🔵 Short Cycle (10-21h)", value: shortCycle.map(b => `• ${b.name} (Lv.${b.level}) - ${b.cycle}h`).join("\n"), inline: false },
        { name: "🟣 Long Cycle (24-48h)", value: longCycle.map(b => `• ${b.name} (Lv.${b.level}) - ${b.cycle}h`).join("\n"), inline: false },
        { name: "🟡 Scheduled Bosses", value: scheduled.map(b => `• ${b.name} (Lv.${b.level}) - ${b.schedule}`).join("\n"), inline: false }
      );

    message.channel.send({ embeds: [embed] });
  }
};
