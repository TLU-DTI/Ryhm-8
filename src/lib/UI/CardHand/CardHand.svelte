<script lang="ts">
  import { Dom } from '@svgdotjs/svg.js';
  import CardTest from '../ActionCard/CardTest.svelte';
  import anime from 'animejs';

  let move;

  $effect(() => {
    move = function (targetID: string) {
      const finalPos = document.querySelector('#RiskLogs')?.getBoundingClientRect() as DOMRect;
      const currentPos = document.querySelector('#' + targetID)?.getBoundingClientRect() as DOMRect;
      console.log(finalPos, currentPos);

      // const animation1 = anime.timeline().add({
      //   targets: '#',
      //   //rotate: 7200,
      //   duration: 5000,
      //   translateY: -2000,
      //   easing: 'easeInOutSine',
      //   direction: 'normal',
      //   loop: true
      // });

      const animation2 = anime.timeline().add({
        targets: '#' + targetID,
        duration: 500,
        top: finalPos.y - currentPos.y - 110,
        left: finalPos.x - currentPos.x + 110,
        scale: 0.2,
        rotate: '1turn'
      });
    };
  });
</script>

<div class="flex size-full content-center justify-center text-center">
  <div class="card-container">
    <button class="card" id="card1" onclick={() => move('card1')}>
      <CardTest
        title="TIIIITEL 🤷‍♀️"
        description="Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description "
      />
    </button>
  </div>
  <div class="card-container">
    <button class="card" id="card2" onclick={() => move('card2')}>
      <CardTest
        title="TIIIITEL"
        description="Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description "
      />
    </button>
  </div>
  <div class="card-container">
    <button class="card" id="card3" onclick={() => move('card3')}>
      <CardTest
        title="TIIIITEL"
        description="Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description "
      />
    </button>
  </div>
  <div class="card-container">
    <button class="card" id="card4" onclick={() => move('card4')}>
      <CardTest
        title="TIIIITEL"
        description="Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description "
      />
    </button>
  </div>
  <div class="card-container">
    <button class="card" id="card5" onclick={() => move('card5')}>
      <CardTest
        title="TIIIITEL"
        description="Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description "
      />
    </button>
  </div>
</div>

<style>
  .card-container {
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
  .card {
    position: absolute;
    top: 0;
    left: 0;

    box-sizing: border-box;
    height: 100%;
    flex-basis: calc(33.33% - 1rem);
    transition:
      transform 0.3s ease-in-out,
      box-shadow 0.3s ease-in-out,
      border-width 0.3s ease-in-out,
      rotate 0.3s ease-in-out;
  }
  .card-container:last-child {
    flex: 1 0 50%;
  }
  .card:hover {
    z-index: 1;
    cursor: pointer;
    transform: scale(1.05);
    rotate: 3deg;
  }
  .card-container:nth-child(even):hover .card {
    rotate: -3deg;
  }
  .card-container:hover ~ .card-container {
    transform: translateX(5vw);
    transition: ease-in-out 0.3s;
  }
</style>
