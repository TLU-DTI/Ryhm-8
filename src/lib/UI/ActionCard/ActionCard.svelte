<script lang="ts">
  import SimpleBar from '$lib/Components/SimpleBar.svelte';
  import CardTest from './CardTest.svelte';

  let {id, handleClick, disabled}: {id: string, handleClick: (id: string) => void, disabled?: boolean} = $props();
</script>

<div class="size-full">
  <SimpleBar>
    <div class="flex gap-4 text-center">

      {#if disabled}
      <div class="size-60">
        <CardTest />
      </div>
      <div class="size-60">
        <CardTest />
      </div>
      <div class="size-60">
        <CardTest />
      </div>
      <div class="size-60">
        <CardTest />
      </div>

      {:else}
      <button class="button-overlay" id="card1" onclick={() => handleClick("card1")}>
        <div class="size-60">
          <CardTest />
        </div>
      </button>
      <button class="button-overlay" id="card2" onclick={() => handleClick("card2")}>
        <div class="size-60">
          <CardTest />
        </div>
      </button>
      <button class="button-overlay" id="card3" onclick={() => handleClick("card3")} >
        <div class="size-60">
          <CardTest />
        </div>
      </button>
      <button class="button-overlay" id="card4" onclick={() => handleClick("card4")}>
        <div class="size-60">
          <CardTest />
        </div>
      </button>
      {/if}
    </div>
  </SimpleBar>
</div>
