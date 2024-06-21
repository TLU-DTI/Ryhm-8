<script lang="ts">
  import MitigateCards, { type IMitigationCard } from '$lib/Cards/MitigationCards.svelte';
  import SimpleBar from '$lib/Components/SimpleBar.svelte';
  import { cardState as cardState2 } from '../CardConnect/states.svelte';
  import MitigationCard from './MitigationCard.svelte';
  import MitigationCardSvg from './MitigationCardsSVG.svelte';

  let mitigation = $state([]) as IMitigationCard[];
  let usedMitigations = $state([]) as IMitigationCard[];
  let cards = $state([]) as IMitigationCard[];

  let cardState = $state(cardState2);

  function handleCardDragStart(event: DragEvent, cardId: number) {
    event.dataTransfer?.setData('text/plain', cardId.toString());
    cardState = {
      selectedActionCardId: cardId
    };
  }

  $effect(() => {
    mitigation = MitigateCards.MitigatCardState.mitigateCardsHand;
    usedMitigations = MitigateCards.MitigatCardState.usedCardsHand;
    cards = [...usedMitigations, ...mitigation];
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
            class:selected={cardState.selectedActionCardId === mCardIndex}
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

<style>
  .card {
    transition: cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.5s;
    user-select: none;
  }
  .card:hover {
    transform: scale(1.1) translate(2px, 1vh);
    transition: cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.5s;
  }
</style>
