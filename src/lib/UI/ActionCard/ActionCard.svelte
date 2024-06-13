<script lang="ts">
  import SimpleBar from '$lib/Components/SimpleBar.svelte';
  import CardTest from './CardTest.svelte';
  import { writable } from 'svelte/store';

  const selectedActionCardId = writable<number | null>(null);

  function handleCardClick(cardId: number) {
    selectedActionCardId.update(currentId => (currentId === cardId ? null : cardId));
  }
</script>

<style>
  .selected {
    filter: brightness(0.8);
  }
</style>

<div class="size-full">
  <SimpleBar>
    <div class="flex gap-4 text-center">
      <div
        class="size-60 card-wrapper"
        onclick={() => handleCardClick(1)}
        class:selected={$selectedActionCardId === 1}
        role="button"
        tabindex="0"
        onkeydown={(e) => e.key === 'Enter' && handleCardClick(1)}
      >
        <CardTest />
      </div>
      <div
        class="size-60 card-wrapper"
        onclick={() => handleCardClick(2)}
        class:selected={$selectedActionCardId === 2}
        role="button"
        tabindex="0"
        onkeydown={(e) => e.key === 'Enter' && handleCardClick(2)}
      >
        <CardTest />
      </div>
      <div
        class="size-60 card-wrapper"
        onclick={() => handleCardClick(3)}
        class:selected={$selectedActionCardId === 3}
        role="button"
        tabindex="0"
        onkeydown={(e) => e.key === 'Enter' && handleCardClick(3)}
      >
        <CardTest />
      </div>
    </div>
  </SimpleBar>
</div>
