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
  import { writable } from "svelte/store";
  import { mode } from "mode-watcher";
  import {
    ChannelType,
    type APIChannel,
    type APIRole,
  } from "discord-api-types/v10";
  import { CircleUser } from "lucide-svelte";

  export let roles: APIRole[] = [];
  export let filteredRoles: APIRole[] = [];
  export const selectedRoleStore = writable<APIRole[] | undefined>(undefined);

  const {
    elements: { menu, input, option, label },
    states: { open, inputValue, touchedInput },
    helpers: { isSelected },
  } = createCombobox({
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
        return name.toLowerCase().includes(normalizedInput);
      })
    : sortedRoles;

  $: selectedRoleStore.set(
    filteredRoles
  );
</script>

<div class="flex flex-col gap-1">
  <label use:melt={$label} for="role-input">
    <span class="text-sm font-medium text-magnum-900">Choose a role:</span>
  </label>

  <div class="relative">
    <input
      use:melt={$input}
      class="flex h-10 items-center justify-between rounded-lg bg-white px-3 pr-12 text-black"
      placeholder="Role name"
    />
    <div class="absolute right-2 top-1/2 z-10 -translate-y-1/2 text-magnum-900">
      {#if $open}
        <ChevronUp class="size-4" />
      {:else}
        <ChevronDown class="size-4" />
      {/if}
    </div>
  </div>
</div>
{#if $open}
  <ul
    class="z-10 flex max-h-[300px] flex-col overflow-hidden rounded-lg"
    use:melt={$menu}
    transition:fly={{ duration: 150, y: -5 }}
  >
    <div
      class="flex max-h-full flex-col gap-0 overflow-y-auto bg-white px-2 py-2 text-black"
    >
      {#each filteredRoles as role, index (index)}
        <li
          use:melt={$option({
            value: role,
            label: role.name,
          })}
          class="relative cursor-pointer scroll-my-2 rounded-md py-2 pl-4 pr-4 data-[highlighted]:bg-magnum-200 data-[highlighted]:text-magnum-900"
        >
          {#if $isSelected(role)}
            <div class="check absolute left-2 top-1/2 z-10 text-magnum-900">
              <Check class="size-4" />
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
    @apply absolute left-2 top-1/2 text-magnum-500;
    translate: 0 calc(-50% + 1px);
  }
</style>
