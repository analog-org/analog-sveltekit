<script lang="ts">
    import type { PageData } from './$types';
    import ChannelInput from '$lib/components/inputs/channel-input.svelte';
	import ColorPicker from 'svelte-awesome-color-picker';
    let hex: string
    
    export let data: PageData;
</script>

<center>
    Hello this is a test

    <ChannelInput channels={data?.channels} />
    <ColorPicker bind:hex  />
</center>

