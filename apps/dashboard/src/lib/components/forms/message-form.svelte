<script lang="ts">
  import Button from "../ui/button/button.svelte";

  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { TextArea } from "$lib/components/ui/textarea";
  import { messageSchema, type MessageSchema } from "$lib/schemas";
  import {
    type SuperValidated,
    type Infer,
    superForm,
  } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";

  export let data: SuperValidated<Infer<MessageSchema>>;

  const form = superForm(data, {
    validators: zodClient(messageSchema),
    dataType: "json",
  });

  function removeUrlByIndex(index: number) {
    $formData.embeds = $formData.embeds?.filter((_, i) => i !== index);
  }

  function addUrl() {
    $formData.embeds = [...$formData.embeds, {}];
  }

  const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
  <Form.Field {form} name={`content`}>
    <Form.Control let:attrs>
      <Form.Label>Content</Form.Label>
      <Input
        {...attrs}
        placeholder="Enter messaeg content"
        bind:value={$formData.content}
      />
    </Form.Control>
  </Form.Field>

  {#each $formData.embeds as _, i}
    <Form.Field {form} name={`title`}>
      <Form.Control let:attrs>
        <Form.Label>Title</Form.Label>
        <Input
          {...attrs}
          placeholder="Enter title"
          bind:value={$formData.embeds[i].title}
        />
      </Form.Control>
    </Form.Field>

    <Form.Field {form} name={`description`}>
      <Form.Control let:attrs>
        <Form.Label>Description</Form.Label>
        <Input
          {...attrs}
          placeholder="Enter description"
          bind:value={$formData.embeds[i].description}
        />
      </Form.Control>
    </Form.Field>

    <Form.Field {form} name={`url`}>
      <Form.Control let:attrs>
        <Form.Label>URL</Form.Label>
        <Input
          {...attrs}
          placeholder="Enter URL"
          bind:value={$formData.embeds[i].url}
        />
      </Form.Control>
    </Form.Field>

    <Form.Field {form} name={`timestamp`}>
      <Form.Control let:attrs>
        <Form.Label>Timestamp</Form.Label>
        <Input
          {...attrs}
          placeholder="Enter timestamp"
          bind:value={$formData.embeds[i].timestamp}
        />
      </Form.Control>
    </Form.Field>

    <Form.Field {form} name={`color`}>
      <Form.Control let:attrs>
        <Form.Label>Color</Form.Label>
        <Input
          {...attrs}
          placeholder="Enter color"
          bind:value={$formData.embeds[i].color}
        />
      </Form.Control>
    </Form.Field>

    <Button on:click={addUrl}>Add Embed</Button>
  {/each}

  <Form.Button>Send Message</Form.Button>
</form>
