<script lang="ts">
  import type { Snippet } from 'svelte';
  import '$src/app.css';
  let { children }: { children: Snippet } = $props();

  import '$src/app.css';
</script>

{@render children()}
