<script lang="ts">
  export let guildId: string;
  export let guildIcon: string | null;
  export let userDiscriminator: number;
</script>

{#if guildIcon}
  <img 
    src={`https://cdn.discordapp.com/icons/${guildId}/${guildIcon}.png`} 
    class="blur-md rounded-xl" 
    alt="Guild Icon" 
    style="object-fit: cover; width: 100%; height: 100%;" 
  />
{:else}
  <img 
    src={`https://cdn.discordapp.com/embed/avatars/${userDiscriminator % 5}.png`} 
    class="blur-md" 
    alt="Default Guild Icon" 
    style="object-fit: cover; width: 100%; height: 100%;" 
  />
{/if}