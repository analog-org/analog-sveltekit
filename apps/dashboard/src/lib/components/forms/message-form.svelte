<script lang="ts">
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
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
  });
 
  const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
  <Form.Field {form} name={`content`} >
    <Form.Control let:attrs>
      <Form.Label>Username</Form.Label>
      <Input {...attrs} bind:value={$formData.content} />
    </Form.Control>
  </Form.Field>
 
  <Form.Button>Send Message</Form.Button>

</form>