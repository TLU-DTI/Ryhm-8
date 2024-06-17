<script lang="ts">
  import SimpleBar from '$lib/Components/SimpleBar.svelte';
  import RiskLogs, { type IRiskLog } from '$lib/States/RiskLogState.svelte';
  import { onMount } from 'svelte';
  import RiskLogSvg from './RiskLogSVG.svelte';
  import SaveGameState from '$lib/States/GameState.svelte';

  let logs = $state([]) as IRiskLog[];

  
  onMount(()=>{
    logs = RiskLogs.RiskLogsState.logs;
    ((SaveGameState.SaveGameState().loadGame()?.logs) ?? []).forEach(object => {
      RiskLogs.RiskLogsState.addLog(object);
    });
  })

  $effect(() => {
    logs = RiskLogs.RiskLogsState.logs;
    /*setInterval(() => {
      RiskLogs.RiskLogsState.addLog({
        attributes: {
          cost: 10,
          quality: 5,
          scope: 3,
          time: 2
        },
        category: 'Management',
        respond: 'Mitigate',
        title: 'Risk Log'
      });
    }, 1e3);*/
  });
</script>

<div class="size-full content-center text-center">
  <RiskLogSvg>
    <SimpleBar>
      <div class="bg-black">
        {#each logs as log}
          <ul class="bg-white">
            <li>Risk: {log.title}</li>
            <li>Categroy: {log.category}</li>
            <li>Mitigation: {log.respond}</li>
          </ul>
        {/each}
      </div>
    </SimpleBar>
  </RiskLogSvg>
</div>
