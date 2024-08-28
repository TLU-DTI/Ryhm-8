<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    showModal = $bindable(false),
    children
  }: {
    showModal: boolean;
    children: Snippet;
  } = $props();
</script>

{#if showModal}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <div
    class="popup-overlay"
    role="dialog"
    aria-modal="true"
    tabindex="0"
    onclick={() => (showModal = false)}
  >
    <div class="size-auto" role="document" onclick={(e) => e.stopPropagation()}>
      {@render children()}
    </div>
  </div>
{/if}

<style>
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 4;
  }
</style>
