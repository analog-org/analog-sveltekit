<script lang="ts">
  export let href: string;
  export let icon: string;
  export let label: string;
</script>

<a
  href={href}
  class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
>
<svg class="h-6 w-6">
  <image href={`https://unpkg.com/lucide-static@latest/icons/${icon}.svg`} class="h-6 w-6 brightness-0 invert"/>
</svg>
  
  {label}
</a>