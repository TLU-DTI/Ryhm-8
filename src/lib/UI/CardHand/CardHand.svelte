<script lang="ts">
  import { cardState } from '../CardConnect/stores';
  import { onDestroy, onMount } from 'svelte';
  import CardTest from '../ActionCard/CardTest.svelte';
  import SimpleBar from '$lib/Components/SimpleBar.svelte';
  import RiskCards,{ type IRiskCard } from '$lib/Cards/RiskCards.svelte';
  import Timeline, { TimelineState } from '$lib/States/TimelineState.svelte';
  import  RiskLogs, { type IRiskLog }  from '$lib/States/RiskLogState.svelte';
  import MitigationCardsSvelte, { type ICard } from '$lib/Cards/MitigationCards.svelte';
  import Objective from '$lib/States/ObjectiveState.svelte';
  import ManagerLogs from '$lib/States/ManagerLogState.svelte';
  import anime from 'animejs';

  let risks = $state([]) as IRiskCard[];

  let cardStateSubscription: { unsubscribe: () => void } | undefined;


  function handleHandCardDrop(event: DragEvent, cardId: number, card: ICard) {
    event.preventDefault();
    const actionCardId = event.dataTransfer?.getData('text/plain');
    let selectedActionCardId = parseInt(actionCardId, 10);
    if (!actionCardId) return;

    if (selectedActionCardId >= MitigationCardsSvelte.MitigatCardState.usedCardsHand.length) {
        selectedActionCardId -= MitigationCardsSvelte.MitigatCardState.usedCardsHand.length;
        addLog(risks[cardId], MitigationCardsSvelte.MitigatCardState.mitigateCardsHand[selectedActionCardId]);
        updateObjectives(MitigationCardsSvelte.MitigatCardState.mitigateCardsHand[selectedActionCardId]);
        handleAnimation(cardId, card);
        MitigationCardsSvelte.MitigatCardState.addUsed(MitigationCardsSvelte.MitigatCardState.mitigateCardsHand[selectedActionCardId]);
        MitigationCardsSvelte.MitigatCardState.mitigateCardsHand.splice(selectedActionCardId, 1);
    } else {
        addLog(risks[cardId], MitigationCardsSvelte.MitigatCardState.usedCardsHand[selectedActionCardId]);
        updateObjectives(MitigationCardsSvelte.MitigatCardState.usedCardsHand[selectedActionCardId]);
        handleAnimation(cardId, card);
    }
}

function addLog(risk: IRiskCard, mitigationCard: ICard) {
    RiskLogs.RiskLogsState.addLog({
        attributes: {
            cost: 0,
            quality: 0,
            scope: 0,
            time: 0
        },
        category: risk.category,
        title: risk.title,
        respond: mitigationCard.title
    });

    if (risk.mitigation[0] == mitigationCard.id) {
        ManagerLogs.ManagerLogsState.addLog({
            title: "Correct choice",
            name: "Manager",
            message: `Your choice of ${mitigationCard.title} to risk ${risk.title} was perfect`
        });
    } else if (risk.category == mitigationCard.category) {
        ManagerLogs.ManagerLogsState.addLog({
            title: Math.random() < 0.5 ? "Okay choice" : "Bad choice",
            name: "Manager",
            message: `Your choice of ${mitigationCard.title} to risk ${risk.title} was ${
                Math.random() < 0.5 ? "okay" : "okay, but the risk did not materialize"
            }`
        });
    } else {
        ManagerLogs.ManagerLogsState.addLog({
            title: "Terrible choice!",
            name: "Manager",
            message: `Your choice of ${mitigationCard.title} to risk ${risk.title} was terrible! What have you done!`
        });
    }
}

function updateObjectives(mitigationCard: ICard) {
    const factor = 1.04310005188;
    Objective.ObjectiveCost.move(-mitigationCard.attributes.cost * factor);
    Objective.ObjectiveQuality.move(mitigationCard.attributes.quality * factor);
    Objective.ObjectiveScope.move(mitigationCard.attributes.scope * factor);
    Objective.ObjectiveTime.move(-mitigationCard.attributes.time * factor);
}

function handleAnimation(cardId: number, card: ICard) {
    const finalPos = document.querySelector('#RiskLogs')?.getBoundingClientRect() as DOMRect;
    const currentPos = document.querySelector('#' + card.id)?.getBoundingClientRect() as DOMRect;

    anime.timeline().add({
        targets: '#' + card.id,
        duration: 500,
        top: finalPos.y - currentPos.y - 110,
        left: finalPos.x - currentPos.x + 110,
        scale: 0.2,
        rotate: '1turn',
        easing: "linear",
        complete: function() {
            risks.splice(cardId, 1);
        }
    });
}

  

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onMount(() => {
    cardStateSubscription = cardState.subscribe(state => {
      // Handle updates to cardState.selectedActionCardId or cardState.selectedHandCardId
    }) as unknown as { unsubscribe: () => void };
  });

  onDestroy(() => {
    cardStateSubscription?.unsubscribe();
  });

  

  $effect(() => {
    //console.log(Timeline.TimelineState.current.stage);
    risks = RiskCards.RiskCardState.riskHand;
    

  });


</script>

<style>
 
  .card-wrapper {
    position: relative;
    width: 30%;
    cursor: pointer;
    padding: 10px;
  }

  .disabled {
    pointer-events: none;
    opacity: 0.6;
  }

  .action-card {
    position: absolute;
    top: 0;
    left: 0;
    transition: transform 0.3s ease;
    z-index: 100;
  }

  .card-container {
    position: relative;
    flex: 1 1 auto;
    max-width: inherit;
    width: inherit;
    height: inherit;
  }
  .card {
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    height: 100%;
  }
  .card-container:last-child {
    flex: 1 0 50%;
  }
  .card:hover {
    z-index: 1;
    cursor: pointer;
    scale: 1.5;
  }
</style>
  <div class="size-full mb-3 ml-3 mr-3 mt-3 flex content-center text-center">
    {#each risks as card, cardIndex (card)}
      <!--<div class="card-container">
        <div class="card"><CardTest title={card.title} description={card.description} /></div>
      </div>-->
      

      <div
        class="card-container card-wrapper {($cardState.selectedActionCardId === null) ? 'disabled' : ''}"
        ondrop={(event) => handleHandCardDrop(event, cardIndex, card)}
        ondragover={handleDragOver}
        class:selected={$cardState.selectedHandCardId === cardIndex}
        role="button"
        tabindex="0"
      >
        {#if $cardState.cardConnections.find(conn => conn.handCardId === card.attributes.cost)}
          <div class="action-card">
            ActionCard {$cardState.cardConnections.find(conn => conn.handCardId === card.attributes.cost)?.actionCardId}
          </div>
        {/if}
        <!--<ul class="bg-white">
          <li>{card.title}</li>
          <li>{card.category}</li>
          <li>{card.description}</li>
          <li>{card.attributes.cost}</li>
          <li>{card.attributes.quality}</li>
          <li>{card.attributes.scope}</li>
          <li>{card.attributes.time}</li>
          <hr />
          <li>{card.gameStage.initation}</li>
          <li>{card.gameStage.planning}</li>
          <li>{card.gameStage.execution}</li>
          <li>{card.gameStage.closing}</li>
        </ul>-->
        <div class="card" id={card.id}><CardTest title={card.title} description={card.description} /></div>
      </div>
    {/each}
  </div>


<!--<script>
  import CardTest from '../ActionCard/CardTest.svelte';
  import { writable } from 'svelte/store';

  const selectedHandCardId = writable<number | null>(null);

  function handleHandCardClick(cardId: number) {
    selectedHandCardId.update(currentId => (currentId === cardId ? null : cardId));
  }
</script>

<div class="size-full content-center text-center">
  <CardTest title="Title" description="Description" />
</div>-->
