<script lang="ts">
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Avatar, Dropdown, DropdownItem, DropdownHeader, DropdownDivider } from 'flowbite-svelte';
  import { type APIUser } from 'discord-api-types/v10'
  /* export let user: APIUser; */
  export let bot: APIUser;
  
</script>

<Navbar>
  <NavBrand href="/">
    <img src={`https://cdn.discordapp.com/avatars/${bot.id}/${bot.avatar}.png?size=1024&format=webp&quality=lossless&width=0&height=256`} class="me-3 h-6 sm:h-9" alt="Flowbite Logo" />
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">{bot.username}</span>
  </NavBrand>
  <div class="flex items-center md:order-2">
    <Avatar id="avatar-menu" src="https://cdn.discordapp.com/avatars/274973338676494347/00dcf84af54a0a58d2394b4054e0f7f5.png?size=1024&format=webp&quality=lossless&width=0&height=256" />
    <NavHamburger class1="w-full md:flex md:w-auto md:order-1" />
  </div>
  <Dropdown placement="bottom" triggeredBy="#avatar-menu">
    <DropdownHeader>
      <span class="block text-sm">Bonnie Green</span>
      <span class="block truncate text-sm font-medium">name@flowbite.com</span>
    </DropdownHeader>
    <DropdownItem>Dashboard</DropdownItem>
    <DropdownItem>Settings</DropdownItem>
    <DropdownItem>Earnings</DropdownItem>
    <DropdownDivider />
    <DropdownItem>Sign out</DropdownItem>
  </Dropdown>
  <NavUl>
    <NavLi href="/" active={true}>Home</NavLi>
    <NavLi href="/about">About</NavLi>
    <NavLi href="/docs/components/navbar">Navbar</NavLi>
    <NavLi href="/pricing">Pricing</NavLi>
    <NavLi href="/contact">Contact</NavLi>
  </NavUl>
</Navbar>