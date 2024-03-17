<script lang="ts">
  import { onMount } from "svelte";
  import GuildIcon from "./guildicon.svelte";
  import GuildIconLG from "./guildiconlarge.svelte";
  import type { APIGuild, APIUser } from "discord-api-types/v10";
  import { Button } from "$lib/components/ui/button/index.js";
  import { page } from "$app/stores";
  import * as Card from "$lib/components/ui/card";

  export let guild: APIGuild;
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

<Card.Root>
  <Card.Header>
    <div>
      <div class="flex items-center justify-center relative">
        <GuildIconLG {guildIcon} {guildId} {userDiscriminator} />
        <div class="absolute">
          <GuildIcon {guildIcon} {guildId} {userDiscriminator} />
        </div>
      </div>
    </div>
  </Card.Header>
  <Card.Content>
    <div class="flex flex-row justify-between">
      <h1 class=" flex-none font-helvetica font-bold text-xl px-2 pb-2">
        {guildName}
      </h1>
      <div class="flex-none">
        <Button href={link}>{guildSetup ? "Manage" : "Invite"}</Button>
      </div>
    </div>
  </Card.Content>
</Card.Root>
