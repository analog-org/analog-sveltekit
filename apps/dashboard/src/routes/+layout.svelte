<script lang="ts">
    import type { LayoutData } from './$types';
    import "../app.css"
    import Sidebar from "$lib/components/sidebar.svelte"
    export let data: LayoutData;
</script>

<Sidebar />

<slot></slot>