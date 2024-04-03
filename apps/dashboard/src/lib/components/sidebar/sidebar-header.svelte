<script lang="ts">
  import type { APIUser } from "discord-api-types/v10";
  export let bot: APIUser;
</script>

<div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
  <a href="/" class="flex items-center gap-2 font-semibold">
    <img
      class="h-6 w-6 rounded-full"
      src={`https://cdn.discordapp.com/avatars/${bot?.id}/${bot?.avatar}.png?size=1024&format=webp&quality=lossless&width=0&height=256`}
      alt={bot?.username}
    />
    <span class="">{bot.username}</span>
  </a>
</div>
