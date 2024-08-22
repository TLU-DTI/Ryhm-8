<script lang="ts">
  import { Engine } from '$lib/Engine';
  import RiskCard from '../Cards/RiskCard.svelte';

  let cards = $derived(Engine.riskhand.handCards);
</script>

<div id="card-hand" class="handbg absolute flex size-full pb-4 pl-4 pr-4 pt-4">
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
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    /* flex: 1 1 auto;
    flex-wrap: wrap; */
    max-width: inherit;
    width: inherit;
    height: inherit;
    transition: transform 0.3s ease-in-out;
  }

  .card-container:not(:first-child) {
    margin-left: -70px;
  }

  .card,
  .hitbox {
    position: absolute;
    top: 0;
    left: 0;

    user-select: none;
    box-sizing: border-box;
    height: 100%;
    flex-basis: calc(33.33% - 1rem);
    transition:
      transform 0.2s ease-in-out,
      box-shadow 0.2s ease-in-out,
      border-width 0.2s ease-in-out,
      rotate 0.2s ease-in-out;
  }

  .hitbox {
    z-index: 3;
    width: 100%;
  }

  /* .card-container:last-child {
    flex: 1 0 50%;
  } */
  .hitbox:hover + .card {
    z-index: 2;
    cursor: pointer;
    transform: scale(1.2);
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
