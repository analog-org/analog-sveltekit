<script lang="ts">
  import type { PageData } from "./$types";
  import ChannelInput from "$lib/components/inputs/channel-input.svelte";
  import { mode } from "mode-watcher";

  import type { APIChannel, APIRole } from "discord-api-types/v10";

  import MultiRoleInput from "$lib/components/inputs/multi-role-input.svelte";
  import RoleInput from "$lib/components/inputs/role-input.svelte";
  import MultiChannelInput from "$lib/components/inputs/multi-channel-input.svelte";

  import MessageForm from "$lib/components/forms/message-form.svelte";

  import { Badge } from "$lib/components/ui/badge";
  let selectedRoles: APIRole[] | undefined = [];
  let selectedRole: APIRole | undefined;

  let selectedChannels: APIChannel[] | undefined = [];
  let selectedChannel: APIChannel | undefined;

  import { Color, ColorInput } from "color-picker-svelte";

  let color = new Color("#ff3d91");
  export let data: PageData;
</script>

<center class="space-y-5">
  Hello this is a test

  <ChannelInput bind:selectedChannel channels={data?.channels} />
  {#if selectedChannel}
    <Badge
      class="bg-transparent"
      style={`background: #${selectedChannel?.id
        .substring(selectedChannel?.id?.length - 6, selectedChannel?.id?.length)
        .toString()
        .padStart(6, `${$mode === "dark" ? "f" : "0"}`)}`}
    >
      {selectedChannel?.name}
    </Badge>
  {/if}

  <MultiChannelInput bind:selectedChannels channels={data?.channels} />
  {#if selectedChannels}
    {#each selectedChannels as channel}
      <Badge
        class="bg-transparent"
        variant="default"
        style={`background: #${channel?.id
          .substring(channel.id?.length - 6, channel.id?.length)
          .toString()
          .padStart(6, `${$mode === "dark" ? "f" : "0"}`)}`}
      >
        # {channel.name}
      </Badge>
    {/each}
  {/if}

  <RoleInput bind:selectedRole roles={data?.roles} />
  {#if selectedRole}
    <Badge
      class="bg-transparent"
      style={`background: #${selectedRole?.color.toString(16).padStart(6, `${$mode === "dark" ? "f" : "0"}`)}`}
    >
      {selectedRole?.name}
    </Badge>
  {/if}

  <MultiRoleInput bind:selectedRoles roles={data?.roles} />
  {#if selectedRoles}
    {#each selectedRoles as role}
      <Badge
        class="bg-transparent"
        style={`background: #${role.color.toString(16).padStart(6, `${$mode === "dark" ? "f" : "0"}`)}`}
      >
        {role.name}
      </Badge>
    {/each}
  {/if}

  <div class="w-52">
    <ColorInput bind:color title={color.toHexString()} />
    <p style={`color: ${color.toHexString()}`}>
      selected color: {color.toHexString()}
    </p>
  </div>

  <h1 class="text-2xl">Send a Message</h1>
  <MessageForm data={data.form} />

</center>
