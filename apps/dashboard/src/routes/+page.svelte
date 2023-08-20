<script>
  import { signIn, signOut } from "@auth/sveltekit/client"
  import { page } from "$app/stores"
</script>

<h1 >Welcome to Analog-Svelte</h1>
<p>
  {#if $page.data.session}
    <p>You're signed in</p>
    <button on:click={signOut}>Sign out</button>
  {:else}
    <p>You need to sign in</p>
    <button on:click={signIn}>Sign in</button>
  {/if}
</p>
