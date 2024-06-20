<script lang="ts">
  import MitigateCards, { type IMitigationCard } from '$lib/Cards/MitigationCards.svelte';
  import SimpleBar from '$lib/Components/SimpleBar.svelte';
  import MitigationCard from './MitigationCard.svelte';
  import MitigationCardSvg from './MitigationCardsSVG.svelte';

  let mitigation = $state([]) as IMitigationCard[];
  let usedMitigations = $state([]) as IMitigationCard[];
  let cards = $state([]) as IMitigationCard[];

  function handleCardDragStart(event: DragEvent, cardId: number) {
    event.dataTransfer?.setData('text/plain', cardId.toString());
    cardState.update((state) => ({
      ...state,
      selectedActionCardId: cardId
    }));
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
