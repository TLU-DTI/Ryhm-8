<script lang="ts">
  import EndTurn from '$lib/States/EndTurnState.svelte';
  import EndTurnSvg from './EndTurnSVG.svelte';

  $effect(() => {
    setInterval(() => {
      EndTurn.EndTurnState.toggle();
    }, 1e3);
  });
<<<<<<< Updated upstream
=======

  function test():void{

    Objective.ObjectiveCost.move(MitigateCards.MitigatCardState.getRandomCard().attributes.cost);
    Objective.ObjectiveQuality.move(MitigateCards.MitigatCardState.getRandomCard().attributes.quality);
    Objective.ObjectiveScope.move(MitigateCards.MitigatCardState.getRandomCard().attributes.scope);
    Objective.ObjectiveTime.move(MitigateCards.MitigatCardState.getRandomCard().attributes.time);
    console.log(Timeline.TimelineState.barPos);
    if (Timeline.TimelineState.barPos < 18){
      Timeline.TimelineState.move(28);
    }
    else if (Timeline.TimelineState.barPos < 140){
      Timeline.TimelineState.move(28);
      stage = 1
    }
    else if (Timeline.TimelineState.barPos < 180){
      Timeline.TimelineState.move(28);
      stage = 2
    }
    else{
      stage = 3
    }
    //Timeline.TimelineState.move(27);
    console.log(Timeline.TimelineState.barPos);
  }

  //Esimene mull (initation) algab positsooonil 17



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
>>>>>>> Stashed changes
</script>

<button class="flex size-full items-center justify-center">
  <EndTurnSvg />
</button>

<style>
</style>
