<script lang="ts">
    import type { LayoutData } from './$types';
    import "../app.css"
    import Sidebar from "$lib/components/nav/sidebar.svelte"
    import Navbar from '$lib/components/nav/navbar.svelte';
    export let data: LayoutData;
    import { type APIUser } from 'discord-api-types/v10'
    import { page } from "$app/stores"
</script>

<Navbar bot={$page.data.bot}>
    <slot name="navbar"></slot> 
</Navbar>

<slot></slot>