<script lang="ts">
  import CardHand from '$lib/UI/CardHand/CardHand.svelte';
  import EndTurn from '$lib/UI/EndTurn/EndTurn.svelte';
  import MenuRestart from '$lib/UI/Menu/Menu.svelte';
  import ActionCards from '$lib/UI/ActionCards/ActionCards.svelte';
  import Notification from '$lib/UI/Notification/Notification.svelte';
  import Objective from '$lib/UI/Objective/Objective.svelte';
  import RiskLogs from '$lib/UI/RiskLogs/RiskLogs.svelte';
  import Timeline from '$lib/UI/Timeline/Timeline.svelte';
  import { Engine } from '$lib/Engine';
  import Debug from '$lib/UI/Debug/debug.svelte';
  import Drag from '$lib/Components/Drag.svelte';
  import Tutorial from '$lib/UI/Tutorial/Tutorial.svelte';

  let status = $derived(Engine.status);
</script>

{#if status != 'Running' && status != 'Ended'}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <div class="popup-overlay" role="dialog" aria-modal="true" onclick={(e) => e.stopPropagation()}>
    <div class="popup font-['Lato']">
      <h2 class="text-2xl">Loading</h2>
    </div>
  </div>
{/if}

<Tutorial />
<Drag />

<div class="wrapper">
  <div class="flex">
    <!-- Column 1 -->
    <div class="w-[20vw]">
      <div class="relative h-[50vh]">
        <div class="size-full">
          <Objective />
        </div>
      </div>

      <div class="h-[4vh]"></div>

      <div class="relative h-[46vh]">
        <div class="size-full">
          <RiskLogs />
        </div>
      </div>
    </div>

    <!-- Divider -->
    <div class="w-[6vw]">
      <div class="h-[100vh]"></div>
    </div>

    <!-- Column 2 -->
    <div class="w-[48vw]">
      <div class="relative h-[10vh]">
        <div class="size-full">
          <Timeline />
        </div>
      </div>

      <div class="h-[3vh]"></div>

      <div class="relative h-[44vh]">
        <CardHand />
      </div>

      <div class="h-[4vh]"></div>

      <div class="relative h-[39vh]">
        <ActionCards />
      </div>
    </div>

    <!-- Divider -->
    <div class="w-[1vw]">
      <div class="h-[100vh]"></div>
    </div>

    <!-- Column 3 -->
    <div class="w-[25vw]">
      <div class="relative h-[10vh]">
        <MenuRestart />
      </div>

      <div class="h-[6vh]"></div>

      <div class="relative h-[24vh]">
        <div class="size-full">
          <Notification />
        </div>
      </div>

      <div class="h-[42vh]">
        <Debug />
      </div>
      <div class="h-[2vh]"></div>

      <div class="relative flex h-[7vh]">
        <div class="w-[8vw]"></div>
        <EndTurn />
        <div class="w-[8vw]"></div>
      </div>

      <div class="h-[6vh]"></div>
    </div>
  </div>
</div>

<style lang="scss">
  .wrapper {
    background-repeat: no-repeat;
    background-image: url('/assets/bg/filter.svg'), url('/assets/bg/bg.jpg');
    background-size: cover;
  }

  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
  }

  .popup {
    background: #282844;
    border: 3px solid #40406b;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    width: 50%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    color: #f3edf7;
  }
</style>
