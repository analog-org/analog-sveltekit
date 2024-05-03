<script lang="ts">
  import { createCombobox, melt } from "@melt-ui/svelte";
  import { fly } from "svelte/transition";
  import Check from "lucide-svelte/icons/check";
  import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
  import ChevronDown from "lucide-svelte/icons/chevron-down";
  import ChevronUp from "lucide-svelte/icons/chevron-up";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import * as Command from "$lib/components/ui/command/index.js";
  import { cn } from "$lib/utils.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { tick } from "svelte";
  import { writable, derived } from "svelte/store";
  import { mode } from "mode-watcher";
  import {
    ChannelType,
    type APIChannel,
    type APIRole,
  } from "discord-api-types/v10";
  import { CircleUser } from "lucide-svelte";

  export let roles: APIRole[] = [];
 // export let filteredRoles: APIRole[] = [];
  export let selectedRoles: APIRole[] | undefined = [];

   let selectedRoleStore = writable<APIRole[] | undefined>(undefined);
  const selectedOptionsStore = writable<{ value: string; label: string }[]>([]);
  
  selectedRoleStore.subscribe(
  ($selectedRoleStore) => {
    return selectedOptionsStore.set(
      $selectedRoleStore?.map((role) => ({
        value: role.id,
        label: role.name,
        ...role,
      })) || []
    );
  }
);

  const {
    elements: { menu, input, option, label },
    states: { open, inputValue, touchedInput, selected },
    helpers: { isSelected },
  } = createCombobox({
    selected: selectedOptionsStore,
    forceVisible: true,
    multiple: true,
  });

  let sortedRoles: APIRole[] = [];

  roles.forEach((role) => {
    if (!role.tags) sortedRoles.push(role);
  });

  sortedRoles.sort((a, b) => a.position - b.position);

  $: filteredRoles = $touchedInput
    ? sortedRoles.filter(({ name }) => {
        const normalizedInput = $inputValue.toLowerCase();
        console.log($selected);
        return name.toLowerCase().includes(normalizedInput);
      })
    : sortedRoles;
    // @ts-ignore
  $: selectedRoles = $selected?.map(item => {
    const { label, value } = item;
    return value;
});

</script>

<div class="flex flex-col gap-1">

  <div class="relative">
    <input
      use:melt={$input}
      class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      placeholder="Role name"
    />
    <!-- <div class="absolute right-2 top-1/2 z-10 -translate-y-1/2 text-magnum-900">
      {#if $open}
        <ChevronUp class="size-4" />
      {:else}
        <ChevronDown class="size-4" />
      {/if}
    </div> -->
  </div>
</div>
{#if $open}
  <ul
    class="z-10 flex max-h-[300px] flex-col overflow-hidden rounded-lg"
    use:melt={$menu}
    transition:fly={{ duration: 150, y: -5 }}
  >
    <div
      class="flex max-h-full flex-col gap-0 overflow-y-auto "
    >
      {#each filteredRoles as role, index (index)}
        <li
          use:melt={$option({
            value: role,
            label: role.name,
          })}
          class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
        >
          {#if $isSelected(role)}
            <div class="check absolute left-2 top-1/2 z-10 ">
              <Check class="size-2" />
            </div>
          {/if}
          <div class="pl-4">
            <span class="font-medium">{role.name}</span>
          </div>
        </li>
      {:else}
        <li
          class="relative cursor-pointer rounded-md py-1 pl-8 pr-4 data-[highlighted]:bg-magnum-100 data-[highlighted]:text-magnum-700"
        >
          No results found
        </li>
      {/each}
    </div>
  </ul>
{/if}

<style lang="postcss">
  .check {
    @apply absolute left-2 top-1/2 ;
    translate: 0 calc(-50% + 1px);
  }
</style>
