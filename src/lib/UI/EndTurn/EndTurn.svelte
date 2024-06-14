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

    Objective.ObjectiveCost.move(MitigateCards.MitigatCardState.getRandomCard().attributes.cost);
    Objective.ObjectiveQuality.move(MitigateCards.MitigatCardState.getRandomCard().attributes.quality);
    Objective.ObjectiveScope.move(MitigateCards.MitigatCardState.getRandomCard().attributes.scope);
    Objective.ObjectiveTime.move(MitigateCards.MitigatCardState.getRandomCard().attributes.time);
    console.log(Timeline.TimelineState.barPos);
    /*if (Timeline.TimelineState.barPos < 100){
      Timeline.TimelineState.move(15);
    }
    else if (Timeline.TimelineState.barPos < 140){
      Timeline.TimelineState.move(22);
      stage = 1
    }
    else if (Timeline.TimelineState.barPos < 180){
      Timeline.TimelineState.move(22);
      stage = 2
    }
    else{
      stage = 3
    }*/
    Timeline.TimelineState.move(15);
    console.log(Timeline.TimelineState.barPos);
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
</script>

<button onclick={save} >Text</button>
<button class="flex size-full items-center justify-center" onclick={test}>
  <EndTurnSvg />
</button>

<style>
</style>
