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
  import { onMount } from 'svelte';


  onMount(() =>{
    Timeline.TimelineState.next();
    RiskCards.RiskCardState.createHand(riskCardAmount(Timeline.TimelineState.current.stage));
    //startOfTurn();
  });

  
  $effect(() => {
    
    setInterval(() => {
      EndTurn.EndTurnState.toggle();
    }, 1e3);

  });

  /*function test():void{
    Objective.ObjectiveCost.move(MitigateCards.MitigatCardState.getRandomCard().attributes.cost * 1.0431000518798828);
    Objective.ObjectiveQuality.move(MitigateCards.MitigatCardState.getRandomCard().attributes.quality * 1.0431000518798828);
    Objective.ObjectiveScope.move(MitigateCards.MitigatCardState.getRandomCard().attributes.scope * 1.0431000518798828);
    Objective.ObjectiveTime.move(MitigateCards.MitigatCardState.getRandomCard().attributes.time * 1.0431000518798828);

    console.log(Objective.ObjectiveCost.barPos);
  }*/

  function startOfTurn(): void{
    RiskCards.RiskCardState.createHand(riskCardAmount(Timeline.TimelineState.current.stage));
    console.log(RiskCards.RiskCardState.riskHand);
  }

  function riskCardAmount(input: number): number {
    switch (input) {
      case 0:
        return 0;
      case 1:
          return 1;
      case 2:
          return Math.random() < 0.5 ? 1 : 2;
      case 3:
          return Math.random() < 0.5 ? 2 : 3;
      case 4:
          return Math.random() < 0.5 ? 4 : 5;
      default:
          throw new Error("Input must be 0, 1, 2, or 3");
    }
  }

  function endTurn():void{
    let costTotal = 0;
    let qualityTotal = 0;
    let scopeTotal = 0;
    let timeTotal = 0;


    RiskCards.RiskCardState.riskHand.forEach(element => {
      costTotal += element.attributes.cost
      qualityTotal += element.attributes.quality;
      scopeTotal += element.attributes.scope;
      timeTotal += element.attributes.time;
    });

    Objective.ObjectiveCost.move(costTotal * 1.04310005188);
    Objective.ObjectiveQuality.move(qualityTotal * 1.04310005188);
    Objective.ObjectiveScope.move(scopeTotal * 1.04310005188);
    Objective.ObjectiveTime.move(timeTotal * 1.04310005188);

    if (
      Objective.ObjectiveCost.barPos < 33 ||
      Objective.ObjectiveQuality.barPos < 33 ||
      Objective.ObjectiveScope.barPos < 33 ||
      Objective.ObjectiveTime.barPos < 33
    ){
      console.log("Mäng läbi")
    }

    Timeline.TimelineState.next();
    startOfTurn();
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
      "timelineStage": Timeline.TimelineState.current.stage,
      "round": Timeline.TimelineState.current.stage,
      "position": Timeline.TimelineState.barPos
    })
  }

  function unsave():void{
    SaveGameState.SaveGameState().clearSave()
  }
</script>

<button onclick={save}>Save</button>
<button class="flex size-full items-center justify-center" onclick={endTurn}>
  <EndTurnSvg />
</button>
<button onclick={unsave}>Unsave</button>

<style>
</style>
