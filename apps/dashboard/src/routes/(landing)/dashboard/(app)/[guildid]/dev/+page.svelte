<script lang="ts">
  import type { PageData } from "./$types";
  import ChannelInput from "$lib/components/inputs/channel-input.svelte";
  import { mode } from "mode-watcher";

  import { writable } from "svelte/store";
  import type { APIChannel, APIRole } from "discord-api-types/v10";

  import OldRoleInput from "$lib/components/inputs/role-input.svelte";
  import MultiRoleInput from "$lib/components/inputs/multi-role-input.svelte";
  import RoleInput from "$lib/components/inputs/role-input.svelte";
  import MultiChannelInput from "$lib/components/inputs/multi-channel-input.svelte";

  import { Badge } from "$lib/components/ui/badge";

  let selectedChannel = writable<APIChannel | undefined>(undefined);
  let selectedRoles: APIRole[] | undefined = [];
  let selectedRole: APIRole | undefined;

  let selectedChannels: APIChannel[] | undefined = [];

  import { Color, ColorInput } from "color-picker-svelte";

  let color = new Color("#ff3d91");
  export let data: PageData;
</script>

<center>
  Hello this is a test

  <ChannelInput bind:selectedChannel channels={data?.channels} />
  <p>Selected channel: {$selectedChannel ? $selectedChannel.name : "None"}</p>

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
  <MultiRoleInput bind:selectedRoles roles={data?.roles} />

  <MultiChannelInput bind:selectedChannels channels={data?.channels} />
  {#if selectedChannels}
    {#each selectedChannels as channel}
      <Badge
        class="bg-transparent"
        variant="default"
        style={`background: #${channel?.id
          .substring(channel.id?.length - 6, channel.id?.length)
          .toString(16)
          .padStart(6, `${$mode === "dark" ? "f" : "0"}`)}`}
      >
       # {channel.name}
      </Badge>
    {/each}
  {/if}

  <RoleInput bind:selectedRole roles={data?.roles} />
  <Badge
    class="bg-transparent"
    style={`background: #${selectedRole?.color.toString(16).padStart(6, `${$mode === "dark" ? "f" : "0"}`)}`}
  >
    {selectedRole?.name}
  </Badge>
  <br />
  <div class="w-52">
    <ColorInput bind:color title={color.toHexString()} />
    <p style={`color: ${color.toHexString()}`}>
      selected color: {color.toHexString()}
    </p>
  </div>
</center>
