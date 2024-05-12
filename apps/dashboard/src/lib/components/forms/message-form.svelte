<script lang="ts">
  import Button from "../ui/button/button.svelte";
  import CalendarIcon from "lucide-svelte/icons/calendar";
  import {
    CalendarDate,
    DateFormatter,
    type DateValue,
    getLocalTimeZone,
    parseDate,
    today,
  } from "@internationalized/date";
  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import { cn } from "$lib/utils.js";
  import { Calendar } from "$lib/components/ui/calendar/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { Textarea } from "$lib/components/ui/textarea";
  import { messageSchema, type MessageSchema } from "$lib/schemas";
  import {
    type SuperValidated,
    type Infer,
    superForm,
  } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import MessagePreview from "./message-preview.svelte";
  import { buttonVariants } from "../ui/button";
  import DropdownMenuShortcut from "../ui/dropdown-menu/dropdown-menu-shortcut.svelte";
  import { onMount } from "svelte";
  import { Color, ColorInput } from "color-picker-svelte";

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

  const df = new DateFormatter("en-US", {
    dateStyle: "long",
  });
  let placeholder: DateValue = today(getLocalTimeZone());
  let values: (DateValue | undefined)[] = [];

  let colors = Array.from({ length: 10 }, () => new Color("#000000"));
  

  onMount(() => {
    colors = colors.map(() => {
      let color = "#" + Math.floor(Math.random() * 16777215).toString(16);
      return new Color(color);
    });
  });

  $: {
    values = $formData.embeds.map((embed) =>
      embed.timestamp ? parseDate(`${embed.timestamp}`) : undefined
    );
  }

  function updateColor(i: number, color: Color) {
    $formData.embeds[i].color = parseInt(color.toHexString().slice(1), 16);
  }

</script>

<div class="flex flex-row gap-5">
  <div>
    <form method="POST" use:enhance>
      <Form.Field {form} name="content">
        <Form.Control let:attrs>
          <Form.Label>Content</Form.Label>
          <Textarea
            {...attrs}
            placeholder="Enter messaeg content"
            bind:value={$formData.content}
          />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="channel">
        <Form.Control let:attrs>
          <Form.Label>Content</Form.Label>
          <Input
            {...attrs}
            placeholder="Enter messaeg content"
            bind:value={$formData.channel}
          />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="embeds"
        >{#each $formData.embeds as _, i}
          <Form.ElementField {form} name="embeds[{i}].title">
            <Form.Control let:attrs>
              <Form.Label>Title</Form.Label>
              <Input
                {...attrs}
                placeholder="Enter title"
                bind:value={$formData.embeds[i].title}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.ElementField>

          <Form.ElementField {form} name="embeds[{i}].description">
            <Form.Control let:attrs>
              <Form.Label>Description</Form.Label>
              <Textarea
                {...attrs}
                placeholder="Enter description"
                bind:value={$formData.embeds[i].description}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.ElementField>

          <Form.ElementField {form} name="embeds[{i}].url">
            <Form.Control let:attrs>
              <Form.Label>URL</Form.Label>
              <Input
                {...attrs}
                placeholder="Enter URL"
                bind:value={$formData.embeds[i].url}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.ElementField>

          <Form.ElementField {form} name="embeds[{i}].timestamp">
            <Form.Control let:attrs>
              <Form.Label>Timestamp</Form.Label>
              <Popover.Root>
                <Popover.Trigger
                  {...attrs}
                  class={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-[280px] justify-start pl-4 text-left font-normal",
                    !values[i] && "text-muted-foreground"
                  )}
                >
                  {values[i]
                    ? df.format(values[i]?.toDate(getLocalTimeZone()))
                    : "Pick a date"}
                  <CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
                </Popover.Trigger>
                <Popover.Content class="w-auto p-0" side="top">
                  <Calendar
                    value={values[i]}
                    bind:placeholder
                    minValue={new CalendarDate(1900, 1, 1)}
                    maxValue={today(getLocalTimeZone())}
                    calendarLabel="Date of birth"
                    initialFocus
                    onValueChange={(v) => {
                      if (v) {
                        $formData.embeds[i].timestamp = v.toString();
                      } else {
                        $formData.embeds[i].timestamp = "";
                      }
                    }}
                  />
                </Popover.Content>
              </Popover.Root>
            </Form.Control>
            <Form.FieldErrors />
          </Form.ElementField>

          <Form.ElementField {form} name="embeds[{i}].color">
            <Form.Control let:attrs>
              <Form.Label>Color</Form.Label>
              <ColorInput
                onInput={() => updateColor(i, colors[i])}
                bind:color={colors[i]}
                title={colors[i].toHexString()}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.ElementField>

          <Button on:click={addUrl}>Add Embed</Button>
        {/each}
        <Form.FieldErrors />
      </Form.Field>

      <Form.Button>Send Message</Form.Button>
    </form>
  </div>
  <div>
    <MessagePreview message={$formData} />
  </div>
</div>
