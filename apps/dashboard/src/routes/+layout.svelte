<script lang="ts">
    import type { LayoutData } from './$types';
    import "../app.css"
    import Sidebar from "$lib/components/nav/sidebar.svelte"
    import Navbar from '$lib/components/nav/navbar.svelte';
    export let data: LayoutData;
</script>

<Navbar>
    <slot name="navbar"></slot> 
</Navbar>

<slot></slot>