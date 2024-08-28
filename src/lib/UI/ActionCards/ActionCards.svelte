<script lang="ts">
  import SimpleBar from '$lib/Components/SimpleBar.svelte';
  import { Engine } from '$lib/Engine';
  import type { MitiCard } from '$lib/Engine/Cards/MitiCard.svelte';
  import MitiCardComponent from '$lib/UI/Cards/MitiCard.svelte';
  import ActionCardsSvg from './ActionCardsSVG.svelte';

  let mitiCards = $derived(Engine.mitihand.handCards);
  // let usedCards = $derived(Engine.mitihand.usedCards);

  // let cards = $derived([...usedCards, ...mitiCards]);
  // let cards = $derived(mitiCards);

  let hoverCard: MitiCard | undefined = $state();
  let hoverCardDiv = $state() as HTMLDivElement;

  function handleCardEnter(e: MouseEvent) {
    let target = e.target as HTMLDivElement;

    let rect = target.getBoundingClientRect();
    let cardID = target.getElementsByTagName('svg')[0].getAttribute('id')?.split('_')[1];

    hoverCardDiv.style.top = `${rect.top}px`;
    hoverCardDiv.style.left = `${rect.left}px`;
    hoverCardDiv.style.width = `${rect.width}px`;
    hoverCardDiv.style.height = `${rect.height}px`;

    for (const x of Engine.mitihand.mitiCards) {
      if (x.id === cardID) {
        hoverCard = x;
        break;
      }
    }
  }

  function handleCardLeave(e: MouseEvent) {
    hoverCard = undefined;
    hoverCardDiv.style.top = '0px';
    hoverCardDiv.style.left = '0px';
    hoverCardDiv.style.width = '0px';
    hoverCardDiv.style.height = '0px';
  }

  function handleMouseDown(e: MouseEvent) {
    Engine.drag.dragStart(e);
  }
</script>

<div class="size-full">
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="fixed"
    id="hoverCard"
    bind:this={hoverCardDiv}
    onmouseleave={handleCardLeave}
    onmousedown={handleMouseDown}
  >
    {#if hoverCard}
      <MitiCardComponent card={hoverCard} />
    {/if}
  </div>

  <ActionCardsSvg>
    <SimpleBar>
      <div class="flex h-[240px] w-[570px] gap-4">
        {#each mitiCards as card}
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <div class="card-wrapper size-60">
            {#if card.used}
              <!-- Not using this -->
              <!-- <div class="card-old">
                <div class="w-[165px]">
                  <MitiCardComponent {card} />
                </div>
              </div> -->
            {:else}
              <div class="card">
                <div class="w-[165px]" onmouseenter={handleCardEnter}>
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
  .card/*, .card-old */ {
    transition: cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.5s;
    /* user-select: none; */
  }
  .card:first-child {
    transform: translateX(2vw);
    /* user-select: none; */
  }

  #hoverCard:hover {
    transition:
      transform 0.2s ease-in-out,
      box-shadow 0.2s ease-in-out,
      border-width 0.2s ease-in-out,
      rotate 0.2s ease-in-out;

    transform: scale(1.7) translateY(-15%);
  }
</style>
