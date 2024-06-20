<script>
  import { writable } from 'svelte/store';
  import CreditSVG from './CreditSVG.svelte'; 

  let isPopupOpen = writable(false);

  function openPopup() {
    console.log("asd");
    isPopupOpen.set(true);
  }

  function closePopup() {
    isPopupOpen.set(false);
  }
</script>

<div class="size-full content-center text-center">
  <button type="button" class="credits-button" onclick={openPopup}><CreditSVG /></button>
</div>

{#if $isPopupOpen}
  <div 
    class="popup-overlay" 
    role="dialog" 
    aria-modal="true" 
    tabindex="0"
    onclick={closePopup}
    onkeydown={(e) => { if (e.key === 'Escape') closePopup(); }}
  >
    <div 
      class="popup" 
      role="document" 
      onclick={e => e.stopPropagation()}
      tabindex="0"
    >
      <h2>Credits</h2>
      <div class="content">
        <ul class="credits-list">
          <li>Hugo Luca Tigane - roll</li>
          <li>Jan-Erich Sigur - roll</li>
          <li>Germo Tael - roll</li>
          <li>Kadir Alp Yalti - roll</li>
          <li>Madis Valliste - roll</li>
          <li>Kaspar Merisalu - roll</li>        
        </ul>
      </div>
      <button type="button" class="close-button" onclick={closePopup}>Close</button>
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
  }

  .credits-button:focus {
    outline: none;
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
    background: white;
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
  }

  h2 {
    margin: 0 0 1rem;
    font-size: 1.5rem;
    color: #333;
  }

  .content {
    width: 100%;
  }

  .credits-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 100%;
    text-align: center;
  }

  .credits-list li {
    margin: 0.5rem 0;
    font-size: 1rem;
    color: #555;
  }

  .close-button {
    background: #f0f0f0;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    margin-top: 1rem;
    transition: background-color 0.3s ease;
  }

  .close-button:hover {
    background-color: #e0e0e0;
  }
</style>
