<script lang="ts">
  import ObjectiveSvg from './ObjectiveSVG.svelte';
  import ObjectiveState from '$lib/State/Bars/ObjectiveState.svelte';

  $effect(() => {
    ObjectiveState.ObjectiveCost.movePositive(200);
    // ObjectiveState.ObjectiveCost.moveNegative(10);
  });
</script>

<div class="size-full">
  <ObjectiveSvg />
</div>

<style>
</style>
