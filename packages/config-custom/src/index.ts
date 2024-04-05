export const config = {
  website: {
    category: [
      // icons list: https://lucide.dev/icons
      // everything in the default path will not have a dropdown menu
      {
        name: "Default",
        pages: [
          { name: "Dashboard", icon: "home", path: "" },
          { name: "Embed Sender", icon: "layout-template", path: "/embed" },
          { name: "Settings", icon: "settings", path: "/settings" },
        ],
      },
      {
        name: "Moderation",
        pages: [
          { name: "Auto Mod", icon: "bot", path: "/auto-mod" },
          { name: "Mod Logs", icon: "scroll", path: "/mod-logs" },
          { name: "Bans", icon: "gravel", path: "/bans" },
          { name: "Mutes", icon: "message-circle-off", path: "/mute" },
        ],
      },
    ],
  },
};
