<script lang="ts">
  import Objective from '$lib/States/ObjectiveState.svelte';
  import EndTurn from '$lib/States/EndTurnState.svelte';
  import EndTurnSvg from './EndTurnSVG.svelte';
  import Timeline, { TimelineState } from '$lib/States/TimelineState.svelte';
  import SaveGameState from '$lib/States/GameState.svelte';
  import RiskLogs, { type IRiskLog } from '$lib/States/RiskLogState.svelte';
  import RiskCards from '$lib/Cards/RiskCards.svelte';
  import MitigateCards from '$lib/Cards/MitigationCards.svelte';
  import Manager, { ManagerLogsState } from '$lib/States/ManagerLogState.svelte';
  import GameOverModal from './GameOverModal.svelte';
  import GameWonModal from './GameWonModal.svelte';
  import { onMount } from 'svelte';
  import GameStateSvelte from '$lib/States/GameState.svelte';

  let gameOver = $state(false);
  let gameWon = $state(false);

  onMount(() => {
    Manager.ManagerLogsState.addLog({
      title: 'Welcome to the game',
      name: 'Manager',
      message:
        "Welcome to Mitigate Inc. I'm your boss and i will let you know how you will do managing the issues that will come your way."
    });
    Timeline.TimelineState.next();
    startOfTurn();
  });

  $effect(() => {});

  /*function test():void{
    Objective.ObjectiveCost.move(MitigateCards.MitigatCardState.getRandomCard().attributes.cost * 1.0431000518798828);
    Objective.ObjectiveQuality.move(MitigateCards.MitigatCardState.getRandomCard().attributes.quality * 1.0431000518798828);
    Objective.ObjectiveScope.move(MitigateCards.MitigatCardState.getRandomCard().attributes.scope * 1.0431000518798828);
    Objective.ObjectiveTime.move(MitigateCards.MitigatCardState.getRandomCard().attributes.time * 1.0431000518798828);

    console.log(Objective.ObjectiveCost.barPos);
  }*/

  function startOfTurn(): void {
    if (gameOver || gameWon) return;
    RiskCards.RiskCardState.createHand(riskCardAmount(Timeline.TimelineState.current.stage));
    MitigateCards.MitigatCardState.createMitigateHand(3);
    //console.log(RiskCards.RiskCardState.riskHand);
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
        throw new Error('Input must be 0, 1, 2, or 3');
    }
  }

  function endTurn():void{
    
    const button = document.getElementById("EndTurn_button") as HTMLButtonElement;

    button.disabled = true;
    //EndTurn.EndTurnState.toggle();


    setTimeout(() => {
      button.disabled = false;
      //EndTurn.EndTurnState.toggle();
    }, 1000);

    if (gameOver) return;

    let costTotal = 0;
    let qualityTotal = 0;
    let scopeTotal = 0;
    let timeTotal = 0;

    RiskCards.RiskCardState.riskHand.forEach((element) => {
      costTotal += element.attributes.cost;
      qualityTotal += element.attributes.quality;
      scopeTotal += element.attributes.scope;
      timeTotal += element.attributes.time;
    });

    Objective.ObjectiveCost.move(-costTotal);
    Objective.ObjectiveQuality.move(qualityTotal);
    Objective.ObjectiveScope.move(scopeTotal);
    Objective.ObjectiveTime.move(-timeTotal);

    if (
      Objective.ObjectiveCost.barPos < 33 ||
      Objective.ObjectiveQuality.barPos < 33 ||
      Objective.ObjectiveScope.barPos < 33 ||
      Objective.ObjectiveTime.barPos < 33
    ) {
      gameOver = true;
      return;
    }

    if (Timeline.TimelineState.current.stage == 4) {
      console.log(Objective.ObjectiveCost.barPos + ' endturn.svelte');
      GameStateSvelte.SaveGameState().updateStats(
        Objective.ObjectiveCost.barPos,
        Objective.ObjectiveQuality.barPos,
        Objective.ObjectiveScope.barPos,
        Objective.ObjectiveTime.barPos
      );
      gameWon = true;
    }

    if (RiskCards.RiskCardState.riskHand.length > 0) {
      let managerMessage = 'You decided to avoid the following risks: ';
      RiskCards.RiskCardState.riskHand.forEach((element, index) => {
        RiskLogs.RiskLogsState.addLog({
          attributes: {
            cost: 0,
            quality: 0,
            scope: 0,
            time: 0
          },
          category: "Ignored",
          title: element.title,
          respond: 'Ignored'
        });
        managerMessage += element.title;
        if (index < RiskCards.RiskCardState.riskHand.length - 1) {
          managerMessage += ', ';
        }
      });

      Manager.ManagerLogsState.addLog({
        title: 'You decided to avoid some risks',
        name: 'Manager',
        message: managerMessage + '. I hope you know what you are doing!'
      });
    }

    Timeline.TimelineState.next();
    startOfTurn();
  }

  function save(): void {
    SaveGameState.SaveGameState().saveGame({
      objectives: {
        scope: Objective.ObjectiveScope.barPos,
        quality: Objective.ObjectiveQuality.barPos,
        time: Objective.ObjectiveTime.barPos,
        cost: Objective.ObjectiveCost.barPos
      },
      mitigationCards: MitigateCards.MitigatCardState.cards,
      riskCards: RiskCards.RiskCardState.riskCards,
      manager: Manager.ManagerLogsState.logs,
      logs: RiskLogs.RiskLogsState.logs,
      timelineStage: Timeline.TimelineState.current.stage,
      round: Timeline.TimelineState.current.stage,
      position: Timeline.TimelineState.barPos
    });
  }

  function unsave(): void {
    SaveGameState.SaveGameState().clearSave();
  }
</script>

<GameOverModal show={gameOver} />
<GameWonModal show={gameWon} />


<button id="EndTurn_button" class="flex size-full items-center justify-center" onclick={endTurn}>
  <EndTurnSvg />
</button>

<style>
</style>
