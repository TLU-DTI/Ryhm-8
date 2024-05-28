<script lang="ts">
  let {handleRoundReset}: {handleRoundReset: () => void} = $props();
</script>

<div class="flex size-full items-center justify-center">
  <button class="EndTurnButton pb-2 pl-4 pr-4 pt-2 text-center text-3xl font-extrabold" onclick="{handleRoundReset}">
    Finish the turn
  </button>
</div>

<style>
  .EndTurnButton {
    background-color: var(--endturn-color-active);
    -webkit-text-stroke: 1px #000000;

    border-radius: var(--endturn-border-radius);
    border-width: 0.2rem;
    border-color: white;

    box-shadow: 0px 0.4rem var(--endturn-color-active);

    color: var(--text-normal-color);
  }
</style>
