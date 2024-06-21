<script lang="ts">
  import { type IObjectiveState } from '$lib/States/ObjectiveState.svelte';
  import EndTurnSvg from './EndTurnSVG.svelte';
  import { type ITimeline } from '$lib/States/TimelineState.svelte';
  // import SaveGameState from '$lib/States/GameState.svelte';
  import { type IRiskLogs } from '$lib/States/RiskLogState.svelte';
  import { type IRiskCards } from '$lib/Cards/RiskCards.svelte';
  import { type IMitigationCards } from '$lib/Cards/MitigationCards.svelte';
  import GameOverModal from './GameOverModal.svelte';
  import GameWonModal from './GameWonModal.svelte';
  import { type INotification } from '$lib/States/NotificationState.svelte';
  import { getContext, onMount } from 'svelte';
  import type { IEndTurn } from '$lib/States/EndTurnState.svelte';

  const Notifiction = getContext<INotification>('Notification');
  const Timeline = getContext<ITimeline>('Timeline');
  const RiskCards = getContext<IRiskCards>('RiskCards');
  const MitigateCards = getContext<IMitigationCards>('MitigateCards');
  const EndTurn = getContext<IEndTurn>('EndTurn');
  const Objective = getContext<IObjectiveState>('Objectives');
  const RiskLogs = getContext<IRiskLogs>('RiskLogs');

  let gameOver = $state(false);
  let gameWon = $state(false);

  onMount(() => {
    Notifiction.setNotification({
      name: 'Manager',
      message:
        "Welcome to Mitigate Inc. I'm your boss and i will let you know how you will do managing the issues that will come your way."
    });
    Timeline.next();
    startOfTurn();
  });

  function startOfTurn(): void {
    if (gameOver || gameWon) return;
    RiskCards.createHand(riskCardAmount(Timeline.current.stage));
    MitigateCards.createMitigateHand(3);
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

  function endTurn(): void {
    EndTurn.toggle();

    setTimeout(() => {
      EndTurn.toggle();
    }, 1000);

    if (gameOver) return;

    let costTotal = 0;
    let qualityTotal = 0;
    let scopeTotal = 0;
    let timeTotal = 0;

    RiskCards.riskHand.forEach((element) => {
      costTotal += element.attributes.cost;
      qualityTotal += element.attributes.quality;
      scopeTotal += element.attributes.scope;
      timeTotal += element.attributes.time;
    });

    Objective.Cost.move(-costTotal);
    Objective.Quality.move(qualityTotal);
    Objective.Scope.move(scopeTotal);
    Objective.Time.move(-timeTotal);

    if (
      Objective.Cost.barPos < 33 ||
      Objective.Quality.barPos < 33 ||
      Objective.Scope.barPos < 33 ||
      Objective.Time.barPos < 33
    ) {
      gameOver = true;
      return;
    }

    if (Timeline.current.stage == 4) {
      // GameStateSvelte.SaveGameState().updateStats(
      //   Objective.Cost.barPos,
      //   Objective.Quality.barPos,
      //   Objective.Scope.barPos,
      //   Objective.Time.barPos
      // );
      gameWon = true;
    }

    if (RiskCards.riskHand.length > 0) {
      let managerMessage = 'You decided to avoid the following risks: ';
      RiskCards.riskHand.forEach((element, index) => {
        RiskLogs.addLog({
          attributes: {
            cost: 0,
            quality: 0,
            scope: 0,
            time: 0
          },
          category: 'Ignored',
          title: element.title,
          respond: 'Ignored'
        });
        managerMessage += element.title;
        if (index < RiskCards.riskHand.length - 1) {
          managerMessage += ', ';
        }
      });

      Notifiction.setNotification({
        name: 'Manager',
        message: managerMessage + '. I hope you know what you are doing!'
      });
    }

    Timeline.next();
    startOfTurn();
  }

  // save function incomplete

  // function save(): void {
  //   SaveGameState.SaveGameState().saveGame({
  //     objectives: {
  //       scope: Objective.ObjectiveScope.barPos,
  //       quality: Objective.ObjectiveQuality.barPos,
  //       time: Objective.ObjectiveTime.barPos,
  //       cost: Objective.ObjectiveCost.barPos
  //     },
  //     mitigationCards: MitigateCards.MitigatCardState.cards,
  //     riskCards: RiskCards.RiskCardState.riskCards,
  //     manager: Manager.ManagerLogsState.logs,
  //     logs: RiskLogs.RiskLogsState.logs,
  //     timelineStage: Timeline.TimelineState.current.stage,
  //     round: Timeline.TimelineState.current.stage,
  //     position: Timeline.TimelineState.barPos
  //   });
  // }

  // function unsave(): void {
  //   SaveGameState.SaveGameState().clearSave();
  // }
</script>

<GameOverModal show={gameOver} />
<GameWonModal show={gameWon} />

<button id="EndTurn_button" class="flex size-full items-center justify-center" onclick={endTurn}>
  <EndTurnSvg />
</button>
