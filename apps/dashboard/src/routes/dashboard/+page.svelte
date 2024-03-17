<script lang="ts">
  import type { PageData } from "./$types";
  import Guildcard from "$lib/components/guild/guildcard.svelte";
  import * as Avatar from "$lib/components/ui/avatar";

  export let data: PageData;
  console.log(data.userGuilds);
</script>

<!-- <div
  class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 justify-items-center"
>
  {#each data?.mutualGuilds || [] as guild (guild?.id)}
    <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
      <a href={`/dashboard/${guild?.id}`}>
        <Avatar.Root>
          <Avatar.Image
            src={`https://cdn.discordapp.com/icons/${guild?.id}/${guild?.icon}.png`}
          />
          <Avatar.Fallback>{guild?.name[0]}{guild?.name[1]}</Avatar.Fallback>
        </Avatar.Root>
      </a>
    </div>
  {/each}
  {#each data?.joinAbleGuilds || [] as guild (guild?.id)}
    <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
      <a href={`https://discord.com/oauth2/authorize?client_id=${data?.bot.id}&permissions=8&scope=bot+applications.commands&guild_id=${guild.id}&disable_guild_select=true`}>
        <Avatar.Root>
          <Avatar.Image
            src={`https://cdn.discordapp.com/icons/${guild?.id}/${guild?.icon}.png`}
          />
          <Avatar.Fallback>{guild?.name[0]}{guild?.name[1]}</Avatar.Fallback>
        </Avatar.Root>
      </a>
    </div>
  {/each}
</div>
 -->

<div
  class=" px-4 py-8 mx-auto sm:px-6 lg:px-8 rounded-xl flex flex-col sm:flex-row flex-initial flex-wrap justify-center"
>
  <div
    class="flex flex-col gap-8 rounded-xl sm:grid sm:grid-cols-2 sm:grid-row lg:grid-cols-3"
  >
    {#each data?.mutualGuilds || [] as guild (guild?.id)}
      <Guildcard {guild} guildSetup={true} user={data?.user} />
    {/each}
    {#each data?.joinAbleGuilds || [] as guild (guild?.id)}
      <Guildcard {guild} guildSetup={false} user={data?.user} />
    {/each}
  </div>
</div>
