<script lang="ts">
  import SimpleBar from '$lib/Components/SimpleBar.svelte';
  import { Engine } from '$lib/Engine';
  import { onMount } from 'svelte';
  import { Notification } from '$lib/Engine/notification.svelte';
  import BackButton from './BackButton.svelte';
  import NextButton from './NextButton.svelte';

  Engine.event.emit('component-status', {
    name: 'Notification',
    status: 'Loading'
  });

  onMount(() => {
    Engine.event.emit('component-status', {
      name: 'Notification',
      status: 'Ready'
    });
  });

  let notifictions: Notification[] | undefined = $state();

  let index: number = $state(0);

  $effect(() => {
    if (notifictions?.length) {
      index = notifictions.length - 1;
    } else {
      index = 0;
    }
  });

  $effect(() => {
    notifictions = Engine.notification.notifications;
  });

  function backButton() {
    index = (index - 1 + notifictions!.length) % notifictions!.length;
  }

  function nextButton() {
    index = (index + 1) % notifictions!.length;
  }

  setTimeout(() => {
    Engine.notification.add(new Notification('Manager', '1', 'Happy'));
  });

  setTimeout(() => {
    Engine.notification.add(new Notification('Manager', '3', 'UnHappy'));
    Engine.notification.add(
      new Notification(
        'Manager',
        'lorem ipsum dolorlorem ipsum dolorlorem ipsum dolorlorem ipsum dolorlorem ipsum dolorlorem ipsum dolorlorem ipsum dolorlorem ipsum dolorlorem ipsum dolorlorem ipsum dolorlorem ipsum dolorlorem ipsum dolorlorem ipsum dolorlorem ipsum dolorlorem ipsum dolorlorem ipsum dolorlorem ipsum dolorlorem ipsum dolorlorem ipsum dolorlorem ipsum dolorlorem ipsum dolorlorem ipsum dolorlorem ipsum dolorlorem ipsum dolorlorem ipsum dolorlorem ipsum dolorlorem ipsum dolorlorem ipsum dolorlorem ipsum dolorlorem ipsum dolorlorem ipsum dolorlorem ipsum dolorlorem ipsum dolorlorem ipsum dolorlorem ipsum dolorlorem ipsum dolor',
        'Evil'
      )
    );
  }, 2e3);
</script>

{#if notifictions}
  {@const { name, message, icon } = notifictions[index]}
  <svg
    id="Manager"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 428.25 215.31"
    style="height: inherit; width: inherit;"
  >
    <rect
      x="34.98"
      y="2"
      width="391.28"
      height="183.41"
      rx="8.4"
      ry="8.4"
      fill="#282844"
      stroke="#6e78b3"
      stroke-miterlimit="10"
      stroke-width="4"
    />

    <foreignObject x="140" y="10" width="280" height="170">
      <SimpleBar>
        <div class="select-none font-['Lato'] text-white">
          <span class="mr-1 font-['Changa_One'] text-xl">{name}:</span>
          {message}
        </div>
      </SimpleBar>
    </foreignObject>

    <foreignObject x="0" y="5" width="140" height="220">
      <div class="">
        <svelte:component this={icon} />
      </div>
    </foreignObject>

    {#if notifictions.length > 1}
      <foreignObject x="320" y="-4" width="70" height="22">
        <div class="size-full text-center">
          <p class="select-none font-['Lato'] text-white">{index + 1}/{notifictions.length}</p>
        </div>
      </foreignObject>

      <foreignObject x="230" y="180" width="90" height="34">
        <div class="size-full select-none">
          <button class="absolute left-1/4 h-full w-1/2" onclick={backButton}> </button>
          <BackButton />
        </div>
      </foreignObject>

      <foreignObject x="300" y="180" width="90" height="34">
        <div class="size-full select-none">
          <button class="absolute left-1/4 h-full w-1/2" onclick={nextButton}> </button>
          <NextButton />
        </div>
      </foreignObject>
    {/if}
  </svg>
{/if}
