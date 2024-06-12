<script>
  import { writable } from 'svelte/store';
  import SettingsSVG from './SettingsSVG.svelte'; // Import the SettingsSVG component


  let isPopupOpen = writable(false);
  let volume = writable(50); // Initial volume set to 50

  function openPopup() {
    isPopupOpen.set(true);
  }

  function closePopup() {
    isPopupOpen.set(false);
  }
</script>


<div class="size-full content-center text-center">
  <button type="button" onclick={openPopup}><SettingsSVG /></button>
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
      <h2>Settings</h2>
      <div class="content">
        <div class="volume-control">
          <label for="volume">Volume</label>
          <input 
            type="range" 
            id="volume" 
            min="0" 
            max="100" 
            bind:value={$volume}
          />
          <span>{$volume}%</span>
        </div>
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
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 80%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 50vh; /* Ensure popup has enough height for vertical alignment */
  }

  h2 {
    margin: 0;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }

  .volume-control {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 1rem 0;
  }

  .volume-control label {
    margin-right: 1rem;
  }

  .volume-control input[type="range"] {
    flex: 1;
    margin: 0 1rem;
  }

  button {
    cursor: pointer;
  }

  span {
    min-width: 50px;
  }

  .close-button {
    background: none;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 1rem; /* Add margin to separate it from content */
  }

</style>
