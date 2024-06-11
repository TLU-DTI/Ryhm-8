<script lang="ts">
  import ObjectiveSvg from './ObjectiveSVG.svelte';
  import ObjectiveState from '$lib/BarMovement/ObjectiveState.svelte';

  $effect(() => {
    ObjectiveState.ObjectiveCost.movePositive(500);
    ObjectiveState.ObjectiveQuality.movePositive(500);
    ObjectiveState.ObjectiveScope.movePositive(500);
    ObjectiveState.ObjectiveTime.movePositive(500);
  });
</script>

<div class="size-full">
  <ObjectiveSvg />
</div>

<style>
</style>
