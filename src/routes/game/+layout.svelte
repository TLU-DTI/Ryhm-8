<script lang="ts">
  import { onMount, type Snippet } from 'svelte';
  import '../../app.css';
  import { Engine } from '$lib/Engine';
  let { children }: { children: Snippet } = $props();

  function handleMouseMove(e: MouseEvent) {
    Engine.drag.onMouseMove(e);
  }

  function handleMouseUp(e: MouseEvent) {
    Engine.drag.onMouseUp(e);
  }

  onMount(() => {
    window.addEventListener('mousemove', handleMouseMove, false);
    window.addEventListener('mouseup', handleMouseUp, false);
  });
</script>

{@render children()}
