<script lang="ts">
  import Check from "lucide-svelte/icons/check";
  import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import * as Command from "$lib/components/ui/command/index.js";
  import { cn } from "$lib/utils.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { tick } from "svelte";
  import { writable } from "svelte/store";
  import {
    ChannelType,
    type APIChannel,
    type APIRole,
  } from "discord-api-types/v10";

  export let roles: APIROle[] = [];

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

  console.log(selectedRole);
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
        {$selectedRoleStore?.name ?? "Select a channel..."}
      </p>

      <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  </Popover.Trigger>
  <Popover.Content class="w-[200px] p-0">
    <Command.Root class="">
      <Command.Input placeholder="Search Channels..." />
      <Command.Empty>No Channels found.</Command.Empty>
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
              <p class="truncate">@ {role.name}</p>
            </Command.Item>
          {/each}
        </Command.Group>
      </div>
    </Command.Root>
  </Popover.Content>
</Popover.Root>
