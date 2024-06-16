<script lang="ts">
  import { cardState } from '../CardConnect/stores';
  import { onDestroy, onMount } from 'svelte';
  import CardTest from '../ActionCard/CardTest.svelte';
  import SimpleBar from '$lib/Components/SimpleBar.svelte';

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
      {#each [1, 2, 3, 4, 5] as cardId}
        <div
          class="card-wrapper {($cardState.selectedActionCardId === null) ? 'disabled' : ''}"
          on:drop={(event) => handleHandCardDrop(event, cardId)}
          on:dragover={handleDragOver}
          class:selected={$cardState.selectedHandCardId === cardId}
          role="button"
          tabindex="0"
        >
          {#if $cardState.cardConnections.find(conn => conn.handCardId === cardId)}
            <div class="action-card">
              ActionCard {$cardState.cardConnections.find(conn => conn.handCardId === cardId)?.actionCardId}
            </div>
          {/if}
          <CardTest />
        </div>
      {/each}
    </div>
  </div>
</SimpleBar>
