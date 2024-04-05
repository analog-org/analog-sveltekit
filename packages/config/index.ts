export const config = {
  website: {
    category: [
      // icons list: https://lucide.dev/icons
      // everything in the default path will not have a dropdown menu
      {
        name: "Default",
        pages: [
          { name: "dashboard", icon: "home", path: "" },
          { name: "embed sender", icon: "layout-template", path: "embed" },
          { name: "settings", icon: "settings", path: "embed" },
        ],
      },
      {
        name: "Moderation",
        pages: [
          { name: "auto mod", icon: "bot", path: "auto-mod" },
          { name: "mod logs", icon: "scroll", path: "mod-logs" },
          { name: "bans", icon: "gravel", path: "bans" },
          { name: "mutes", icon: "message-circle-off", path: "mute" },
        ],
      },
    ],
  },
};
