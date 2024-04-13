import type { PageServerLoad } from './$types';
import { DISCORD_TOKEN } from '$env/static/private';
import { Routes, type APIChannel, type APIGuild, type APIUser, type APIEmoji, type APIRole } from 'discord-api-types/v10';
import { REST } from '@discordjs/rest';
import { page } from "$app/stores";

export const load = (async ({ parent }) => {

    const { guild } = await parent()
    
    const botRest = new REST({ authPrefix: "Bot" }).setToken(DISCORD_TOKEN);
    const channels = await botRest.get(Routes.guildChannels(guild?.id)).then((res) => res as APIChannel[]);
    const roles = await botRest.get(Routes.guildRoles(guild?.id)).then((res) => res as APIRole[]);
    //console.log(roles)
    
    return {
        channels
    };
}) satisfies PageServerLoad;