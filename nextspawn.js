const { EmbedBuilder } = require("discord.js");
const bosses = require("../data/bosses");
const killLog = require("../data/killLog");

module.exports = {
  name: "nextspawn",
  description: "Show next 24h boss spawns (tracked only)",
  execute(message) {
    const now = new Date();
    const trackedBosses = bosses.filter(b => killLog[b.name.toUpperCase()]);

    if (!trackedBosses.length) {
      return message.channel.send("ℹ️ No bosses have been logged yet. Use `!killed <boss>` first.");
    }

    const embed = new EmbedBuilder()
      .setTitle("⏱ Next Spawned Bosses (Tracked Only)")
      .setColor("#00ccff")
      .setFooter({ text: `Last updated: ${now.toLocaleString()}` });

    trackedBosses.forEach(b => {
      const lastKill = killLog[b.name.toUpperCase()];
      const nextSpawn = new Date(lastKill.getTime() + (b.cycle || 24) * 60 * 60 * 1000);
      const diff = nextSpawn - now;
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);

      embed.addFields({
        name: b.name.toUpperCase(),
        value: `${nextSpawn.toLocaleString()} — in ${h}h ${m}m ${s}s`,
        inline: false
      });
    });

    message.channel.send({ embeds: [embed] });
  }
};
