<script lang="ts">
  // import MitigateCards, { type IMitigationCard } from '$lib/Cards/MitigationCards.svelte';
  import SimpleBar from '$lib/Components/SimpleBar.svelte';
  import type { Category } from '$lib/Engine';
  import { cardState as cardState2 } from '$lib/UI/CardConnect/states.svelte.js';
  import MitiCardComponent from '$lib/UI/Cards/MitiCard.svelte';
  import { draggable } from '@neodrag/svelte';
  import ActionCardsSvg from './ActionCardsSVG.svelte';
  import type { MitiCard } from '$lib/Engine/Cards/MitiCard.svelte';

  let mitigation = $state([]) as MitiCard[];
  let usedMitigations = $state([]) as MitiCard[];
  let cards = $state([]) as MitiCard[];

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

  let testCard = {
    id: '1',
    title: 'asd',
    description: 'dfgdfg',
    category: ['Technical'] as Category[],
    attributes: {
      scope: 0,
      quality: 0,
      time: 0,
      cost: 0
    },
    rng: false,
    used: false
  };
</script>

<div class="size-full">
  <ActionCardsSvg>
    <SimpleBar>
      <div class="flex h-[240px] w-[570px] gap-4">
        <div class="size-60" use:draggable>
          <MitiCardComponent card={testCard} />
        </div>
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
                  <MitiCardComponent {card} />
                </div>
              </div>
            {:else}
              <div class="card">
                <div class="w-[165px]">
                  <MitiCardComponent {card} />
                </div>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </SimpleBar>
  </ActionCardsSvg>
</div>

<style>
  .card,
  .card-old {
    transition: cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.5s;
    user-select: none;
  }
  .card:hover,
  .card-old:hover {
    transform: scale(1.1) translate(2px, 1vh);
    transition: cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.5s;
  }
  .card:first-child {
    transform: translateX(2vw);
    user-select: none;
  }
  .card:first-child > :hover {
    transform: translateX(2vw);
    transform: scale(1.1) translate(2px, 1vh);
    transition: cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.5s;
  }
</style>
