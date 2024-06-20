<script>
  import { writable } from 'svelte/store';
  import CreditSVG from './CreditSVG.svelte';

  let isPopupOpen = writable(false);

  function openPopup() {
    isPopupOpen.set(true);
  }

  function closePopup() {
    isPopupOpen.set(false);
  }

  const credits = [
    { name: 'Hugo Luca Tigane', role: 'Project Manager, Programmer' },
    { name: 'Jan-Erich Sigur', role: 'Programmer' },
    { name: 'Germo Tael', role: 'Programmer' },
    { name: 'Madis Valliste', role: 'Programmer' },
    { name: 'Kaspar Merisalu', role: 'Programmer' },
    { name: 'Kadir Alp Yalti', role: 'Designer' }
  ];
</script>

<div class="size-full content-center text-center">
  <button type="button" class="credits-button" on:click={openPopup}>
    <CreditSVG />
  </button>
</div>

{#if $isPopupOpen}
  <div class="popup-overlay" role="dialog" aria-modal="true" tabindex="0" on:click={closePopup}>
    <div class="popup" role="document" on:click|stopPropagation tabindex="0">
      <h2>Credits</h2>
      <div class="content">
        <div class="credits-grid">
          <div class="makers-column">
            <h3>Makers</h3>
            <ul class="makers-list">
              {#each credits as credit}
                <li>{credit.name}</li>
              {/each}
            </ul>
          </div>
          <div class="roles-column">
            <h3>Roles</h3>
            <ul class="roles-list">
              {#each credits as credit}
                <li>{credit.role}</li>
              {/each}
            </ul>
          </div>
        </div>
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

  .content {
    width: 100%;
  }

  .credits-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-top: 1rem;
  }

  .makers-column,
  .roles-column {
    flex: 1;
  }

  .makers-column h3,
  .roles-column h3 {
    color: #F7FFEC;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  .makers-list,
  .roles-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    text-align: left;
  }

  .makers-list li,
  .roles-list li {
    margin: 0.5rem 0;
    font-size: 1rem;
    color: #F3EDF7; 
  }

  .close-button {
    background: #67FF7D; 
    border: 3px solid #BDF8C7;
    color: #282844;
    font-size: 1rem;
    cursor: pointer;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    margin-top: 1rem;
    transition: background-color 0.3s ease;
    outline: none; 
  }

  .close-button:hover {
    background-color: #5aeb71; 
  }
</style>
