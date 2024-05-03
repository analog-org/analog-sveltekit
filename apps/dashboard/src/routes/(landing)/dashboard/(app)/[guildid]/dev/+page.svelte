<script lang="ts">
  import type { PageData } from "./$types";
  import ChannelInput from "$lib/components/inputs/channel-input.svelte";
  import { mode } from "mode-watcher";

  import { writable } from "svelte/store";
  import type { APIChannel, APIRole } from "discord-api-types/v10";

  import OldRoleInput from "$lib/components/inputs/role-input-copy.svelte";
  import RoleInput from "$lib/components/inputs/role-input.svelte";

  import { Badge } from "$lib/components/ui/badge";

  let selectedChannel = writable<APIChannel | undefined>(undefined);
  let oldSelectedRole = writable<APIRole | undefined>(undefined);
  let selectedRole: APIRole[] | undefined = [];

  import { Color, ColorInput } from "color-picker-svelte";

  let color = new Color("#ff3d91");

  $: console.log(selectedRole);

  export let data: PageData;
</script>

<center>
  Hello this is a test

  <ChannelInput bind:selectedChannel channels={data?.channels} />
  <p>Selected channel: {$selectedChannel ? $selectedChannel.name : "None"}</p>

  <OldRoleInput bind:selectedRole={oldSelectedRole} roles={data?.roles} />

  <p>
    (Old) Selected role: {$oldSelectedRole ? $oldSelectedRole.name : "None"}
    {$oldSelectedRole?.color.toString(16).padStart(6, "0")}
  </p>
  
  {#if selectedRole}
    {#each selectedRole as role}
      <Badge
        class="bg-transparent"
        style={`background: #${role.color.toString(16).padStart(6, `${$mode === "dark" ? "f" : "0"}`)}`}
      >
        {role.name}
      </Badge>
    {/each}
  {/if}
  <RoleInput bind:selectedRoles={selectedRole} roles={data?.roles} />

  <div class="w-52">
    <ColorInput bind:color title={color.toHexString()} />
    <p style={`color: ${color.toHexString()}`}>
      selected color: {color.toHexString()}
    </p>
  </div>
</center>
