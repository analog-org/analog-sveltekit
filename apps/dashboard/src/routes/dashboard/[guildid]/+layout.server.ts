import type { LayoutServerLoad } from "./$types";
import { page } from "$app/stores";
import { redirect } from "@sveltejs/kit";

import type { APIGuild } from "discord-api-types/v10";

export const load = (async ({ parent, params }) => {
  const { mutualGuilds } = await parent();
  const guildId = params.guildid;
  if (!mutualGuilds?.some((guild: APIGuild) => guild.id === guildId))
    throw redirect(303, "/dashboard");

  const guild = mutualGuilds.find((guild: APIGuild) => guild.id === guildId);  

  return {
    guild,
  };
}) satisfies LayoutServerLoad;
