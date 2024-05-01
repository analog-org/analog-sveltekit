<script lang="ts">
  import type { PageData } from "./$types";
  import ChannelInput from "$lib/components/inputs/channel-input.svelte";

  import { writable } from "svelte/store";
  import type { APIChannel, APIRole } from "discord-api-types/v10";

  import RoleInput from "$lib/components/inputs/role-input-copy.svelte";

  let selectedChannel = writable<APIChannel | undefined>(undefined);
  let selectedRole = writable<APIRole | undefined>(undefined);

  import { Color, ColorInput } from "color-picker-svelte";

  let color = new Color("#ff3d91");

  export let data: PageData;
</script>

<center>
  Hello this is a test

  <ChannelInput bind:selectedChannel channels={data?.channels} />
  <p>Selected channel: {$selectedChannel ? $selectedChannel.name : "None"}</p>

  <RoleInput bind:selectedRole roles={data?.roles} />
  <p>
    Selected role: {$selectedRole ? $selectedRole.name : "None"}
    {$selectedRole?.color.toString(16).padStart(6, "0")}
  </p>
  <div class="w-52">
    <ColorInput bind:color title={color.toHexString()} />
    <p style={`color: ${color.toHexString()}`}>
      selected color: {color.toHexString()}
    </p>
  </div>
</center>
