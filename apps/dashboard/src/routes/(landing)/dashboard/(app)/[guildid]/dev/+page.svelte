<script lang="ts">
    import type { PageData } from './$types';
    import ChannelInput from '$lib/components/inputs/channel-input.svelte';
	import ColorPicker from 'svelte-awesome-color-picker';
    import { writable } from 'svelte/store';
  import type { APIChannel } from 'discord-api-types/v10';
  import { onMount } from 'svelte';
    let hex: string
    let selectedChannel = writable<APIChannel | undefined>(undefined);


    
    export let data: PageData;
</script>

<center>
    Hello this is a test

    <ChannelInput bind:selectedChannel channels={data?.channels} />
    <p>Selected channel: {$selectedChannel ? $selectedChannel.name : 'None'}</p>

    <ColorPicker bind:hex  /> <p style={`color: ${hex}`}>selected color: {hex}</p>
</center>

