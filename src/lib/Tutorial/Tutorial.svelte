<script>
  import TutorialBtn from '../../routes/TutorialBtn.svelte';

  let isPopupOpen = $state(false);
</script>

<div class="size-full content-center text-center">
  <button type="button" class="tutorial-button size-full" onclick={() => (isPopupOpen = true)}>
    <TutorialBtn />
  </button>
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
    onclick={() => (isPopupOpen = false)}
  >
    <div class="popup" role="document" onclick={(e) => e.stopPropagation()} tabindex="0">
      <h2>Tutorial</h2>
      <div class="content">
        <div class="tutorial-grid">
          <div class="tutorial-column">
            <h3>Premise</h3>
            <p>
              You are put into the shoes of a project risk manager. Your goal is to successfully
              manage the risks, by utilizing the cards given to you.
            </p>
          </div>
          <div class="tutorial-column">
            <h3>How to Play?</h3>
            <p>
              In the middle of the screen there are 1-5 risk cards, that need to be dealt with. The
              amount of risks increases as the game goes on, so be careful.
            </p>
            <br />
            <p>
              During each turn you get new "ideas" on how to manage the risks, we'll call them
              "Action cards". Your responsibility is to use the action cards to manage the risks, by
              dragging them on top of the risk card you wish to mitigate.
            </p>
            <br />
            <p>
              If any of your projects objectives fall below 25%, you'll lose. So keep a watchful eye
              them.
            </p>
            <br />
            <p>
              If you see, that you shouldn't take any action just press on the finish turn button
              and go on to the next round.
            </p>
            <br />
            <h1 class="font-bold">The rest is up to you, to figure out!</h1>
          </div>
        </div>
      </div>
      <button type="button" class="close-button" onclick={() => (isPopupOpen = false)}>Close</button
      >
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

  .tutorial-button {
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
    border: 3px solid #40406b;
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
    color: #f3edf7;
  }

  h2 {
    margin: 0 0 1rem;
    font-size: 1.5rem;
    color: #f7ffec;
    text-align: center;
  }

  .content {
    width: 100%;
  }

  .tutorial-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-top: 1rem;
  }

  .close-button {
    background: #67ff7d;
    border: 3px solid #bdf8c7;
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
