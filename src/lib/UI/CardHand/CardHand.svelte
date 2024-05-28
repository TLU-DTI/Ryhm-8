<script>
  import { selectedCard } from '../../../stores.js';
  import CardTest from '../ActionCard/CardTest.svelte';
  import LastRisk from '../ActionCard/LastRisk.svelte';

  // Subscring to store updates
  let componentToShow = $derived($selectedCard);
  
  
</script>

<div class="size-full content-center text-center">
  {#if componentToShow === 'CardTest'}
    <CardTest />
    {console.log("Vana")}
  {:else if componentToShow === 'LastRisk'}
    <LastRisk />
    {console.log("Uus")}
  {/if}
  <p>Card Hand</p>
</div>

