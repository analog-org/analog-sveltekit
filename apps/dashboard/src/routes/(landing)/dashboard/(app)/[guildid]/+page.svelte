<script lang="ts">
  import type { PageData } from "./$types";
  import * as Card from "$lib/components/ui/card";

  export let data: PageData;
  const guild = data?.guild;
</script>

<div class="flex justify-center items-center min-h-screen">
  <Card.Root>
    <Card.Header>
      <img
        src={`https://cdn.discordapp.com/icons/${guild?.id}/${guild?.icon}.png`}
        width="96"
        height="96"
        class="rounded-full"
        alt="Guild Icon"
      />
    </Card.Header>
    <Card.Content>
      <p>Guild Name: {guild?.name}</p>
      <p>Guild ID: {guild?.id}</p>
    </Card.Content>
    <Card.Footer>
      <p>{guild?.features}</p>
    </Card.Footer>
  </Card.Root>
</div>
