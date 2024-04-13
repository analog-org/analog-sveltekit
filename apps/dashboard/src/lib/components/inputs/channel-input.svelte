<script lang="ts">
  import Check from "lucide-svelte/icons/check";
  import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import * as Command from "$lib/components/ui/command/index.js";
  import { cn } from "$lib/utils.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { tick } from "svelte";
  import { ChannelType, type APIChannel } from "discord-api-types/v10";

  export let channels: APIChannel[] = [];

  let sortedChannels: any = [];
  let currentGroup: any = null;

  channels.forEach((channel) => {
    if (channel.type === 4) {
      currentGroup = {
        id: channel.id,
        name: channel.name,
        position: channel.position,
        items: [],
      };
      sortedChannels.push(currentGroup);
    } else if (
      (channel.type === ChannelType.GuildVoice ||
        channel.type === ChannelType.GuildText ||
        channel.type === ChannelType.GuildAnnouncement) &&
      currentGroup
    ) {
      let parentGroup = sortedChannels.find(
        (group: any) => group.id === channel.parent_id
      );
      if (parentGroup) {
        parentGroup.items.push({
          id: channel.id,
          name: channel.name,
          position: channel.position,
        });
      }
    }
  });

  sortedChannels.forEach((group) => {
    group.items.sort((a, b) => a.position - b.position);
  });
  sortedChannels.sort((a, b) => a.position - b.position);

  let open = false;
  let name = "";

  $: selectedValue =
    sortedChannels
      .map((group) => group.items)
      .flat()
      .find((item) => item.name === name)?? "Select a channel...";

  // We want to refocus the trigger button when the user selects
  // an item from the list so users can continue navigating the
  // rest of the form with the keyboard.
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
    <p class="truncate">{selectedValue.name ?? "Select a channel..."}</p>
      
      <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  </Popover.Trigger>
  <Popover.Content class="w-[200px] p-0">
    <Command.Root class="">
      <Command.Input placeholder="Search Channels..." />
      <Command.Empty>No Channels found.</Command.Empty>
      <div class="h-56 overflow-auto" >
        {#each sortedChannels as group (group.id)}
        <Command.Group>
          <p class="text-zinc-400 text-xs">{group.name}</p>
          
          {#each group.items as item (item.id)}
            <Command.Item
              value={item.name}
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
              <p class="truncate">{item.name}</p>
              
            </Command.Item>
          {/each}
        </Command.Group>
      {/each}
      </div>
      
    </Command.Root>
  </Popover.Content>
</Popover.Root>
