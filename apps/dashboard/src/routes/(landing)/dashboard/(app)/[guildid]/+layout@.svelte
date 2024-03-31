<script lang="ts">
  import type { LayoutData } from "./$types";

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

  import { NavHamburger } from "flowbite-svelte";

  import { signOut } from "@auth/sveltekit/client";

  import { Sun, Moon } from "lucide-svelte";
  import { toggleMode } from "mode-watcher";
  import CircleUser from "lucide-svelte/icons/circle-user";
  import LineChart from "lucide-svelte/icons/line-chart";
  import Package from "lucide-svelte/icons/package";
  import Home from "lucide-svelte/icons/home";
  import ShoppingCart from "lucide-svelte/icons/shopping-cart";
  import Bell from "lucide-svelte/icons/bell";
  import Menu from "lucide-svelte/icons/menu";
  import Package2 from "lucide-svelte/icons/package-2";
  import Search from "lucide-svelte/icons/search";
  import Users from "lucide-svelte/icons/users";

  export let data: LayoutData;
</script>

<div
  class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
>
  <div class="hidden border-r bg-muted/40 md:block">
    <div class="flex h-full max-h-screen flex-col gap-2">
      <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <a href="/" class="flex items-center gap-2 font-semibold">
          <img class="h-6 w-6 rounded-full" src={`https://cdn.discordapp.com/avatars/${data?.bot?.id}/${data?.bot?.avatar}.png?size=1024&format=webp&quality=lossless&width=0&height=256`} alt={data?.bot?.username}/>
          <span class="">{data.bot.username}</span>
        </a>
      </div>
      <div class="flex-1">
        <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
          <a
            href="##"
            class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <Home class="h-4 w-4" />
            Dashboard
          </a>
          <a
            href="##"
            class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <ShoppingCart class="h-4 w-4" />
            Orders
            <Badge
              class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
            >
              6
            </Badge>
          </a>
          <a
            href="##"
            class="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
          >
            <Package class="h-4 w-4" />
            Products
          </a>
          <a
            href="##"
            class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <Users class="h-4 w-4" />
            Customers
          </a>
          <a
            href="##"
            class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <LineChart class="h-4 w-4" />
            Analytics
          </a>
        </nav>
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
            <nav class="grid gap-2 text-lg font-medium">
              <a
                href="##"
                class="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 class="h-6 w-6" />
                <span class="sr-only">Acme Inc</span>
              </a>
              <a
                href="##"
                class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <Home class="h-5 w-5" />
                Dashboard
              </a>
              <a
                href="##"
                class="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
              >
                <ShoppingCart class="h-5 w-5" />
                Orders
                <Badge
                  class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                >
                  6
                </Badge>
              </a>
              <a
                href="##"
                class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <Package class="h-5 w-5" />
                Products
              </a>
              <a
                href="##"
                class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <Users class="h-5 w-5" />
                Customers
              </a>
              <a
                href="##"
                class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <LineChart class="h-5 w-5" />
                Analytics
              </a>
            </nav>
            
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
