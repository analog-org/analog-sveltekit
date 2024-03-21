import { REST } from "@discordjs/rest";
import type { LayoutServerLoad } from "./$types";
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


export const load: LayoutServerLoad = async ({ locals }) => {
  return loadUserInfo({ locals }, DISCORD_TOKEN);
};
