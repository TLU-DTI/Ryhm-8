<script lang="ts">
  import SimpleBar from '$lib/Components/SimpleBar.svelte';
  import RiskLogs, { type IRiskLog } from '$lib/States/RiskLogState.svelte';
  import RiskLog from './RiskLog/RiskLog.svelte';
  import RiskLogsSvg from './RiskLogsSVG.svelte';

  let logs = $state([]) as IRiskLog[];

  $effect(() => {
    logs = RiskLogs.RiskLogsState.logs;

    // save function incomplete
    // ((SaveGameState.SaveGameState().loadGame()?.logs) ?? []).forEach(object => {
    //   RiskLogs.RiskLogsState.addLog(object);
    // });
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
