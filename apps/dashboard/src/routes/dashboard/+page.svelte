<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
  console.log(data.mutualGuilds);
</script>

<div>
  <p>tha dashboard</p>
  {#each data?.mutualGuilds || [] as guild (guild?.id)}
    <p>{guild?.name}</p>
  {/each}
</div>
