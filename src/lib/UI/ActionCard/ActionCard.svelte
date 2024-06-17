<script lang="ts">
  import { cardState } from '../CardConnect/stores';
  import CardTest from '../ActionCard/CardTest.svelte';
  import SimpleBar from '$lib/Components/SimpleBar.svelte';
  import MitigateCards, {type  ICard } from '$lib/Cards/MitigationCards.svelte';

  let mitigation = $state([]) as ICard[];

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
      {#each mitigation as card, mCardIndex (card)}
      
        <div
          class="size-60 card-wrapper"
          draggable="true"
          ondragstart={(event) => handleCardDragStart(event, mCardIndex)}
          class:selected={$cardState.selectedActionCardId === mCardIndex}
          role="button"
          tabindex="0"
        >
          <!--<CardTest />-->
          <ul class="bg-white">
            <li>{card.id}</li>
            <li>{card.category}</li>
            <li>{card.description}</li>
            <li>{card.attributes.cost}</li>
            <li>{card.attributes.quality}</li>
            <li>{card.attributes.scope}</li>
            <li>{card.attributes.time}</li>
          </ul>
        </div>
      {/each}
    </div>
  </div>
</SimpleBar>
