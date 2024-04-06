<script lang="ts">
  import type { LayoutData } from "./$types";
  export let data: LayoutData;

  import { onMount } from "svelte";
  import Guildbar from "$lib/components/guildbar/guildbar.svelte";
  import GuildbarContainer from "$lib/components/guildbar/guildbar-container.svelte";
  import GuildbarIcon from "$lib/components/guildbar/guildbar-icon.svelte";
  import GuildbarContent from "$lib/components/guildbar/guildbar-content.svelte";

  import { Badge } from "$lib/components/ui/badge/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Sheet from "$lib/components/ui/sheet/index.js";
  import * as Avatar from "$lib/components/ui/avatar";
  import * as Accordion from "$lib/components/ui/accordion";

  import Sidebar from "$lib/components/sidebar/sidebar.svelte";
  import SidebarItem from "$lib/components/sidebar/sidebar-item.svelte";
  import SidebarHeader from "$lib/components/sidebar/sidebar-header.svelte";

  import { NavHamburger } from "flowbite-svelte";

  import { signOut } from "@auth/sveltekit/client";

  import { Sun, Moon } from "lucide-svelte";
  import { toggleMode } from "mode-watcher";
  import Menu from "lucide-svelte/icons/menu";

  import { config } from "config-custom";

  let webConfig: any;
  onMount(async () => {
    webConfig = config.website;
  });

  import { page } from "$app/stores";
  import { onNavigate } from "$app/navigation";

  const guild = data.guild;

  let pathname: string

  $: page.subscribe((value) => {
    pathname = value.url.pathname;
  });
</script>

<div
  class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
>
  <div class="hidden border-r bg-muted/40 md:block">
    <div class="flex h-full max-h-screen flex-col gap-2 sticky top-0">
      <SidebarHeader bot={data.bot} />
      <div class="flex-1">
        <Sidebar>

          {#if webConfig}
            {#each webConfig.category[0].pages as page}
              {#key pathname}
                {#if `${pathname}` == `/dashboard/${guild.id}${page.path}`}
                  <SidebarItem
                    href={`/dashboard/${guild.id}${page.path}`}
                    icon={page.icon}
                    label={page.name}
                    active={true}
                  />
                {:else}
                  <SidebarItem
                    href={`/dashboard/${guild.id}${page.path}`}
                    icon={page.icon}
                    label={page.name}
                    active={false}
                    on:click={() => console.log("clicked")}
                  />{/if}
              {/key}
            {/each}
          {/if}
        </Sidebar>
      </div>
    </div>
  </div>
  <div class="flex flex-col">
    <GuildbarContainer>
      <Guildbar>
        <Sheet.Root>
          <Sheet.Trigger asChild let:builder>
            <Button
              variant="outline"
              size="icon"
              class="shrink-0 md:hidden"
              builders={[builder]}
            >
              <Menu class="h-5 w-5" />
              <span class="sr-only">Toggle navigation menu</span>
            </Button>
          </Sheet.Trigger>
          <Sheet.Content side="left" class="flex flex-col">
            <Sidebar>
              {#each webConfig.category[0].pages as page}
                {#if `${pathname}` == `/dashboard/${guild.id}${page.path}`}
                  <SidebarItem
                    href={`/dashboard/${guild.id}${page.path}`}
                    icon={page.icon}
                    label={page.name}
                    active={true}
                  />
                {:else}
                  <SidebarItem
                    href={`/dashboard/${guild.id}${page.path}`}
                    icon={page.icon}
                    label={page.name}
                    active={false}
                  />{/if}
              {/each}
            </Sidebar>
          </Sheet.Content>
        </Sheet.Root>
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
    <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <slot />
    </main>
  </div>
</div>
