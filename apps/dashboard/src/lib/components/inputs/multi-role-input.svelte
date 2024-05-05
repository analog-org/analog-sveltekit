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

  selectedRoleStore.subscribe(($selectedRoleStore) => {
    return selectedOptionsStore.set(
      $selectedRoleStore?.map((role) => ({
        value: role.id,
        label: role.name,
        ...role,
      })) || []
    );
  });

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
  $: if (!$open) {
    $inputValue = $selected?.map((value) => value?.label).join(", ")  ?? "";
  }

  $: if ($open) {
    $inputValue = '';
  }


  $: filteredRoles = $touchedInput
    ? sortedRoles.filter(({ name }) => {
        const normalizedInput = $inputValue.toLowerCase();
        console.log($selected);
        return name.toLowerCase().includes(normalizedInput);
      })
    : sortedRoles;
  // @ts-ignore
  $: selectedRoles = $selected?.map((item) => {
    const { label, value } = item;
    return value;
  });
</script>

<div class="flex flex-col gap-1">
  <div class="relative">
    <input
      use:melt={$input}
      class="flex h-10 w-[200px] rounded-md border bg-popover p-4 text-popover-foreground shadow-md px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      placeholder="Role name"
    />
  </div>
</div>
{#if $open}
  <ul
    class="z-10 flex max-h-[300px] flex-col overflow-hidden rounded-lg border bg-popover p-4 text-popover-foreground shadow-md"
    use:melt={$menu}
    transition:fly={{ duration: 150, y: -5 }}
  >
    <div class="flex max-h-full flex-col gap-0 overflow-y-auto">
      {#each filteredRoles as role, index (index)}
        <li
          use:melt={$option({
            value: role,
            label: role.name,
          })}
          class="relative flex cursor-default select-none items-center rounded-sm hover:bg-accent px-2 py-1.5 text-sm outline-none"
        >
          <div class="flex flex-row gap-2">
            {#if $isSelected(role)}
              <div class="check">
                <Check class="size-2" />
              </div>
            {/if}
            <div class="pl-8">
              <span class="font-medium">{role.name}</span>
            </div>
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
    @apply absolute left-2 top-1/2;
    translate: 0 calc(-50% + 1px);
  }
</style>
