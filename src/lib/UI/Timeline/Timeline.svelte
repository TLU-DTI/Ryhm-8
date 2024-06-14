<script lang="ts">
  import Timeline from '$lib/States/TimelineState.svelte';
  import TimelineSvg from './TimelineSVG.svelte';

  $effect(() => {
    Timeline.TimelineState.next();
  });
</script>

<div class="size-full">
  <TimelineSvg />
</div>
