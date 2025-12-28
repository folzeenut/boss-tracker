const { EmbedBuilder } = require("discord.js");
const bosses = require("../data/bosses");

function getUpcoming() {
  const now = new Date();
  return bosses.map(b => {
    const nextSpawn = new Date(now.getTime() + (b.cycle || 24) * 60 * 60 * 1000);
    return { name: b.name, nextSpawn };
  });
}

module.exports = {
  name: "upcoming",
  description: "Show upcoming boss spawns (live update every 15s)",
  async execute(message) {
    const sent = await message.channel.send("⏱ Generating upcoming boss spawns...");

    const update = () => {
      const embed = new EmbedBuilder()
        .setTitle("⏱ Upcoming Boss Spawns")
        .setColor("#00ffcc")
        .setFooter({ text: `Last updated: ${new Date().toLocaleString()}` });

      getUpcoming().forEach(b => {
        const diff = b.nextSpawn - new Date();
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        embed.addFields({ name: b.name.toUpperCase(), value: `${b.nextSpawn.toLocaleString()} — in ${h}h ${m}m ${s}s`, inline: false });
      });

      sent.edit({ embeds: [embed] });
    };

    update();
    const interval = setInterval(update, 15000);
    setTimeout(() => clearInterval(interval), 10 * 60 * 1000);
  }
};
