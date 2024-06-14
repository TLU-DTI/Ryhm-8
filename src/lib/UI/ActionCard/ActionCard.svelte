<script lang="ts">
  import { cardState } from '../CardConnect/stores';
  import CardTest from '../ActionCard/CardTest.svelte';
  import SimpleBar from '$lib/Components/SimpleBar.svelte';

  function handleCardDragStart(event: DragEvent, cardId: number) {
    event.dataTransfer?.setData('text/plain', cardId.toString());
    cardState.update(state => ({
      ...state,
      selectedActionCardId: cardId,
    }));
  }
</script>

<SimpleBar>
  <div class="size-full">
    <div class="flex gap-4 text-center">
      {#each [1, 2, 3, 4] as cardId}
        <div
          class="size-60 card-wrapper"
          draggable="true"
          on:dragstart={(event) => handleCardDragStart(event, cardId)}
          class:selected={$cardState.selectedActionCardId === cardId}
          role="button"
          tabindex="0"
        >
          <CardTest />
        </div>
      {/each}
    </div>
  </div>
</SimpleBar>
