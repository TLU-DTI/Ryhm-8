<script lang="ts">
  import { cardState } from '../CardConnect/stores';
  import CardTest from '../ActionCard/CardTest.svelte';
  import SimpleBar from '$lib/Components/SimpleBar.svelte';
  import MitigateCards, { type ICard } from '$lib/Cards/MitigationCards.svelte';

  let mitigation = $state([]) as ICard[];
  let usedMitigations = $state([]) as ICard[];

  function handleCardDragStart(event: DragEvent, cardId: number) {
    event.dataTransfer?.setData('text/plain', cardId.toString());
    cardState.update((state) => ({
      ...state,
      selectedActionCardId: cardId
    }));
  }

  $effect(() => {
    //console.log(Timeline.TimelineState.current.stage);
    mitigation = MitigateCards.MitigatCardState.mitigateCardsHand;
    usedMitigations = MitigateCards.MitigatCardState.usedCardsHand;

    /*setInterval(() => {
      console.log(Timeline.TimelineState.current.stage);
      console.log(RiskCards.RiskCardState.riskHand);
      risks = RiskCards.RiskCardState.riskHand;
    }, 1e3);*/
  });
</script>

<SimpleBar>
  <div class="size-full">
    <div class="card-pack flex gap-4 text-center">
      {#each [...usedMitigations, ...mitigation] as card, mCardIndex (card)}
        <div
          class="card-wrapper size-60"
          draggable="true"
          ondragstart={(event) => handleCardDragStart(event, mCardIndex)}
          class:selected={$cardState.selectedActionCardId === mCardIndex}
          role="button"
          tabindex="0"
        >
          {#if card.used}
            <div class="card-old">
              <CardTest title={'VANA'} description={card.description} />
            </div>
          {:else}
            <div class="card">
              <CardTest title={'uus'} description={card.description} />
              <!-- <ul class="card-old bg-white">
            <li>{card.id}</li>
            <li>{card.title}</li>
            <li>{card.description}</li>
          </ul> -->
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</SimpleBar>

<style>
  .card:hover,
  .card-old:hover {
    transform: translateY(-1vh);
    transition: 0.3s;
    filter: drop-shadow(0 2vh 0.5rem rgba(0, 0, 0, 0.169));
    z-index: 1;
  }
  .card-pack {
    /* display: grid;
    grid-template-columns: repeat(auto-fill, minmax(5vw, 3fr)); */
    display: flex;
    flex-wrap: wrap;
  }

  /* .card-old:last-child {
    transform: translateX(-1vw);
  } */
</style>
