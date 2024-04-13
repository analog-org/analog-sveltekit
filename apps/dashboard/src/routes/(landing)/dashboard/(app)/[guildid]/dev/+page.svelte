<script lang="ts">
    import type { PageData } from './$types';
    import ChannelInput from '$lib/components/inputs/channel-input.svelte';
    
    export let data: PageData;
</script>

<center>
    Hello this is a test

    <ChannelInput channels={data?.channels} />
</center>

