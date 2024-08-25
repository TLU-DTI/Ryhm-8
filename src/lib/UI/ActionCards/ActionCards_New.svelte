<script lang="ts">
  import SimpleBar from '$lib/Components/SimpleBar.svelte';
  import { Engine } from '$lib/Engine';
  import MitiCardComponent from '$lib/UI/Cards/MitiCard.svelte';
  import ActionCardsSvg from './ActionCardsSVG.svelte';

  let cards = $derived(Engine.mitihand.handCards);
</script>

<div class="size-full">
  <ActionCardsSvg>
    <SimpleBar>
      <div class="flex h-[240px] w-[570px] gap-4">
        {#each cards as card}
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <div class="card-wrapper size-60" onmousedown={Engine.drag.dragStart}>
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
  .card:first-child {
    transform: translateX(2vw);
    user-select: none;
  }
</style>
