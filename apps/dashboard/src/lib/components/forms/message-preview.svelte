<script lang="ts">
  import { type APIUser } from "discord-api-types/v10";
  import { page } from "$app/stores";

  const bot = $page.data.bot as APIUser;
  import "@skyra/discord-components-core";

  import { messageSchema, type MessageSchema } from "$lib/schemas";
  import {
    type SuperValidated,
    type Infer,
    superForm,
  } from "sveltekit-superforms";

  export let message: SuperValidated<Infer<MessageSchema>>;
</script>

<div class="z-0">
  <discord-messages class="rounded-xl">
    <discord-message
      author={bot?.username}
      avatar={`https://cdn.discordapp.com/avatars/${bot.id}/${bot.avatar}.png?size=1024&format=webp&quality=lossless&width=0&height=256`}
    >
      {#if message?.content}
        {message.content}
      {/if}
      {#if message.embeds}
        {#each message.embeds as embed}
          <discord-embed embed-title={embed.title} color={embed.color}>
            {#if embed.description}
              <discord-embed-description slot="description">
                {embed.description}
              </discord-embed-description>
            {/if}

            {#if embed.fields}
              {#each embed.fields as field}
                <discord-field
                  title={field.title}
                  description={field.description}
                  inline={field.inline}
                />
              {/each}
            {/if}
          </discord-embed>
        {/each}
      {/if}
    </discord-message>
  </discord-messages>
</div>
