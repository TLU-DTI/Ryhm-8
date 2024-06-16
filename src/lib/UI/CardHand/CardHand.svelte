<script lang="ts">
  import { cardState } from '../CardConnect/stores';
  import { onDestroy, onMount } from 'svelte';
  import CardTest from '../ActionCard/CardTest.svelte';
  import SimpleBar from '$lib/Components/SimpleBar.svelte';
  import RiskCards,{ type IRiskCard } from '$lib/Cards/RiskCards.svelte';
  import Timeline, { TimelineState } from '$lib/States/TimelineState.svelte';

  let risks = $state([]) as IRiskCard[];

  let cardStateSubscription: { unsubscribe: () => void } | undefined;


  function handleHandCardDrop(event: DragEvent, cardId: number) {
    event.preventDefault();
    const actionCardId = event.dataTransfer?.getData('text/plain');
    if (!actionCardId) return;

    cardState.update(state => {
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

  function save():void{
    risks = RiskCards.RiskCardState.riskHand;
  }

  $effect(() => {
    //console.log(Timeline.TimelineState.current.stage);
    risks = RiskCards.RiskCardState.riskHand;
    

    /*setInterval(() => {
      console.log(Timeline.TimelineState.current.stage);
      console.log(RiskCards.RiskCardState.riskHand);
      risks = RiskCards.RiskCardState.riskHand;
    }, 1e3);*/
  });


</script>

<style>
  .card-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    overflow: hidden;
  }

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
</style>

<SimpleBar>
  <div class="size-full">
    <div class="card-container">
      {#each risks as card}
        <ul class="bg-white">
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
        </ul>
        <!---<div
          class="card-wrapper {($cardState.selectedActionCardId === null) ? 'disabled' : ''}"
          ondrop={(event) => handleHandCardDrop(event, card.attributes.cost)}
          ondragover={handleDragOver}
          class:selected={$cardState.selectedHandCardId === card.attributes.cost}
          role="button"
          tabindex="0"
        >
          {#if $cardState.cardConnections.find(conn => conn.handCardId === card.attributes.cost)}
            <div class="action-card">
              ActionCard {$cardState.cardConnections.find(conn => conn.handCardId === card.attributes.cost)?.actionCardId}
            </div>
          {/if}
          <CardTest />
        </div>-->
      {/each}
    </div>
    <button onclick={save}>Save</button>
  </div>
</SimpleBar>
