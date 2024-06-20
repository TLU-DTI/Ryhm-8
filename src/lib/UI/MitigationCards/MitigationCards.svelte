<script lang="ts">
  import type { ICard } from '$lib/Cards/MitigationCards.svelte';
  import SimpleBar from '$lib/Components/SimpleBar.svelte';
  import MitigationCard from './MitigationCard.svelte';
  import MitigationCardSvg from './MitigationCardsSVG.svelte';
  let cards = $state([]) as ICard[];

  $effect(() => {
    setTimeout(() => {
      let card = {
        id: '1M',
        title: 'Requ Requirements Requirements',
        description:
          'Analyse customer needs and specify clear requirements. Present the results of the needs study to the customer and ask for feedback.',
        category: 'Management',
        attributes: {
          cost: 10,
          quality: 5,
          scope: 3,
          time: 2
        },
        rng: 1
      } as ICard;
      cards.push(card);
    }, 1e3);
  });
</script>

<div class="size-full">
  <MitigationCardSvg>
    <SimpleBar>
      <div class="flex h-[240px] w-[570px] gap-4">
        {#each cards as card}
          <div class="w-[165px]">
            <MitigationCard mitigationCard={card} />
          </div>
        {/each}
      </div>
    </SimpleBar>
  </MitigationCardSvg>
</div>
