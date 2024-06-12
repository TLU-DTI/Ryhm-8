<script lang="ts">
  import ObjectiveSvg from './ObjectiveSVG.svelte';
  import ObjectiveState from '$lib/BarMovement/ObjectiveState.svelte';

  $effect(() => {
    ObjectiveState.ObjectiveCost.move(-500);
    ObjectiveState.ObjectiveQuality.move(-500);
    ObjectiveState.ObjectiveScope.move(-500);
    ObjectiveState.ObjectiveTime.move(-500);
  });
</script>

<div class="size-full">
  <ObjectiveSvg />
</div>

<style>
</style>
