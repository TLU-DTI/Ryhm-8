<script>
  import { goto } from '$app/navigation'; 
  const { show } = $props();

  function goToMainMenu() {
    goto('/');

    setTimeout(() => {
      window.location.reload();
    }, 100);
  }

  function restartGame() {
    window.location.reload();
  }
</script>

{#if show}
  <div class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Game Over</h2>
      </div>
      <div class="modal-body">
        <p>You have lost the game.</p>
      </div>
      <div class="modal-footer">
        <button class="restart-button" on:click={restartGame}>Restart</button>
        <button class="main-menu-button" on:click={goToMainMenu}>Main Menu</button>
      </div>
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
    background: #282844;
    padding: 2rem;
    border-radius: 20px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    animation: fadeIn 0.3s ease-in-out;
    max-width: 400px; 
    width: 100%;
    border: 4px solid #40406B; 
  }

  .modal-header {
    margin-bottom: 1rem;
    font-family: "Changa One";
  }

  .modal-header h2 {
    margin: 0;
    font-size: 2rem;
    color: #EA5A3D
  }

  .modal-body {
    margin-bottom: 1.5rem;
    color: #F3EDF7;
  }

  .modal-footer {
    display: flex;
    justify-content: space-around;
  }

  .restart-button,
  .main-menu-button {
    background-color: #67FF7D;
    color: #F7FFEC;
    border: 3px solid #BDF8C7;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-weight: bold;
      text-shadow: 
      -0.5px -0.5px 0 #282844,  
      0.5px -0.5px 0 #282844,
      -0.5px 0.5px 0 #282844,
      0.5px 0.5px 0 #282844;
  }


  .restart-button:hover,
  .main-menu-button:hover {
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
