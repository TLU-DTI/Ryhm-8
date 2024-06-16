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

  function test():void{
    Objective.ObjectiveCost.move(MitigateCards.MitigatCardState.getRandomCard().attributes.cost * 1.0431000518798828);
    Objective.ObjectiveQuality.move(MitigateCards.MitigatCardState.getRandomCard().attributes.quality * 1.0431000518798828);
    Objective.ObjectiveScope.move(MitigateCards.MitigatCardState.getRandomCard().attributes.scope * 1.0431000518798828);
    Objective.ObjectiveTime.move(MitigateCards.MitigatCardState.getRandomCard().attributes.time * 1.0431000518798828);

    console.log(Objective.ObjectiveCost.barPos);
  }


  function save():void{
    SaveGameState.SaveGameState().saveGame({
      "objectives": {
        "scope": Objective.ObjectiveScope.barPos,
        "quality": Objective.ObjectiveQuality.barPos,
        "time": Objective.ObjectiveTime.barPos,
        "cost": Objective.ObjectiveCost.barPos
      },
      "mitigationCards": MitigateCards.MitigatCardState.cards,
      "riskCards": RiskCards.RiskCardState.riskCards,
      "manager": Manager.ManagerLogsState.logs,
      "logs" : RiskLogs.RiskLogsState.logs,
      "timelineStage": stage,
      "round": Timeline.TimelineState.barPos
    })
  }

  function unsave():void{
    SaveGameState.SaveGameState().clearSave()
  }
</script>

<button onclick={save}>Save</button>
<button class="flex size-full items-center justify-center" onclick={test}>
  <EndTurnSvg />
</button>
<button onclick={unsave}>Unsave</button>

<style>
</style>
