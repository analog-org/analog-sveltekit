<script lang="ts">
    import type { LayoutData } from './$types';
    import "../app.css"
    import Sidebar from "$lib/components/nav/sidebar.svelte"
    import Navbar from '$lib/components/nav/navbar.svelte';
    export let data: LayoutData;
    import { type APIUser } from 'discord-api-types/v10'
    import { page } from "$app/stores"
    import { ModeWatcher } from "mode-watcher";
    const bot = $page.data.bot as APIUser;
</script>
<svelte:head>
    <link rel="icon" type="image/png" href={`https://cdn.discordapp.com/avatars/${bot.id}/${bot.avatar}.png?size=1024&format=webp&quality=lossless&width=0&height=256`}/>
</svelte:head>

<ModeWatcher />

<slot></slot>