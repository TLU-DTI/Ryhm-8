<script lang="ts">
  import TimelineState from '$lib/BarMovement/TimelineState.svelte';
  import TimelineSvg from './TimelineSVG.svelte';

  $effect(() => {
    TimelineState.Timeline.moveNegative(1);
  });
</script>

<div class="size-full">
  <TimelineSvg />
</div>
