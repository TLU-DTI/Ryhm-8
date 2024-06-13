<script lang="ts">
  import CardTest from '../ActionCard/CardTest.svelte';
  import { writable } from 'svelte/store';

  const selectedHandCardId = writable<number | null>(null);

  function handleHandCardClick(cardId: number) {
    selectedHandCardId.update(currentId => (currentId === cardId ? null : cardId));
  }
</script>

<style>
  .card-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .card-wrapper {
    width: 30%;
    cursor: pointer;
    padding: 10px;
  }

  .selected {
    filter: brightness(0.8);
  }
</style>

<div class="size-full">
  <div class="card-container">
    <div
      class="card-wrapper"
      onclick={() => handleHandCardClick(1)}
      class:selected={$selectedHandCardId === 1}
      role="button"
      tabindex="0"
      onkeydown={(e) => e.key === 'Enter' && handleHandCardClick(1)}
    >
      <CardTest />
    </div>
    <div
      class="card-wrapper"
      onclick={() => handleHandCardClick(2)}
      class:selected={$selectedHandCardId === 2}
      role="button"
      tabindex="0"
      onkeydown={(e) => e.key === 'Enter' && handleHandCardClick(2)}
    >
      <CardTest />
    </div>
  </div>
</div>
