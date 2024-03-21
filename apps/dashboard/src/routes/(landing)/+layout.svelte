<script lang="ts">
    import type { LayoutData } from './$types';
    import Navbar from '$lib/components/nav/navbar.svelte';
    export let data: LayoutData;
</script>

<Navbar />

<slot></slot>