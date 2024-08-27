<script lang="ts">
  import { Engine } from '$lib/Engine';
  import { onMount } from 'svelte';

  let top = $derived(Engine.drag.mousePos);

  let cardBound = $derived(Engine.drag.mitiCard?.node.getBoundingClientRect());
  let center = $derived({
    x: (cardBound?.x ?? 0) + (cardBound?.width ?? 0) / 2,
    y: (cardBound?.y ?? 0) + (cardBound?.height ?? 0) / 2
  });
  let visible = $derived(Engine.drag.dragging);

  let w = $state(200);
  let h = $state(200);

  onMount(() => {
    w = window.innerWidth;
    h = window.innerHeight;
  });
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={w}
  height={h}
  fill="none"
  class="pointer-events-none fixed z-50 select-none"
  visibility={visible ? 'visible' : 'hidden'}
>
  <path
    d="M{center.x - 30},{center.y + 50} 
      L{top.x},{top.y} 
      L{center.x + 30},{center.y + 50}"
    fill="white"
  />
</svg>
