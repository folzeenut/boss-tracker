const { REST, Routes, SlashCommandBuilder } = require("discord.js");
require("dotenv").config();

const bossCommand = new SlashCommandBuilder()
  .setName("boss")
  .setDescription("Boss tracking system")

  // ⚙️ Setup
  .addSubcommand(sub => sub.setName("setup").setDescription("Configure notification settings"))
  .addSubcommand(sub => sub.setName("settings").setDescription("View current guild settings"))

  // 🗡️ Tracking
  .addSubcommand(sub =>
    sub.setName("killed")
      .setDescription("Report a boss kill")
      .addStringOption(opt => opt.setName("name").setDescription("Boss name").setRequired(true))
      .addStringOption(opt => opt.setName("time").setDescription("Kill time (ex: 2:30 PM)").setRequired(false))
  )
  .addSubcommand(sub =>
    sub.setName("status")
      .setDescription("View boss timers")
      .addStringOption(opt => opt.setName("name").setDescription("Specific boss").setRequired(false))
  )
  .addSubcommand(sub =>
    sub.setName("remove")
      .setDescription("Remove a boss timer")
      .addStringOption(opt => opt.setName("name").setDescription("Boss name").setRequired(true))
  )

  // 📋 Info
  .addSubcommand(sub =>
    sub.setName("list")
      .setDescription("List all bosses")
      .addStringOption(opt => opt.setName("category").setDescription("short | long | scheduled").setRequired(false))
  );

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: [bossCommand.toJSON()] });
    console.log("✅ Slash commands registered");
  } catch (error) {
    console.error(error);
  }
})();
