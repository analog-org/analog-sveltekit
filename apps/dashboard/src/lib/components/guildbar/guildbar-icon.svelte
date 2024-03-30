<script  async script lang="ts">
  import { type APIGuild } from "discord-api-types/v10";
  import { page } from "$app/stores";
  import Vibrant from "node-vibrant";
  const data = $page.data;
  const guild = data.guild as APIGuild;
  const guildIcon = data.guildIcon;
  const guildAccent = data.guildAccent;
  

</script>

<div
  class="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-2.5 px-2.5 rounded-xl"
>
  <img
    src={guildIcon}
    class="flex-grow-0 flex-shrink-0 w-12 h-12 rounded-[70px] object-cover"
    style="box-shadow: 0 0 20px {guildAccent}, 0 0 5px {guildAccent};"
    alt={guild.name}
  />
  <p class="flex-grow-0 flex-shrink-0 text-2xl font-bold text-left dark:text-white text-neutral-900">
    {guild.name}
  </p>
</div>
