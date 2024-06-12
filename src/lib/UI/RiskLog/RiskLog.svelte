<script lang="ts">
  import SimpleBar from '$lib/Components/SimpleBar.svelte';
  import RiskLogs, { type IRiskLog } from '$lib/States/RiskLogState.svelte';
  import RiskLogSvg from './RiskLogSVG.svelte';

  let logs = $state([]) as IRiskLog[];

  $effect(() => {
    logs = RiskLogs.RiskLogsState.logs;
    setInterval(() => {
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
    }, 1e3);
  });
</script>

<div class="size-full content-center text-center">
  <RiskLogSvg>
    <SimpleBar>
      <div class="bg-black">
        {#each logs as log}
          <p class="text-white">{JSON.stringify(log)}</p>
        {/each}
      </div>
    </SimpleBar>
  </RiskLogSvg>
</div>
