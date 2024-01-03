<script lang="ts">
  import {
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
    NavHamburger,
    Dropdown,
    DropdownItem,
    DropdownHeader,
    DropdownDivider,
  } from "flowbite-svelte";
  import { type APIUser } from "discord-api-types/v10";
  /* export let user: APIUser; */
  export let bot: APIUser;
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { Button } from "../ui/button";
  import * as Avatar from "$lib/components/ui/avatar";
  import { page } from "$app/stores";
  import { Sun, Moon } from "lucide-svelte";

  import { toggleMode } from "mode-watcher";
  import { signOut, signIn } from "@auth/sveltekit/client";
</script>

<Navbar>
  <NavBrand href="/">
    <img
      src={`https://cdn.discordapp.com/avatars/${bot.id}/${bot.avatar}.png?size=1024&format=webp&quality=lossless&width=0&height=256`}
      class="me-3 h-6 sm:h-14 rounded-full"
      alt={`${bot.username} Logo`}
    />
    <span
      class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
      >{bot.username}</span
    >
  </NavBrand>

  <NavUl>
    <NavLi href="/" active={true}>Home</NavLi>
    <NavLi href="/dashboard" active={true}>Dashboard</NavLi>
  </NavUl>
  <Button on:click={toggleMode} variant="outline" size="icon">
    <Sun
      class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
    />
    <Moon
      class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
    />
    <span class="sr-only">Toggle theme</span>
  </Button>

  {#if $page.data.session}
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar.Root>
          <Avatar.Image
            src={`https://cdn.discordapp.com/avatars/${$page.data.user.id}/${$page.data.user.avatar}.png?size=1024&format=webp&quality=lossless&width=0&height=256`}
            alt="@shadcn"
          />
          <Avatar.Fallback>CN</Avatar.Fallback>
        </Avatar.Root>
        <NavHamburger class1="w-full md:flex md:w-auto md:order-1" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content class="w-56">
        <DropdownMenu.Item on:click={signOut}>Sign out</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  {:else}
    <Button on:click={signIn}>Sign in</Button>
  {/if}
</Navbar>
