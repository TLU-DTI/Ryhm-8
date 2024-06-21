<script lang="ts">
  import { cardState } from '../CardConnect/states.svelte';
  import { getContext, onMount } from 'svelte';
  import { type IRiskCard, type IRiskCards } from '$lib/Cards/RiskCards.svelte';
  import RiskLogs from '$lib/States/RiskLogState.svelte';
  import MitigationCardsSvelte, {
    type Category,
    type IMitigationCard
  } from '$lib/Cards/MitigationCards.svelte';
  import { type IObjectiveState } from '$lib/States/ObjectiveState.svelte';
  import anime from 'animejs';
  import { type INotification } from '$lib/States/NotificationState.svelte';
  import RiskCard from '$lib/Cards/RiskCard.svelte';

  let risks = $state([]) as IRiskCard[];

  const Notifiction = getContext<INotification>('Notification');
  const Objective = getContext<IObjectiveState>('Objectives');

  onMount(() => {
    risks = getContext<IRiskCards>('RiskCards').riskHand;
  });

  function handleHandCardDrop(event: DragEvent, cardId: number, card: IRiskCard) {
    event.preventDefault();
    const actionCardId = event.dataTransfer?.getData('text/plain');
    let selectedActionCardId = parseInt(actionCardId as string, 10);
    if (!actionCardId) return;

    if (selectedActionCardId >= MitigationCardsSvelte.MitigatCardState.usedCardsHand.length) {
      selectedActionCardId -= MitigationCardsSvelte.MitigatCardState.usedCardsHand.length;
      addLog(
        risks[cardId],
        MitigationCardsSvelte.MitigatCardState.mitigateCardsHand[selectedActionCardId]
      );
      handleAnimation(cardId, card);
      MitigationCardsSvelte.MitigatCardState.addUsed(
        MitigationCardsSvelte.MitigatCardState.mitigateCardsHand[selectedActionCardId]
      );
      MitigationCardsSvelte.MitigatCardState.mitigateCardsHand.splice(selectedActionCardId, 1);
    } else {
      addLog(
        risks[cardId],
        MitigationCardsSvelte.MitigatCardState.usedCardsHand[selectedActionCardId]
      );
      handleAnimation(cardId, card);
    }
  }

  function addLog(risk: IRiskCard, mitigationCard: IMitigationCard) {
    RiskLogs.RiskLogsState.addLog({
      attributes: {
        cost: 0,
        quality: 0,
        scope: 0,
        time: 0
      },
      category: risk?.category as Category,
      title: risk.title,
      respond: mitigationCard.title
    });

    let correct = 0;
    for (let i = 0; i < risk.mitigation.length; i++) {
      if (risk.mitigation[i] == mitigationCard.id) {
        correct = 1;
      }
    }
    risk.mitigation[0] == mitigationCard.id;
    if (correct) {
      Notifiction.setNotification({
        name: 'Manager',
        message: `Your choice to use the card "${mitigationCard.title}" on the "${risk.title}" was perfect!`
      });
      finalUpdateObjectives(
        mitigationCard.attributes.cost,
        mitigationCard.attributes.quality,
        mitigationCard.attributes.scope,
        mitigationCard.attributes.time
      );
    } else if (risk?.category == mitigationCard?.category) {
      let rng = Math.random() < 0.5;
      Notifiction.setNotification({
        name: 'Manager',
        message: `Your choice of ${mitigationCard.title} to risk ${risk.title} was ${
          rng
            ? 'okay and you got lucky - the risk did not materialize.'
            : 'okay, but sadly the risk materialized.'
        }`
      });
      if (!rng) {
        finalUpdateObjectives(
          mitigationCard.attributes.cost + risk.attributes.cost,
          mitigationCard.attributes.quality + risk.attributes.quality,
          mitigationCard.attributes.scope + risk.attributes.scope,
          mitigationCard.attributes.time + risk.attributes.scope
        );
      } else {
        finalUpdateObjectives(
          mitigationCard.attributes.cost,
          mitigationCard.attributes.quality,
          mitigationCard.attributes.scope,
          mitigationCard.attributes.time
        );
      }
    } else {
      Notifiction.setNotification({
        name: 'Manager',
        message: `Your choice of ${mitigationCard.title} to risk ${risk.title} was terrible! What have you done!`
      });
      finalUpdateObjectives(
        mitigationCard.attributes.cost + risk.attributes.cost,
        mitigationCard.attributes.quality + risk.attributes.quality,
        mitigationCard.attributes.scope + risk.attributes.scope,
        mitigationCard.attributes.time + risk.attributes.scope
      );
    }
  }

  // function updateObjectives(mitigationCard: IMitigationCard) {
  //   Objective.Cost.move(-mitigationCard.attributes.cost);
  //   Objective.Quality.move(mitigationCard.attributes.quality);
  //   Objective.Scope.move(mitigationCard.attributes.scope);
  //   Objective.Time.move(-mitigationCard.attributes.time);
  // }

  function finalUpdateObjectives(cost: number, quality: number, scope: number, time: number) {
    Objective.Cost.move(-cost);
    Objective.Quality.move(quality);
    Objective.Scope.move(scope);
    Objective.Time.move(-time);
  }

  function handleAnimation(cardId: number, card: IRiskCard) {
    const finalPos = document.querySelector('#RiskLogs')?.getBoundingClientRect() as DOMRect;
    const currentPos = document.querySelector('#' + card.id)?.getBoundingClientRect() as DOMRect;

    anime.timeline().add({
      targets: '#' + card.id,
      duration: 500,
      top: finalPos.y - currentPos.y - 110,
      left: finalPos.x - currentPos.x + 110,
      scale: 0.2,
      rotate: '1turn',
      easing: 'linear',
      complete: function () {
        risks.splice(cardId, 1);
      }
    });
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
  }
</script>

<div class="handbg mb-3 ml-3 mr-3 mt-3 flex size-full content-center text-center">
  {#each risks as card, cardIndex (card)}
    <div
      class="card-container card-wrapper {cardState.selectedActionCardId === null
        ? 'disabled'
        : ''}"
      ondrop={(event) => handleHandCardDrop(event, cardIndex, card)}
      ondragover={handleDragOver}
      class:selected={cardState.selectedHandCardId === cardIndex}
      role="button"
      tabindex="0"
    >
      {#if cardState.cardConnections.find((conn) => conn.handCardId === card.attributes.cost)}
        <div class="action-card">
          ActionCard {cardState.cardConnections.find(
            (conn) => conn.handCardId === card.attributes.cost
          )?.actionCardId}
        </div>
      {/if}
      <div class="card" id={card.id}>
        <RiskCard riskCard={card} />
      </div>
    </div>
  {/each}
</div>

<style>
  .handbg {
    background: url('/assets/HandBG.svg');
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 2rem;
  }
  .card-container {
    cursor: default !important;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    flex: 1 1 auto;
    flex-wrap: wrap;
    max-width: inherit;
    width: inherit;
    height: inherit;
    transition: transform 0.3s ease-in-out;
  }
  .card {
    cursor: default !important;
    position: absolute;
    top: 0;
    left: 0;
    user-select: none;
    box-sizing: border-box;
    height: 100%;
    flex-basis: calc(33.33% - 1rem);
    transition:
      transform 0.3s ease-in-out,
      box-shadow 0.3s ease-in-out,
      border-width 0.3s ease-in-out,
      rotate 0.3s ease-in-out;
  }
  .card-container:last-child {
    flex: 1 0 50%;
  }
  .card:hover {
    z-index: 1;
    cursor: pointer;
    transform: scale(1.05);
    rotate: 3deg;
  }
  .card-container:nth-child(even):hover .card {
    rotate: -3deg;
  }
  .card-container:hover ~ .card-container {
    transform: translateX(5vw);
    transition: ease-in-out 0.3s;
  }
</style>
