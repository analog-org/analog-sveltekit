import type { LayoutServerLoad } from "./$types";
import { page } from "$app/stores";
import { redirect } from "@sveltejs/kit";
import { REST } from "@discordjs/rest";
import { Routes, type APIUser, type APIGuild } from "discord-api-types/v10";
import Vibrant from "node-vibrant";
import {
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  DISCORD_TOKEN,
} from "$env/static/private";
import { PermissionFlagsBits } from "discord-api-types/v10";
import { BitField, enumToObject } from "@sapphire/bitfield";
import { loadUserInfo } from "$lib/utils";


export const load: LayoutServerLoad = async ({ locals, params }) => {
  const guildId = params.guildid;
  const userInfo = await loadUserInfo({ locals }, DISCORD_TOKEN)
  const mutualGuilds = userInfo?.mutualGuilds;
   if (!mutualGuilds?.some((guild: APIGuild) => guild.id === guildId))
    throw redirect(303, "/dashboard");  

  console.log(mutualGuilds)
  const guild = mutualGuilds?.find((guild: APIGuild) => guild.id === guildId); 
  return userInfo;
};
