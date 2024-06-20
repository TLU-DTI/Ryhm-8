<script lang="ts">
  import SimpleBar from '$lib/Components/SimpleBar.svelte';
  import RiskLogs, { type IRiskLog } from '$lib/States/RiskLogState.svelte';
  import { onMount } from 'svelte';
  import RiskLogSvg from './RiskLogsSVG.svelte';
  import SaveGameState from '$lib/States/GameState.svelte';
  import RiskLog from './RiskLog/RiskLog.svelte';
  import RiskLogsSvg from './RiskLogsSVG.svelte';

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
        category: 'Commercial',
        respond: 'Mitigate',
        title: 'Risk Log'
      });
    }, 1e3);*/
  });
</script>

<div class="size-full content-center text-center">
  <RiskLogsSvg>
    <SimpleBar>
      <div class="flex flex-col gap-4">
        {#each logs as log}
          <RiskLog
            risk={log.title}
            mitigate={log.respond}
            category={log.category}
            impact="Low"
            color="Plain"
          />
        {/each}
      </div>
    </SimpleBar>
  </RiskLogsSvg>
</div>
