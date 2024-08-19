<script lang="ts">
  import { Engine } from '$lib/Engine';
  import RiskCard from '../Cards/RiskCard.svelte';

  let cards = $derived(Engine.riskHand.handCards);

  setTimeout(() => {
    Engine.riskHand.createHand(4);
  }, 1e3);
</script>

<div class="handbg mb-3 ml-3 mr-3 mt-3 flex size-full content-center text-center">
  {#each cards as card}
    <div class="card-container">
      <div class="hitbox"></div>
      <div class="card">
        <RiskCard riskCard={card} />
      </div>
    </div>
  {/each}
</div>

<style>
  .handbg {
    background: url('/assets/HandBG.svg');
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 2rem;
  }

  .card-container {
    cursor: default !important;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    flex: 1 1 auto;
    flex-wrap: wrap;
    max-width: inherit;
    width: inherit;
    height: inherit;
    transition: transform 0.3s ease-in-out;
  }
  .card,
  .hitbox {
    cursor: default !important;
    position: absolute;
    top: 0;
    left: 0;

    user-select: none;
    box-sizing: border-box;
    height: 100%;
    flex-basis: calc(33.33% - 1rem);
    transition:
      transform 0.3s ease-in-out,
      box-shadow 0.3s ease-in-out,
      border-width 0.3s ease-in-out,
      rotate 0.3s ease-in-out;
  }

  .hitbox {
    z-index: 3;
    width: 100%;
  }

  .card-container:last-child {
    flex: 1 0 50%;
  }
  .hitbox:hover + .card {
    z-index: 2;
    cursor: pointer;
    transform: scale(1.05);
    rotate: 3deg;
  }
  .card-container:nth-child(even):hover .card {
    rotate: -3deg;
  }
  /* .card-container:hover + .card-container {
    transform: translateX(5vw);
    transition: ease-in-out 0.3s;
  } */
</style>
