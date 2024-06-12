<script lang="ts">
  import ObjectiveSvg from './ObjectiveSVG.svelte';
  import Objective from '$lib/States/ObjectiveState.svelte';

  $effect(() => {
    Objective.ObjectiveCost.move(0);
    Objective.ObjectiveQuality.move(0);
    Objective.ObjectiveScope.move(0);
    Objective.ObjectiveTime.move(0);
  });
</script>

<div class="size-full">
  <ObjectiveSvg />
</div>

<style>
</style>
