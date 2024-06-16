<script lang="ts">
  import SaveGameState from '$lib/States/GameState.svelte';
  import Timeline from '$lib/States/TimelineState.svelte';
  import { onMount } from 'svelte';
  import TimelineSvg from './TimelineSVG.svelte';

  onMount(() => {
    Timeline.TimelineState.move(((SaveGameState.SaveGameState().loadGame()?.round) ?? 15) - 15);
    Timeline.TimelineState.next();
  });
</script>

<div class="size-full">
  <TimelineSvg />
</div>
