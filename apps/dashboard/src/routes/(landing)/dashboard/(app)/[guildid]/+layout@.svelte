<script lang="ts">
  import type { LayoutData } from "./$types";
  import Guildbar from "$lib/components/guildbar/guildbar.svelte";
  import GuildbarContainer from "$lib/components/guildbar/guildbar-container.svelte";
  import GuildbarIcon from "$lib/components/guildbar/guildbar-icon.svelte";
  import GuildbarContent from "$lib/components/guildbar/guildbar-content.svelte";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { Button } from "$lib/components/ui/button";
  import * as Avatar from "$lib/components/ui/avatar";
  import { NavHamburger } from "flowbite-svelte";
  import { signOut} from "@auth/sveltekit/client";
  import { Sun, Moon } from "lucide-svelte";
  import { toggleMode } from "mode-watcher";

  export let data: LayoutData;
</script>

<GuildbarContainer>
  <Guildbar>
    <GuildbarIcon />
    <GuildbarContent>
      <Button on:click={toggleMode} variant="ghost" size="icon">
        <Sun
          class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
        <Moon
          class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
        <span class="sr-only">Toggle theme</span>
      </Button>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <div class="flex items-center md:order-2">
            <Avatar.Root>
              <Avatar.Image
                src={`https://cdn.discordapp.com/avatars/${data?.user?.id}/${data?.user?.avatar}.png?size=1024&format=webp&quality=lossless&width=0&height=256`}
                alt="@shadcn"
              />
              <Avatar.Fallback>CN</Avatar.Fallback>
            </Avatar.Root>
            <NavHamburger class1="w-full md:flex md:w-auto md:order-1" />
          </div>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content class="w-56">
          <DropdownMenu.Item on:click={signOut}>Sign out</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </GuildbarContent>
  </Guildbar>
</GuildbarContainer>

<slot />
