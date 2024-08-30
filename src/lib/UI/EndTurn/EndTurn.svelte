<script lang="ts">
  import { Engine } from '$lib/Engine';
  import { TurnStatus } from '$lib/Engine/turn.svelte';
  import { onMount } from 'svelte';
  import EndTurnSvg from './EndTurnSVG.svelte';
  import GameOver from './GameOver.svelte';
  import GameWon from './GameWon.svelte';

  Engine.event.emit('component-status', {
    name: 'EndTurn',
    status: 'Loading'
  });

  onMount(() => {
    Engine.event.emit('component-status', {
      name: 'EndTurn',
      status: 'Ready'
    });
  });

  let turnStatus: TurnStatus = $derived(Engine.turn.status);
  // let active = $derived(
  //   turnStatus === TurnStatus.ONGOING && Engine.riskhand.handCards.length === 0
  // );

  let active = true
</script>

<button
  class="flex size-full select-none items-center justify-center"
  onclick={() => {
    Engine.turn.next();
  }}
  disabled={!active}
>
  <EndTurnSvg {active} />
</button>

{#if turnStatus === TurnStatus.GAMEOVER}
  <GameOver />
{/if}

{#if turnStatus === TurnStatus.GAMEWON}
  <GameWon />
{/if}
