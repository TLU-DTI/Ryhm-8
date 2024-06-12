<script lang="ts">
  import EndTurn from '$lib/States/EndTurnState.svelte';
  import EndTurnSvg from './EndTurnSVG.svelte';

  $effect(() => {
    setInterval(() => {
      EndTurn.EndTurnState.toggle();
    }, 1e3);
  });
</script>

<button class="flex size-full items-center justify-center">
  <EndTurnSvg />
</button>

<style>
</style>
