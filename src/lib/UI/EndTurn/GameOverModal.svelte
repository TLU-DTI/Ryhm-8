<script>
  import { goto } from '$app/navigation'; // Correct import for navigation
  const { show } = $props();

  function goToMainMenu() {
    // Reload the page and navigate to the main menu
    window.location.href = '/main';
  }
</script>

{#if show}
  <div class="modal-overlay">
    <div class="modal-content">
      <h2>Game Over</h2>
      <p>You have lost the game.</p>
      <button on:click={goToMainMenu}>Main Menu</button>
    </div>
  </div>
{/if}

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  .modal-content {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    animation: fadeIn 0.3s ease-in-out;
  }
  .modal-content h2 {
    margin-bottom: 1rem;
    font-size: 2rem;
    color: #ff0000;
  }
  .modal-content p {
    margin-bottom: 2rem;
    font-size: 1.2rem;
  }
  .modal-content button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  .modal-content button:hover {
    background-color: #45a049;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
</style>
