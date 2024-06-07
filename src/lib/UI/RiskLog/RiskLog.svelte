<script lang="ts">
  import SimpleBar from '$lib/Components/SimpleBar.svelte';
  import RiskLogSvg from './RiskLogSVG.svelte';

  let logs = $state(['Risk Logs', 'Risk Logs']);

  setInterval(() => {
    logs.push('Risk Logs');
  }, 1e3);
</script>

<div class="size-full content-center text-center">
  <RiskLogSvg>
    <SimpleBar>
      <div class="bg-black">
        {#each logs as log}
          <p class="text-white">{log}</p>
        {/each}
      </div>
    </SimpleBar>
  </RiskLogSvg>
</div>
