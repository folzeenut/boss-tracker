module.exports = {
  name: "status",
  description: "View all active boss timers",
  execute(message) {
    message.channel.send("🟢 Boss timers currently active (demo): VENATUS, VIORENT, EGO...");
  }
};
