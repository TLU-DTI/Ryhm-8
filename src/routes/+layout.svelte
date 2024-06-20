<script lang="ts">
  import type { Snippet } from 'svelte';
  import '../app.css';
  let { children }: { children: Snippet } = $props();

  import '../app.css';
</script>

{@render children()}
