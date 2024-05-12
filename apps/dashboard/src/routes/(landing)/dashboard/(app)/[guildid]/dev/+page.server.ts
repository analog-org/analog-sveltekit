import type { PageServerLoad, Actions } from "./$types";
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
import { fail } from "@sveltejs/kit";

const botRest = new REST({ authPrefix: "Bot" }).setToken(DISCORD_TOKEN);
export const load = (async ({ parent }) => {
  const { guild } = await parent();

  const channels = await botRest
    .get(Routes.guildChannels(guild?.id))
    .then((res) => res as APIChannel[]);
  const roles = await botRest
    .get(Routes.guildRoles(guild?.id))
    .then((res) => res as APIRole[]);

  return {
    channels,
    roles,
    form: await superValidate(zod(messageSchema)),
  };
}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async (event) => {
    const guildId = event.params.guildid;
    const guild = await botRest
      .get(Routes.guild(guildId))
      .then((res) => res as APIGuild);

    const channels = await botRest
      .get(Routes.guildChannels(guild?.id))
      .then((res) => res as APIChannel[]);

    const form = await superValidate(event, zod(messageSchema), {
    });
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    if (Object.keys(form.data.embeds[0]).length === 0) {
      await botRest
      .post(
        Routes.channelMessages(
          form.data.channel
        ),
        {
          body: {
            content: `<@274973338676494347> ${form.data?.content}`,
          },
        }
      )
      .catch(console.error);
    } else {
      await botRest
      .post(
        Routes.channelMessages(
          form.data.channel
        ),
        {
          body: {
            content: `<@274973338676494347> ${form.data?.content}`,
            embeds: form.data.embeds,
          },
        }
      )
      .catch(console.error);
    }

    
  },
};
