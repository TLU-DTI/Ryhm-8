<script lang="ts">
  import type { RiskCard } from '$lib/Engine/Cards/RiskCard.svelte';
  import RiskCardComponent from '$lib/UI/Cards/RiskCard.svelte';
  import anime from 'animejs';
  import { onMount } from 'svelte';

  let {
    riskCard,
    current
  }: {
    riskCard: RiskCard;
    current: { x: number; y: number };
  } = $props();

  let card: HTMLDivElement | undefined = $state();

  onMount(() => {
    card!.style.top = current.y + 'px';
    card!.style.left = current.x + 'px';
    card!.style.width = 200 + 'px';
    card!.style.height = 200 + 'px';

    const target = document.querySelector('#RiskLogs')?.getBoundingClientRect() as DOMRect;

    anime.timeline().add({
      targets: card,
      duration: 500,
      top: target.y,
      left: target.x,
      scale: 0.2,
      rotate: '1turn',
      easing: 'linear'
      // complete: function () {
      //   // document.getElementById('riskanimation')!.innerHTML = '';
      // }
    });
  });
</script>

<div class="fixed z-20" bind:this={card}>
  <RiskCardComponent {riskCard} />
</div>
