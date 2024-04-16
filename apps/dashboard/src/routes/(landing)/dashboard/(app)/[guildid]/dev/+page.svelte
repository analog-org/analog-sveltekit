<script lang="ts">
  import type { PageData } from "./$types";
  import ChannelInput from "$lib/components/inputs/channel-input.svelte";
  import ColorPicker from "svelte-awesome-color-picker";
  import { writable } from "svelte/store";
  import type { APIChannel, APIRole } from "discord-api-types/v10";

  import RoleInput from "$lib/components/inputs/role-input.svelte";

  let hex: string;
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

  <ColorInput bind:color  class="w-52 "  /> 
  <ColorPicker bind:hex  />
  <p style={`color: ${hex}`}>selected color: {hex}</p>
</center>
