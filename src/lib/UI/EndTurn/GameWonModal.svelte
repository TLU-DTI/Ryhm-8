<script>
  import { goto } from '$app/navigation'; 
  const { show } = $props();


  function goToMainMenu() {
    goto('/main');

    setTimeout(() => {
      window.location.reload();
    }, 100); 
  }
</script>

{#if show}
  <div class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h2>You Win!</h2>
      </div>
      <div class="modal-body">
        <p>Congratulations! You have successfully managed all challenges.</p>
      </div>
      <div class="modal-footer">
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
    background: #f0f0f0;
    padding: 2rem;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    animation: fadeIn 0.3s ease-in-out;
    max-width: 400px; /* Adjust width as needed */
    width: 100%;
  }

  .modal-header {
    margin-bottom: 1rem;
  }

  .modal-header h2 {
    margin: 0;
    font-size: 2rem;
    color: #ff0000;
  }

  .modal-body {
    margin-bottom: 1.5rem;
  }

  .modal-footer {
    display: flex;
    justify-content: space-around;
  }

  .main-menu-button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

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
