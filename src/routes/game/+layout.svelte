<script lang="ts">
  import { onMount, type Snippet } from 'svelte';
  import '../../app.css';
  import { Engine } from '$lib/Engine';
  let { children }: { children: Snippet } = $props();

  onMount(() => {
    window.addEventListener('mousemove', Engine.drag.onMouseMove, false);
    window.addEventListener('mouseup', Engine.drag.onMouseUp, false);
  });
</script>

{@render children()}
