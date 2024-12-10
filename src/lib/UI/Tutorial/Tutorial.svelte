<script>
  import { Category, Engine } from '$lib/Engine/';
  import { Notification as Noti } from '$lib/Engine/notification.svelte';
  import { RiskLog } from '$lib/Engine/risklog.svelte';
  import Notification from '$lib/UI/Notification/Notification.svelte';
  import { onMount } from 'svelte';

  let tutorial = $derived(Engine.tutorial.tutorial);
  let stage = $derived(Engine.tutorial.stage);

  function notiBack() {
    Engine.tutorial.stage = -1;
  }

  function notiNext() {
    Engine.tutorial.stage = +1;
  }

  function notiClose() {
    window.location.href = '.';
  }

  onMount(() => {
    Engine.risklog.add(
      new RiskLog('Pandemic', Category.External, 'Crisis Communication Planning', {
        scope: 5,
        cost: 0,
        quality: 5,
        time: 0
      })
    );

    Engine.risklog.add(
      new RiskLog('Ignoring stakeholders', Category.Management, 'PR Campaign', {
        scope: 0,
        cost: -10,
        quality: 0,
        time: -10
      })
    );

    Engine.risklog.add(
      new RiskLog('Vendor Fails', Category.Commercial, 'Pay', {
        scope: 2,
        cost: 0,
        quality: 2,
        time: 0
      })
    );

    setTimeout(() => {
      Engine.riskhand.createHand(3);
    }, 1e3);

    setTimeout(() => {
      Engine.timeline.next();
      Engine.timeline.next();
      Engine.timeline.next();
      Engine.timeline.next();
      Engine.timeline.next();
      Engine.timeline.next();
      Engine.timeline.next();
      Engine.timeline.next();
      Engine.timeline.next();
      Engine.timeline.next();
    }, 1e3);
  });
</script>

{#if tutorial}
  {#if stage == 0}
    <div class="osd absolute z-10 h-full w-full">
      <div class="relative left-[50%] top-[50%] w-[40vw] -translate-x-1/2 -translate-y-1/2">
        <Notification
          notiBack={notiClose}
          {notiNext}
          noti={new Noti(
            'Manager',
            'Welcome to Mitigate Online! This is a Tutorial, do start click Next.',
            'Happy'
          )}
        />
      </div>
    </div>
  {:else if stage == 1}
    <div class="absolute z-10 h-full w-full">
      <div class="asd fixed left-[0px] top-[0px] z-20 block h-[54vh] w-[22vw]"></div>
      <div class="fixed left-[24vw] top-[10vh] z-20 w-[30vw]">
        <Notification
          {notiBack}
          {notiNext}
          noti={new Noti(
            'Manager',
            "This is the <b>Objectives</b> panel; it shows statistic about your current project. If any of them go to the red, then your project has failed and it's game over.",
            'Happy'
          )}
        />
      </div>
    </div>
  {:else if stage == 2}
    <div class="absolute z-10 h-full w-full">
      <div class="asd fixed left-[0px] top-[50vh] z-20 block h-[53vh] w-[21vw]"></div>
      <div class="fixed left-[24vw] top-[50vh] z-20 w-[30vw]">
        <Notification
          {notiBack}
          {notiNext}
          noti={new Noti(
            'Manager',
            'This is the <b>Risk Log</b>. Any actions that you have taken will show here.',
            'Happy'
          )}
        />
      </div>
    </div>
  {:else if stage == 3}
    <div class="absolute z-10 h-full w-full">
      <div class="asd fixed left-[2vw] top-[58vh] z-20 block h-[9vh] w-[16vw]"></div>
      <div class="fixed left-[20vw] top-[50vh] z-20 w-[30vw]">
        <Notification
          {notiBack}
          {notiNext}
          noti={new Noti(
            'Manager',
            'Here you can see 1 log; on top left is the Risk Card <b>name</b>; on top right is the Risk Card <b>category</b>; on the bottom left is the <b>response</b>; and on the bottom right is the <b>impact</b>.',
            'Happy'
          )}
        />
      </div>
    </div>
  {:else if stage == 4}
    <div class="absolute z-10 h-full w-full">
      <div class="asd fixed left-[32vw] top-[0vh] z-20 block h-[12vh] w-[36vw]"></div>
      <div class="fixed left-[34vw] top-[20vh] z-20 w-[30vw]">
        <Notification
          {notiBack}
          {notiNext}
          noti={new Noti(
            'Manager',
            'This is the Project Timeline, there are 4 stages; if you manage to get to the end without any of the objectives going to the red, you win.',
            'Happy'
          )}
        />
      </div>
    </div>
  {:else if stage == 5}
    <div class="absolute z-10 h-full w-full">
      <div class="asd fixed left-[25vw] top-[11vh] z-20 block h-[48vh] w-[50vw]"></div>
      <div class="fixed left-[34vw] top-[64vh] z-20 w-[30vw]">
        <Notification
          {notiBack}
          {notiNext}
          noti={new Noti(
            'Manager',
            'Here you see risks that you have to deal with; after every project stage, you start to get more and more risks.',
            'Happy'
          )}
        />
      </div>
    </div>
  {:else if stage == 6}
    <div class="absolute z-10 h-full w-full">
      <div class="asd fixed left-[31vw] top-[60vh] z-20 block h-[40vh] w-[38vw]"></div>
      <div class="fixed left-[34vw] top-[25vh] z-20 w-[30vw]">
        <Notification
          {notiBack}
          {notiNext}
          noti={new Noti(
            'Manager',
            'Here are your Action Cards you can use to mitigate risks.',
            'Happy'
          )}
        />
      </div>
    </div>
  {:else if stage == 7}
    <div class="pointer-events-none absolute z-10 h-full w-full">
      <div class="asd fixed left-[25vw] top-[11vh] z-20 block h-[89vh] w-[50vw]"></div>
      <div class="pointer-events-auto fixed left-[70vw] top-[40vh] z-20 w-[30vw]">
        <Notification
          {notiBack}
          {notiNext}
          noti={new Noti(
            'Manager',
            'Do mitigate the risk; <b>drag</b> the Action Card to the Risk Card.',
            'Happy'
          )}
        />
      </div>
    </div>
  {:else if stage == 8}
    <div class="absolute z-10 h-full w-full">
      <div class="asd fixed left-[75vw] top-[13vh] z-20 block h-[30vh] w-[25vw]"></div>
      <div class="fixed left-[39vw] top-[15vh] z-20 w-[30vw]">
        <Notification
          {notiBack}
          {notiNext}
          noti={new Noti('Manager', 'Here you see any notifications you have.', 'Happy')}
        />
      </div>
    </div>
  {:else if stage == 9}
    <div class="absolute z-10 h-full w-full">
      <div class="asd fixed left-[80vw] top-[82vh] z-20 block h-[10vh] w-[15vw]"></div>
      <div class="fixed left-[50vw] top-[50vh] z-20 w-[30vw]">
        <Notification
          {notiBack}
          {notiNext}
          noti={new Noti(
            'Manager',
            'You can finish the turn at any time. Leaving risk on the board means you accept them.',
            'Happy'
          )}
        />
      </div>
    </div>
  {:else if stage == 10}
    <div class="osd absolute z-10 h-full w-full">
      <div class="relative left-[50%] top-[50%] w-[40vw] -translate-x-1/2 -translate-y-1/2">
        <Notification
          {notiBack}
          notiNext={() => {
            window.location.href = 'game';
          }}
          noti={new Noti('Manager', "That's it. Now click next to go to the game.", 'Happy')}
        />
      </div>
    </div>
  {/if}
{/if}

<style>
  .asd {
    box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.7);
  }

  .osd {
    background-color: rgba(0, 0, 0, 0.7);
  }
</style>
