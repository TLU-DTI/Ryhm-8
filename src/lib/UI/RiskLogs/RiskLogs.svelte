<script lang="ts">
  import SimpleBar from '$lib/Components/SimpleBar.svelte';
  import { Engine } from '$lib/Engine';
  import { RiskLog } from '$lib/Engine/risklog.svelte';
  import { onMount } from 'svelte';
  import RiskLogComponent from './RiskLog/RiskLog.svelte';
  import RiskLogsSvg from './RiskLogsSVG.svelte';

  Engine.event.emit('component-status', {
    name: 'RiskLog',
    status: 'Loading'
  });

  onMount(() => {
    Engine.event.emit('component-status', {
      name: 'RiskLog',
      status: 'Ready'
    });
  });

  let logs: RiskLog[] = $derived(Engine.risklog.riskLogs);
</script>

<div class="size-full content-center text-center">
  <RiskLogsSvg>
    <SimpleBar>
      <div class="flex flex-col gap-4">
        {#each logs as log}
          <RiskLogComponent
            risk={log.title}
            mitigate={log.respond}
            category={log.category}
            impact={log.impact}
            color={log.color}
          />
        {/each}
      </div>
    </SimpleBar>
  </RiskLogsSvg>
</div>
