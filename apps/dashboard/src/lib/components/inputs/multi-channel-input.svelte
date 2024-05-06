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
  import { ChannelType, type APIChannel } from "discord-api-types/v10";
  import { CircleUser } from "lucide-svelte";

  export let channels: APIChannel[] = [];
  export let selectedChannels: APIChannel[] | undefined = [];

  let selectedChannelStore = writable<APIChannel[] | undefined>(undefined);
  const selectedOptionsStore = writable<{ value: string; label: string }[]>([]);

  selectedChannelStore.subscribe(($selectedChannelStore) => {
    return selectedOptionsStore.set(
      $selectedChannelStore?.map((channel) => ({
        value: channel.name?.toLowerCase() || "",
        label: channel.name || "",
        ...channel,
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

  type ChannelGroup = {
    channel: APIChannel;
    items: APIChannel[];
  };

  let sortedChannels: ChannelGroup[] = [];
  let currentGroup: ChannelGroup;

  let validTypes = [
    ChannelType.GuildVoice,
    ChannelType.GuildText,
    ChannelType.GuildAnnouncement,
  ];

  channels.forEach((channel) => {
    if (channel.type === 4) {
      currentGroup = { channel, items: [] };
      sortedChannels.push(currentGroup);
    } else if (
      validTypes.includes(channel.type) &&
      currentGroup &&
      "parent_id" in channel
    ) {
      let parentGroup = sortedChannels.find(
        (group: ChannelGroup) => group.channel.id == channel.parent_id
      );
      if (parentGroup) {
        parentGroup.items.push(channel);
      }
    }
  });

  sortedChannels.forEach((group) => {
    group.items.sort((a, b) => {
      if (
        "position" in a &&
        "position" in b &&
        validTypes.includes(a.type) &&
        validTypes.includes(b.type)
      ) {
        return a.position - b.position;
      }
      return 0;
    });
  });
  sortedChannels.sort((a, b) => {
    if (
      "position" in a.channel &&
      "position" in b.channel &&
      a.channel.type === ChannelType.GuildCategory &&
      b.channel.type === ChannelType.GuildCategory
    ) {
      return a.channel.position - b.channel.position;
    }
    return 0;
  });

  $: if (!$open) {
    $inputValue = $selected?.map((value) => value?.label).join(", ") ?? "";
  }

  $: if ($open) {
    $inputValue = "";
  }

  let filteredChannels: ChannelGroup[] = [];

  $: filteredChannels = $touchedInput
    ? sortedChannels.filter((group) =>
        group.items.some((channel) =>
          channel.name?.toLowerCase().includes($inputValue.toLowerCase())
        )
      )
    : sortedChannels;

    // @ts-ignore
  $: selectedChannels = $selected?.map((item) => {
    const { label, value } = item;
    console.log(item);
    return value;
  });
</script>

<div class="flex flex-col gap-1">
  <div class="relative">
    <input
      use:melt={$input}
      class="flex h-10 w-[200px] rounded-md border bg-popover p-4 text-popover-foreground shadow-md px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      placeholder={$open ? "Search for a channel" : "Select channels"}
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
      {#each filteredChannels as group}
        <p class="text-zinc-400 text-xs">{group.channel.name}</p>
        {#each group.items as channel, index (index)}
          <li
            use:melt={$option({
              value: channel,
              label: channel?.name ?? "",
            })}
            class="relative flex cursor-default select-none items-center rounded-sm hover:bg-accent px-2 py-1.5 text-sm outline-none"
          >
            <div class="flex flex-row gap-2">
              {#if $isSelected(channel)}
                <div class="check">
                  <Check class="size-2" />
                </div>
              {/if}
              <div class="pl-8">
                <span class="font-medium"># {channel.name}</span>
              </div>
            </div>
          </li>
        {/each}
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
