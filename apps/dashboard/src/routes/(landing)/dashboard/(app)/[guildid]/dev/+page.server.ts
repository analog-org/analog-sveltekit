import type { PageServerLoad } from "./$types";
import { DISCORD_TOKEN } from "$env/static/private";
import {
  Routes,
  type APIChannel,
  type APIGuild,
  type APIUser,
  type APIEmoji,
  type APIRole,
} from "discord-api-types/v10";
import { REST } from "@discordjs/rest";
import { EmbedBuilder } from "discord.js";
import { page } from "$app/stores";
import { superValidate } from "sveltekit-superforms";
import { messageSchema } from "$lib/schemas";
import { zod } from "sveltekit-superforms/adapters";

export const load = (async ({ parent }) => {
  const { guild } = await parent();

  const botRest = new REST({ authPrefix: "Bot" }).setToken(DISCORD_TOKEN);
  const channels = await botRest
    .get(Routes.guildChannels(guild?.id))
    .then((res) => res as APIChannel[]);
  const roles = await botRest
    .get(Routes.guildRoles(guild?.id))
    .then((res) => res as APIRole[]);
  /* await botRest.post(
    Routes.channelMessages(
      `${channels?.find((channel) => channel.type === 0)?.id}`
    ),
    {
      body: {
        content: "<@274973338676494347> Loaded the page!",
        embeds: [exampleEmbed.toJSON()],
      },
    }
  ).catch(console.error); */
  //console.log(roles)

  return {
    channels,
    roles,
    form: await superValidate(zod(messageSchema))
  };
}) satisfies PageServerLoad;
