<script lang="ts">
  import Check from "lucide-svelte/icons/check";
  import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import * as Command from "$lib/components/ui/command/index.js";
  import { cn } from "$lib/utils.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { tick } from "svelte";
  import { writable } from "svelte/store";
  import { mode } from "mode-watcher";
  import {
    ChannelType,
    type APIChannel,
    type APIRole,
  } from "discord-api-types/v10";
  import { CircleUser } from "lucide-svelte";

  export let roles: APIRole[] = [];

  const selectedRoleStore = writable<APIRole | undefined>(undefined);

  let sortedRoles: APIRole[] = [];

  roles.forEach((role) => {
    if (!role.tags) sortedRoles.push(role);
  });

  sortedRoles.sort((a, b) => a.position - b.position);

  export const selectedRole = {
    subscribe: selectedRoleStore.subscribe,
  };

  let open = false;
  let name = "";

  

  $: selectedRoleStore.set(
    sortedRoles.find((item) => item.name === name) ?? undefined
  );

  function closeAndFocusTrigger(triggerId: string) {
    open = false;
    tick().then(() => {
      document.getElementById(triggerId)?.focus();
    });
  }
</script>

<Popover.Root bind:open let:ids>
  <Popover.Trigger asChild let:builder>
    <Button
      builders={[builder]}
      variant="outline"
      role="combobox"
      aria-expanded={open}
      class="w-[200px] justify-between "
    >
      <p class="truncate">
        {$selectedRoleStore?.name ?? "Select a role..."}
      </p>

      <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  </Popover.Trigger>
  <Popover.Content class="w-[200px] p-0">
    <Command.Root class="">
      <Command.Input placeholder="Search Roles..." />
      <Command.Empty>No Roles found.</Command.Empty>
      <div class="h-56 overflow-auto">
        <Command.Group>
          {#each sortedRoles as role (role.id)}
            <Command.Item
              value={`${role.name}`}
              onSelect={(currentValue) => {
                name = currentValue;
                closeAndFocusTrigger(ids.trigger);
              }}
            >
              <Check
                class={cn(
                  "mr-2 h-4 w-4",
                  name !== role.name && "text-transparent"
                )}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke={`#${ role.color.toString(16).padStart(6, `${$mode === "dark" ? "f" : "0"}`)}`}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-circle-user"
                ><circle cx="12" cy="12" r="10" /><circle
                  cx="12"
                  cy="10"
                  r="3"
                /><path
                  d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"
                /></svg
              >
              <p class="pl-1 truncate">{role.name}</p>
            </Command.Item>
          {/each}
        </Command.Group>
      </div>
    </Command.Root>
  </Popover.Content>
</Popover.Root>
