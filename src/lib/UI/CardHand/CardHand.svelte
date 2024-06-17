<script lang="ts">
  import { cardState } from '../CardConnect/stores';
  import { onDestroy, onMount } from 'svelte';
  import CardTest from '../ActionCard/CardTest.svelte';
  import SimpleBar from '$lib/Components/SimpleBar.svelte';
  import RiskCards,{ type IRiskCard } from '$lib/Cards/RiskCards.svelte';
  import Timeline, { TimelineState } from '$lib/States/TimelineState.svelte';
  import  RiskLogs, { type IRiskLog }  from '$lib/States/RiskLogState.svelte';
  import MitigationCardsSvelte from '$lib/Cards/MitigationCards.svelte';
  import Objective from '$lib/States/ObjectiveState.svelte';

  let risks = $state([]) as IRiskCard[];

  let cardStateSubscription: { unsubscribe: () => void } | undefined;


  function handleHandCardDrop(event: DragEvent, cardId: number) {



    event.preventDefault();
    console.log(cardId);
    const actionCardId = event.dataTransfer?.getData('text/plain');
    const selectedActionCardId = parseInt(actionCardId, 10)
    //console.log(actionCardId)
    if (!actionCardId) return;

    RiskLogs.RiskLogsState.addLog({
      attributes: {
        cost: 0,
        quality: 0,
        scope: 0,
        time: 0
      },
      category: risks[cardId].category,
      title: risks[cardId].title,
      respond: MitigationCardsSvelte.MitigatCardState.mitigateCardsHand[selectedActionCardId].title
    });

    let costTotal = 0;
    let qualityTotal = 0;
    let scopeTotal = 0;
    let timeTotal = 0;

    costTotal += MitigationCardsSvelte.MitigatCardState.mitigateCardsHand[selectedActionCardId].attributes.cost
    qualityTotal += MitigationCardsSvelte.MitigatCardState.mitigateCardsHand[selectedActionCardId].attributes.quality
    scopeTotal += MitigationCardsSvelte.MitigatCardState.mitigateCardsHand[selectedActionCardId].attributes.scope
    timeTotal += MitigationCardsSvelte.MitigatCardState.mitigateCardsHand[selectedActionCardId].attributes.time

    if(risks[cardId].mitigation == MitigationCardsSvelte.MitigatCardState.mitigateCardsHand[selectedActionCardId].id){
      
    } else if (risks[cardId].category == MitigationCardsSvelte.MitigatCardState.mitigateCardsHand[selectedActionCardId].category){
      if(Math.random() < 0.5){
        
      }
    }
  

    MitigationCardsSvelte.MitigatCardState.addUsed(MitigationCardsSvelte.MitigatCardState.mitigateCardsHand[selectedActionCardId]);

    

    Objective.ObjectiveCost.move(-costTotal * 1.04310005188);
    Objective.ObjectiveQuality.move(qualityTotal * 1.04310005188);
    Objective.ObjectiveScope.move(scopeTotal * 1.04310005188);
    Objective.ObjectiveTime.move(-timeTotal * 1.04310005188);

    risks.splice(cardId, 1)

    /*cardState.update(state => {
      const selectedActionCardId = parseInt(actionCardId, 10);

      // Check if a connection already exists
      const existingConnectionIndex = state.cardConnections.findIndex(connection =>
        connection.actionCardId === selectedActionCardId && connection.handCardId === cardId
      );

      if (existingConnectionIndex !== -1) {
        state.cardConnections.splice(existingConnectionIndex, 1);
      } else {
        state.cardConnections.push({ actionCardId: selectedActionCardId, handCardId: cardId });
      }

      return {
        ...state,
        selectedHandCardId: state.selectedHandCardId === cardId ? null : cardId,
      };
    });*/
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
        ondrop={(event) => handleHandCardDrop(event, cardIndex)}
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
        <div class="card"><CardTest title={card.title} description={card.description} /></div>
      </div>
    {/each}
  </div>


<!--<script>
  import CardTest from '../ActionCard/CardTest.svelte';
</script>

<div class="size-full content-center text-center">
  <CardTest title="Title" description="Description" />
</div>-->