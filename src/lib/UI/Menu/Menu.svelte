<script>
  import Modal from '$lib/Components/Modal.svelte';
  import { Engine } from '$lib/Engine';
  import MenuSVG from './MenuSVG.svelte';

  let showModal = $state(false);

  function restartGame() {
    Engine.restart();
  }

  function goToMainMenu() {
    window.location.assign('.');
  }
</script>

<div class="size-full content-center text-center">
  <button class="size-16" onclick={() => (showModal = true)}>
    <MenuSVG />
  </button>
</div>

<Modal bind:showModal>
  <div class="popup font-['Lato']">
    <h2 class="text-lg">Game Menu</h2>
    <div class="mt-4 flex gap-36">
      <button class="button" onclick={restartGame}>Restart</button>
      <button class="button" onclick={goToMainMenu}>Main Menu</button>
    </div>
    <button type="button" class="button" onclick={() => (showModal = false)}>Close</button>
  </div>
</Modal>

<style>
  .popup {
    background: #282844;
    border: 3px solid #40406b;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    color: #f3edf7;
    z-index: 3;
  }

  .button {
    background: #67ff7d;
    border: 3px;
    color: #f7ffec;
    font-size: 1rem;
    cursor: pointer;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    transition: background-color 0.3s ease;
    outline: none;
    font-weight: bold;
    text-shadow:
      -0.5px -0.5px 0 #282844,
      0.5px -0.5px 0 #282844,
      -0.5px 0.5px 0 #282844,
      0.5px 0.5px 0 #282844;
  }

  .button:hover {
    background-color: #58c069;
  }
</style>
