<script lang="ts">
  import { cardState } from '../CardConnect/stores';
  import CardTest from '../ActionCard/CardTest.svelte';
  import SimpleBar from '$lib/Components/SimpleBar.svelte';
  import MitigateCards, {type  ICard } from '$lib/Cards/MitigationCards.svelte';

  let mitigation = $state([]) as ICard[];
  let usedMitigations = $state([]) as ICard[];
  let cards = $state([]) as ICard[];

  function handleCardDragStart(event: DragEvent, cardId: number) {
    event.dataTransfer?.setData('text/plain', cardId.toString());
    cardState.update(state => ({
      ...state,
      selectedActionCardId: cardId,
    }));
  }

  $effect(() => {
    //console.log(Timeline.TimelineState.current.stage);
    mitigation = MitigateCards.MitigatCardState.mitigateCardsHand;
    usedMitigations = MitigateCards.MitigatCardState.usedCardsHand;
    cards = [
      ...usedMitigations.map(card => ({ ...card, type: 'used' })),
      ...mitigation.map(card => ({ ...card, type: 'mitigation' }))
    ];

    /*setInterval(() => {
      console.log(Timeline.TimelineState.current.stage);
      console.log(RiskCards.RiskCardState.riskHand);
      risks = RiskCards.RiskCardState.riskHand;
    }, 1e3);*/
  });
</script>

<SimpleBar>
  <div class="size-full">
    <div class="flex gap-4 text-center"> 
      {#each cards as card, mCardIndex (card)}
      
        <div
          class="size-60 card-wrapper card"
          draggable="true"
          ondragstart={(event) => handleCardDragStart(event, mCardIndex)}
          class:selected={$cardState.selectedActionCardId === mCardIndex}
          role="button"
          tabindex="0"
        >
        <CardTest title={card.title} description={card.description} img={card.id}/>
        </div>
      {/each}
    </div>
  </div>
</SimpleBar>

<style>
  .card:hover {
    transform: translateY(-1vh);
    transition: 0.3s;
    filter: drop-shadow(0 2vh 0.5rem rgba(0, 0, 0, 0.169));
    z-index: 1;
  }
  /*.card {
    position: absolute;
    top: 0;
    left: 0;

    box-sizing: border-box;
    height: 100%;
    flex-basis: calc(33.33% - 1rem);
    transition:
      transform 0.3s ease-in-out,
      box-shadow 0.3s ease-in-out,
      border-width 0.3s ease-in-out,
      rotate 0.3s ease-in-out;
  }*/
  /*.card-wrapper{
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
  }*/
</style>