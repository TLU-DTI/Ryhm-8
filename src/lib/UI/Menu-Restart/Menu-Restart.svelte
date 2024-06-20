<script>
    import { goto } from '$app/navigation'; 
    import MenuRestartSVG from './Menu-RestartSVG.svelte';
    import { writable } from 'svelte/store';
  
    let isPopupOpen = writable(false);
  
    function openPopup() {
      isPopupOpen.set(true);
    }
  
    function closePopup() {
      isPopupOpen.set(false);
    }
  
    function restartGame() {
      window.location.reload();
    }
  
    function goToMainMenu() {
      goto('/');
    }
  </script>
  
  <div class="size-full content-center text-center">
    <button type="button" class="credits-button" on:click={openPopup}>
      <MenuRestartSVG />
    </button>
  </div>
  
  {#if $isPopupOpen}
    <div class="popup-overlay" role="dialog" aria-modal="true" tabindex="0" on:click={closePopup}>
      <div class="popup" role="document" on:click|stopPropagation tabindex="0">
        <h2>Game Menu</h2>
        <div class="buttons-container">
          <button class="menu-button restart-button" on:click={restartGame}>Restart</button>
          <button class="menu-button main-menu-button" on:click={goToMainMenu}>Main Menu</button>
        </div>
        <button type="button" class="close-button" on:click={closePopup}>Close</button>
      </div>
    </div>
  {/if}
  
  <style>
    .size-full {
      width: 100%;
      height: 100%;
    }
  
    .content-center {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    .text-center {
      text-align: center;
    }
  
    .credits-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      outline: none;
      margin: 0 0.5rem;
    }
  
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
    }
  
    .popup {
      background: #282844;
      border: 3px solid #40406B;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
      width: 80%;
      max-width: 600px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      overflow: hidden;
      color: #F3EDF7; 
      
    }
  
    h2 {
      margin: 0 0 1rem;
      font-size: 1.5rem;
      color: #F7FFEC; 
      text-align: center;
    }
  
    .buttons-container {
      display: flex;
      justify-content: space-around;
      width: 100%;
      margin-top: 1rem;
    }
  
    .menu-button {
      background: #67FF7D; 
      border: 3px solid #BDF8C7; 
      color: #F7FFEC;
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
  
    .menu-button:hover {
      background-color: #5aeb71; 
    }
  
    .restart-button {
      background-color: #67FF7D; 
      border-color: #BDF8C7; 
    }
  
    .restart-button:hover {
      background-color: #67FF7D; 
      border-color: #BDF8C7; 
    }
  
    .main-menu-button {
      background-color: #67FF7D; 
      border-color: #BDF8C7; 
    }
  
    .main-menu-button:hover {
      background-color: #67FF7D; 
      border-color: #BDF8C7; 
    }
  
    .close-button {
      background: #67FF7D;
      border: 3px solid #BDF8C7; 
      color: #F7FFEC; 
      cursor: pointer;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      margin-top: 1rem;
      transition: background-color 0.3s ease;
      outline: none;
      font-weight: bold;
      text-shadow: 
      -0.5px -0.5px 0 #282844,  
      0.5px -0.5px 0 #282844,
      -0.5px 0.5px 0 #282844,
      0.5px 0.5px 0 #282844;
    }
  
    .close-button:hover {
      background-color: #5aeb71;
    }
  </style>
  