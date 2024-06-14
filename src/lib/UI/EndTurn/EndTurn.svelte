<script lang="ts">
  import Objective  from '$lib/States/ObjectiveState.svelte';
  import EndTurn from '$lib/States/EndTurnState.svelte';
  import EndTurnSvg from './EndTurnSVG.svelte';
  import Timeline, { TimelineState } from '$lib/States/TimelineState.svelte';
  import SaveGameState from '$lib/States/GameState.svelte';
  import  RiskLogs, { type IRiskLog }  from '$lib/States/RiskLogState.svelte';
  import  RiskCards  from '$lib/Cards/RiskCards.svelte';
  import  MitigateCards  from '$lib/Cards/MitigationCards.svelte';
  import Manager from '$lib/States/ManagerLogState.svelte';

  let stage = 0;

  
  $effect(() => {
    setInterval(() => {
      EndTurn.EndTurnState.toggle();
    }, 1e3);

  });
</script>

<button onclick={save}>Save</button>
<button class="flex size-full items-center justify-center" onclick={test}>
  <EndTurnSvg />
</button>
<button onclick={unsave}>Unsave</button>

<style>
</style>
