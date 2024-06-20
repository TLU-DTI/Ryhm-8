<script lang="ts">
  import { getContext } from 'svelte';
  import ObjectiveSvg from './ObjectiveSVG.svelte';
  import type { IObjectiveState } from '$lib/States/ObjectiveState.svelte';

  const Objective = getContext<IObjectiveState>('Objectives');

  $effect(() => {
    Objective.Cost.move(0);
    Objective.Quality.move(0);
    Objective.Scope.move(0);
    Objective.Time.move(0);

    // save function incomplete
    // Objective.ObjectiveCost.move((Load.SaveGameState().loadGame()?.objectives.cost) ?? 0);
    // Objective.ObjectiveQuality.move((Load.SaveGameState().loadGame()?.objectives.quality) ?? 0);
    // Objective.ObjectiveScope.move((Load.SaveGameState().loadGame()?.objectives.scope) ?? 0);
    // Objective.ObjectiveTime.move((Load.SaveGameState().loadGame()?.objectives.time) ?? 0);
  });
</script>

<div class="size-full">
  <ObjectiveSvg />
</div>

<style>
</style>
