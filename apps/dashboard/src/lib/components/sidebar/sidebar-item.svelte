<script lang="ts">
  export let href: string;
  export let icon: string;
  export let label: string;
</script>

<a
  {href}
  class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
>
  <div
    class="flex justify-center items-center flex-grow-0 flex-shrink-0 w-6 h-6 relative overflow-hidden gap-2.5 px-2 py-[7px] rounded-[5px] bg-zinc-600 border-2 border-zinc-500"
    style="box-shadow: 0px 0px 7px 0 rgba(113,113,122,0.7);"
  >
    <svg class="h-4 w-4 flex-grow-0 flex-shrink-0">
      <image
        href={`https://unpkg.com/lucide-static@latest/icons/${icon}.svg`}
        class="h-4 w-4 brightness-0 invert"
      />
    </svg>
  </div>
  {label}
</a>
