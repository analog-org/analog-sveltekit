<script lang="ts">
  import Check from "lucide-svelte/icons/check";
  import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import * as Command from "$lib/components/ui/command/index.js";
  import { cn } from "$lib/utils.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { tick } from "svelte";
  import { writable } from "svelte/store";
  import { ChannelType, type APIChannel } from "discord-api-types/v10";

  export let channels: APIChannel[] = [];

  const selectedChannelStore = writable<APIChannel | undefined>(undefined);

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

  export const selectedChannel = {
    subscribe: selectedChannelStore.subscribe,
  };

  let open = false;
  let name = "";

  $: selectedChannelStore.set(
    sortedChannels
      .map((group) => group.items)
      .flat()
      .find((item) => item.name === name) ?? undefined
  );

  console.log(selectedChannel);
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
      <p class="truncate">{$selectedChannelStore?.name ?? "Select a channel..."}</p>

      <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  </Popover.Trigger>
  <Popover.Content class="w-[200px] p-0">
    <Command.Root class="">
      <Command.Input placeholder="Search Channels..." />
      <Command.Empty>No Channels found.</Command.Empty>
      <div class="h-56 overflow-auto">
        {#each sortedChannels as group (group.channel.id)}
          <Command.Group>
            <p class="text-zinc-400 text-xs">{group.channel.name}</p>

            {#each group.items as item (item.id)}
              <Command.Item
                value={`${item.name}`}
                onSelect={(currentValue) => {
                  name = currentValue;
                  closeAndFocusTrigger(ids.trigger);
                }}
              >
                <Check
                  class={cn(
                    "mr-2 h-4 w-4",
                    name !== item.name && "text-transparent"
                  )}
                />
                <p class="truncate"># {item.name}</p>
              </Command.Item>
            {/each}
          </Command.Group>
        {/each}
      </div>
    </Command.Root>
  </Popover.Content>
</Popover.Root>
