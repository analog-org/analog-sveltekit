<script lang="ts">
  import { createCombobox, melt } from "@melt-ui/svelte";
  import { fly } from "svelte/transition";
  import Check from "lucide-svelte/icons/check";
  import ChevronDown from "lucide-svelte/icons/chevron-down";
  import ChevronUp from "lucide-svelte/icons/chevron-up";
  import { type APIRole } from "discord-api-types/v10";
 
  import { writable } from "svelte/store";

  export let roles: APIRole[];
  export let selectedRole: APIRole | undefined;

  let selectedRoleStore = writable<APIRole | undefined>(selectedRole);
  const selectedOptionsStore = writable<{ value: string; label: string } | undefined>(undefined);

  selectedRoleStore.subscribe(($selectedRoleStore) => {
    if ($selectedRoleStore) {
      selectedOptionsStore.set({
        value: $selectedRoleStore.id,
        label: $selectedRoleStore.name,
        ...$selectedRoleStore,
      });
    } else {
      selectedOptionsStore.set(undefined);
    }
  });

  const {
    elements: { menu, input, option, label },
    states: { open, inputValue, touchedInput, selected },
    helpers: { isSelected },
  } = createCombobox<APIRole>({
    // @ts-ignore
    selected: selectedOptionsStore,
    forceVisible: true,
  });

  let sortedRoles: APIRole[] = [];

  roles.forEach((role) => {
    if (!role.tags) sortedRoles.push(role);
  });

  sortedRoles.sort((a, b) => a.position - b.position);
  
  $: if (!$open) {
    // @ts-ignore
    $inputValue = $selected?.label ?? '';
  }

  $: filteredRoles = $touchedInput
    ? sortedRoles.filter(({ name }) => {
        const normalizedInput = $inputValue.toLowerCase();
        return name.toLowerCase().includes(normalizedInput);
      })
    : sortedRoles;
  // @ts-ignore
  $: selectedRole = $selected?.value;
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
    <div
      class="flex max-h-full flex-col gap-0 overflow-y-auto "
    >
      {#each filteredRoles as role, index (index)}
        <li
          use:melt={$option({
            value: role,
            label: role.name,
          })}
          class="relative flex cursor-default select-none items-center rounded-sm hover:bg-accent px-2 py-1.5 text-sm outline-none  "
        >
        <div class="flex flex-row gap-2">
          {#if $isSelected(role)}
            <div class="check  ">
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
    @apply absolute left-2 top-1/2 ;
    translate: 0 calc(-50% + 1px);
  }
</style>
