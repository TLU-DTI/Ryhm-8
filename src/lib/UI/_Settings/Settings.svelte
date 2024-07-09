<script>
  import SettingsSVG from './SettingsSVG.svelte';

  let isPopupOpen = $state(false);
  let volume = $state(50);
  let soundEffectsVolume = $state(50);

  // Sets popup visibility to true
  function openPopup() {
    isPopupOpen = true;
  }

  // Sets popup visibility to false
  function closePopup() {
    isPopupOpen = false;
  }
</script>

<div class="size-full content-center text-center">
  <button type="button" class="settings-button" onclick={openPopup}><SettingsSVG /></button>
</div>

{#if isPopupOpen}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <div
    class="popup-overlay"
    role="dialog"
    aria-modal="true"
    tabindex="0"
    onclick={closePopup}
    onkeydown={(e) => {
      if (e.key === 'Escape') closePopup();
    }}
  >
    <div class="popup" role="document" onclick={(e) => e.stopPropagation()} tabindex="0">
      <h2>Settings</h2>
      <div class="content">
        <div class="volume-control">
          <label for="volume">Music Volume</label>
          <div class="slider-container">
            <input type="range" id="volume" min="0" max="100" bind:value={volume} class="slider" />
            <span>{volume}%</span>
          </div>
        </div>
        <div class="volume-control">
          <label for="sound-effects-volume">Sound Effects Volume</label>
          <div class="slider-container">
            <input
              type="range"
              id="sound-effects-volume"
              min="0"
              max="100"
              bind:value={soundEffectsVolume}
              class="slider"
            />
            <span>{soundEffectsVolume}%</span>
          </div>
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

  .settings-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }

  .settings-button:focus {
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

  .volume-control {
    margin-bottom: 1.5rem;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .volume-control label {
    margin-bottom: 0.5rem;
    font-size: 1rem;
    color: #555;
    font-weight: bold;
  }

  .slider-container {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .slider {
    flex: 1;
    margin: 0 1rem;
    width: calc(100% - 60px);
  }

  span {
    min-width: 50px;
    font-size: 0.875rem;
    color: #777;
    font-weight: bold;
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
