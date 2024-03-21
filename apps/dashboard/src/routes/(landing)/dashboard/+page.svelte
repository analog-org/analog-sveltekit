<script lang="ts">
  import type { PageData } from "./$types";
  import Guildcard from "$lib/components/guild/guildcard.svelte";
  import * as Avatar from "$lib/components/ui/avatar";

  export let data: PageData;
</script>

<div
  class=" px-4 py-8 mx-auto sm:px-6 lg:px-8 rounded-xl flex flex-col sm:flex-row flex-initial flex-wrap justify-center"
>
  <div
    class="flex flex-col gap-8 rounded-xl sm:grid sm:grid-cols-2 sm:grid-row lg:grid-cols-3"
  >
    {#each data?.mutualGuilds || [] as guild (guild?.id)}
      <Guildcard {guild} guildSetup={true} />
    {/each}
    {#each data?.joinAbleGuilds || [] as guild (guild?.id)}
      <Guildcard {guild} guildSetup={false} />
    {/each}
  </div>
</div>
