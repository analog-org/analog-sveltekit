import { REST } from "@discordjs/rest";
import type { LayoutServerLoad } from "./$types";
import { Routes, type APIUser, type APIGuild } from "discord-api-types/v10";
import Vibrant from "node-vibrant";
import {
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  DISCORD_BOT_TOKEN,
} from "$env/static/private";
import { PermissionFlagsBits } from "discord-api-types/v10";
import { BitField, enumToObject } from "@sapphire/bitfield";

export const load: LayoutServerLoad = async (event) => {
  const currentSession = await event.locals.getSession();
  const botRest = new REST({ authPrefix: "Bot" }).setToken(DISCORD_BOT_TOKEN);
  const botInfo = await botRest
    .get(Routes.user("@me"))
    .then((res) => res as APIUser);
  const botGuilds = await botRest
    .get(Routes.userGuilds())
    .then((res) => res as APIGuild[]);

  const botAccent = await Vibrant.from(
    `https://cdn.discordapp.com/avatars/${botInfo?.id}/${botInfo?.avatar}.png?size=1024&format=webp&quality=lossless&width=0&height=256`
  )
    .getPalette()
    .then((palette) => palette.Vibrant?.hex);

  if (currentSession) {
    //@ts-ignore
    const accessToken = currentSession.accessToken;
    //@ts-ignore
    const discordUser: APIUser = currentSession.discordUser;

    const userRest = new REST({ authPrefix: "Bearer" }).setToken(accessToken);

    const userInfo = await userRest
      .get(Routes.user("@me"))
      .then((res) => res as APIUser);
    const userGuilds = await userRest
      .get(Routes.userGuilds())
      .then((res) => res as APIGuild[]);
    const adminGuilds = userGuilds
      .map((guild) => {
        const p: bigint = BigInt(!guild?.permissions);
        const PermissionsBitField = new BitField(
          enumToObject(PermissionFlagsBits)
        );
        const hasManageGuild =
          PermissionsBitField.has(p, PermissionFlagsBits.Administrator) ||
          PermissionsBitField.has(p, PermissionFlagsBits.ManageGuild);
        if (guild.owner || hasManageGuild) return guild;
      })
    
    const mutualGuilds = adminGuilds.filter((guild) => {
      return botGuilds.some((botGuild) => botGuild.id === guild?.id);
    });

    return {
      session: currentSession,
      user: userInfo,
      bot: botInfo,
      botColor: botAccent,
      botGuilds: botGuilds,
      userGuilds: adminGuilds,
      mutualGuilds: mutualGuilds,
    };
  }

  return {
    session: currentSession,
    bot: botInfo,
    botColor: botAccent,
    botGuilds: botGuilds,
  };
};
