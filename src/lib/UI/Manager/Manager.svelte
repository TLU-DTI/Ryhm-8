<script lang="ts">
  import SimpleBar from '$lib/Components/SimpleBar.svelte';
  import SaveGameState from '$lib/States/GameState.svelte';
  import ManagerLogs, { type IManagerLog } from '$lib/States/ManagerLogState.svelte';
  import { onMount } from 'svelte';
  import ManagerLogSvg from './ManagerLogSVG.svelte';
  import MitigateCards from '$lib/Cards/MitigationCards.svelte';

  let logs = $state([]) as IManagerLog[];

  onMount(()=>{
    logs = ManagerLogs.ManagerLogsState.logs;
    ((SaveGameState.SaveGameState().loadGame()?.manager) ?? []).forEach(object => {
      ManagerLogs.ManagerLogsState.addLog(object);
    });
  })

  $effect(() => {
    logs = ManagerLogs.ManagerLogsState.logs;
    setInterval(() => {
      ManagerLogs.ManagerLogsState.addLog({
        message: 'You are fired!!!',
        title: 'Welcome!',
        name: 'Joel'
      });
    }, 1e3);
  });

  if (MitigateCards.MitigatCardState.getRandomCard().rng) {
      console.log('1');
      if (MitigateCards.MitigatCardState.getRandomCard().id == 'MT07') {
      console.log('1');
    }
    else if  (MitigateCards.MitigatCardState.getRandomCard().id == 'MT08') {
      console.log('1');
    }
    else if (MitigateCards.MitigatCardState.getRandomCard().id == 'MT09') {
      console.log('1');
    }
    else if (MitigateCards.MitigatCardState.getRandomCard().id == 'MT11') {
      console.log('1');
    }
    else if (MitigateCards.MitigatCardState.getRandomCard().id == 'MT13') {
      console.log('1');
    }
    else if (MitigateCards.MitigatCardState.getRandomCard().id == 'MT14') {
      console.log('1');
    }
    else if (MitigateCards.MitigatCardState.getRandomCard().id == 'MT15') {
      console.log('1');
    }
    else if (MitigateCards.MitigatCardState.getRandomCard().id == 'MC08') {
      console.log('1');
    }
    else if (MitigateCards.MitigatCardState.getRandomCard().id == 'ME02') {
      console.log('1');
    }
    else if (MitigateCards.MitigatCardState.getRandomCard().id == 'ME03') {
      console.log('1');
    }
    else if (MitigateCards.MitigatCardState.getRandomCard().id == 'ME04') {
      console.log('1');
    }
    else if (MitigateCards.MitigatCardState.getRandomCard().id == 'ME06') {
      console.log('1');
    }
    else if (MitigateCards.MitigatCardState.getRandomCard().id == 'ME12') {
      console.log('1');
    }
    }



</script>

<div class="size-full content-center text-center">
  <ManagerLogSvg>
    <SimpleBar>
      <div class="bg-black">
        {#each logs as log}
          <ul class="bg-white">
            <li>{log.title}</li>
            <li>{log.name}</li>
            <li>{log.message}</li>
          </ul>
        {/each}
      </div>
    </SimpleBar>
  </ManagerLogSvg>
</div>