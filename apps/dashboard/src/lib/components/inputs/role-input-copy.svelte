<script lang="ts">
  import Check from "lucide-svelte/icons/check";
  import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import * as Command from "$lib/components/ui/command/index.js";
  import { Combobox } from "bits-ui";
  import { cn, flyAndScale } from "$lib/utils.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { tick } from "svelte";
  import { writable } from "svelte/store";
  import { mode } from "mode-watcher";
  import { type APIRole } from "discord-api-types/v10";
  import { CircleUser } from "lucide-svelte";

  export let roles: APIRole[] = [];

  const selectedRoleStore = writable<APIRole[] | undefined>([]);

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

  $: {
    
    const foundRole =
      open && name
        ? sortedRoles.filter((item) => item.name.toLowerCase().includes(name.toLowerCase()))
        : sortedRoles;
    
    selectedRoleStore.set(foundRole.length > 0 ? foundRole : undefined);
  }

  
</script>

<Combobox.Root
  items={$selectedRoleStore?.map((role) => ({ value: role.name, ...role }))}
  bind:inputValue={name} 
  bind:touchedInput={open}
  
  
>
  <div class="relative">
    <Combobox.Input
      class="inline-flex h-input w-[296px] truncate rounded-9px border border-border-input bg-background px-11 text-sm transition-colors placeholder:text-foreground-alt/50 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background"
      placeholder="Select a Role"
      aria-label="Select a Role"
    />
    <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
  </div>

  <Combobox.Content
    class="w-full rounded-xl border border-muted bg-background px-1 py-3 shadow-popover outline-none h-56 overflow-auto"
    transition={flyAndScale}
    sideOffset={8}
  >
    {#each $selectedRoleStore ?? [] as role (role.name)}
      <Combobox.Item
        class="flex h-10 w-full select-none items-center rounded-button py-3 pl-5 pr-1.5 text-sm capitalize outline-none transition-all duration-75 data-[highlighted]:bg-muted"
        value={role.name}
        
        
        label={role.name}
      >
        {role.name}
        <Combobox.ItemIndicator class="ml-auto" asChild={false}>
          <Check />
        </Combobox.ItemIndicator>
      </Combobox.Item>
    {:else}
      <span class="block px-5 py-2 text-sm text-muted-foreground">
        No results found
      </span>
    {/each}
  </Combobox.Content>
  <Combobox.HiddenInput name="favoriteFruit" />
</Combobox.Root>

<!-- <Popover.Root bind:open let:ids>
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
 -->
