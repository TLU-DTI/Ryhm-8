<script lang="ts">
  import SimpleBar from '$lib/Components/SimpleBar.svelte';
  import MitigationCard from './MitigationCard.svelte';
  import MitigationCardSvg from './MitigationCardsSVG.svelte';
  import MitigateCards, { type ICard } from '$lib/Cards/MitigationCards.svelte';
  import { cardState } from '../CardConnect/stores';


  let mitigation = $state([]) as ICard[];
  let usedMitigations = $state([]) as ICard[];
  let cards = $state([]) as ICard[];

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
    cards = [...usedMitigations, ...mitigation]
    /*setInterval(() => {
      console.log(Timeline.TimelineState.current.stage);
      console.log(RiskCards.RiskCardState.riskHand);
      risks = RiskCards.RiskCardState.riskHand;
    }, 1e3);*/
  });
</script>

<div class="size-full">
  <MitigationCardSvg>
    <SimpleBar>
      <div class="flex h-[240px] w-[570px] gap-4">
        {#each cards as card, mCardIndex (card)}
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
                <div class="w-[165px]">
                  <MitigationCard mitigationCard={card} />
                </div>
              </div>
            {:else}
              <div class="card">
                <div class="w-[165px]">
                  <MitigationCard mitigationCard={card} />
                </div>
              </div>
            {/if}
          </div>
          
        {/each}
      </div>
    </SimpleBar>
  </MitigationCardSvg>
</div>
