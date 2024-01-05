import { REST } from "@discordjs/rest";
import type { LayoutServerLoad } from "./$types";
import { Routes, type APIUser, type APIGuild } from "discord-api-types/v10";
import Vibrant from "node-vibrant";
import {
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  DISCORD_BOT_TOKEN,
} from "$env/static/private";

export const load: LayoutServerLoad = async (event) => {
  const currentSession = await event.locals.getSession();
  const botRest = new REST({ authPrefix: "Bot" }).setToken(DISCORD_BOT_TOKEN);
  const botInfo = await botRest.get(Routes.user("@me")).then((res) => res as APIUser);
  const botGuilds = await botRest.get(Routes.userGuilds()).then((res) => res as APIGuild[]);

  const botAccent = await Vibrant.from(`https://cdn.discordapp.com/avatars/${botInfo?.id}/${botInfo?.avatar}.png?size=1024&format=webp&quality=lossless&width=0&height=256`).getPalette()
  .then((palette) => palette.Vibrant?.hex)


  if (currentSession) {
    //@ts-ignore
    const accessToken = currentSession.accessToken;
    //@ts-ignore
    const discordUser: APIUser = currentSession.discordUser;

    const userRest = new REST({ authPrefix: "Bearer" }).setToken(accessToken);

    const userInfo = await userRest.get(Routes.user("@me")).then((res) => res as APIUser);
    const userGuilds  = await userRest.get(Routes.userGuilds()).then((res) => res as APIGuild[]);

    return {
      session: currentSession,
      user: userInfo,
      bot: botInfo,
      botColor: botAccent,
    };
  }

  return {
    session: currentSession,
    bot: botInfo,
    botColor: botAccent,
  };
};
