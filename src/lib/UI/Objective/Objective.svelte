<script lang="ts">
  import ObjectiveSvg from './ObjectiveSVG.svelte';
  import Objective from '$lib/States/ObjectiveState.svelte';

  $effect(() => {
    Objective.ObjectiveCost.move(-500);
    Objective.ObjectiveQuality.move(-500);
    Objective.ObjectiveScope.move(-500);
    Objective.ObjectiveTime.move(-500);
  });
</script>

<div class="size-full">
  <ObjectiveSvg />
</div>

<style>
</style>
