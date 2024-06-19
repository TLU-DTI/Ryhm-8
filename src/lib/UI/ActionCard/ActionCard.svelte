<script lang="ts">
  import { cardState } from '../CardConnect/stores';
  import CardTest from '../ActionCard/CardTest.svelte';
  import SimpleBar from '$lib/Components/SimpleBar.svelte';
  import MitigateCards, {type  ICard } from '$lib/Cards/MitigationCards.svelte';

  let mitigation = $state([]) as ICard[];
  let usedMitigations = $state([]) as ICard[];

  function handleCardDragStart(event: DragEvent, cardId: number) {
    event.dataTransfer?.setData('text/plain', cardId.toString());
    cardState.update(state => ({
      ...state,
      selectedActionCardId: cardId,
    }));
  }

  $effect(() => {
    //console.log(Timeline.TimelineState.current.stage);
    mitigation = MitigateCards.MitigatCardState.mitigateCardsHand
    usedMitigations = MitigateCards.MitigatCardState.usedCardsHand

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
      {#each [...usedMitigations, ...mitigation] as card, mCardIndex (card)}
      
        <div
          class="size-60 card-wrapper"
          draggable="true"
          ondragstart={(event) => handleCardDragStart(event, mCardIndex)}
          class:selected={$cardState.selectedActionCardId === mCardIndex}
          role="button"
          tabindex="0"
        >
        <CardTest title={card.title} description={card.description} img={card.id}/>
          <!--<ul class="bg-white card">
            <li>{card.id}</li>
            <li>{card.title}</li>
            <li>{card.description}</li>
            
          </ul>-->
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
</style>