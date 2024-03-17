<script lang="ts">
  import { onMount } from "svelte";
  import GuildIcon from "./guildicon.svelte";
  import GuildIconLG from "./guildiconlarge.svelte";
  import type { APIGuild, APIUser } from "discord-api-types/v10";
  import { Button } from "$lib/components/ui/button/index.js";
  import { page } from "$app/stores";

  export let guild: APIGuild; // This is the guild object from discord.js
  export let guildSetup: boolean;

  const bot = $page.data.bot as APIUser;
  const user = $page.data.user as APIUser;
  
  let guildId = guild.id;
  let guildIcon = guild.icon;
  let guildName = guild.name;
  let userDiscriminator = user?.discriminator;

  let link: string;

  onMount(() => {
    if (guildSetup) {
      link = `/dashboard/${guildId}`;
    } else {
      link = `https://discord.com/api/oauth2/authorize?client_id=${bot.id}&permissions=8&scope=bot%20applications.commands&guild_id=${guildId}&disable_guild_select=true`;
    }
  });
</script>

<div class="h-56 flex gap-4 flex-col w-72 sm:w-80 bg-black rounded-xl relative">
  <div
    class="py-2 pl-2 relative items-center justify-end overflow-hidden w-full h-full rounded-xl"
  >
    <GuildIconLG {guildIcon} {guildId} {userDiscriminator} />
  </div>
  <span class="absolute top-9 left-28 items-center justify-center">
    <GuildIcon {guildIcon} {guildId} {userDiscriminator} />
  </span>
  <div class="flex flex-row justify-start">
    <h1 class="text-white flex-none font-helvetica font-bold text-xl px-2 pb-2">
      {guildName}
    </h1>
    <div class="flex-none">
      <Button href={link}>{guildSetup ? "Manage" : "Invite"}</Button>
    </div>
  </div>
</div>
