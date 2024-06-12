<script lang="ts">
  import Timeline from '$lib/States/TimelineState.svelte';
  import TimelineSvg from './TimelineSVG.svelte';

  $effect(() => {
    Timeline.TimelineState.move(0);
  });
</script>

<div class="size-full">
  <TimelineSvg />
</div>
