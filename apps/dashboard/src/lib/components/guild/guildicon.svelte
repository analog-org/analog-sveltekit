<script lang="ts">
  export let guildId: string;
  export let guildIcon: string | null;
  export let userDiscriminator: string;
</script>

{#if guildIcon}
  <img 
    src={`https://cdn.discordapp.com/icons/${guildId}/${guildIcon}.png`} 
    width="96" 
    height="96" 
    class="rounded-full" 
    alt="Guild Icon" 
  />
{:else}
  <img 
    src={`https://cdn.discordapp.com/embed/avatars/${Number(userDiscriminator) % 5}.png`} 
    width="96" 
    height="96" 
    class="rounded-full" 
    alt="Default Guild Icon" 
  />
{/if}