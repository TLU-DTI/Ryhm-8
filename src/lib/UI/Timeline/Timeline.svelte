<script lang="ts">
  import TimelineState from '$lib/BarMovement/TimelineState.svelte';
  import TimelineSvg from './TimelineSVG.svelte';

  $effect(() => {
    TimelineState.Timeline.movePositive(0);
  });
</script>

<div class="size-full">
  <TimelineSvg />
</div>
