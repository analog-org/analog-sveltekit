<script lang="ts">
    import type { LayoutData } from './$types';
    import "../app.css"
    import "../components/sidebar.svelte"
    export let data: LayoutData;
</script>

<sidebar />
<p>fortnite</p>
<slot></slot>