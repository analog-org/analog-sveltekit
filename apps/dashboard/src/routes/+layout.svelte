<script lang="ts">
    import type { LayoutData } from './$types';
    import "../app.css"
    import "$lib/components/sidebar.svelte"
    export let data: LayoutData;
</script>

<sidebar />
<p>fortnite</p>
<slot></slot>