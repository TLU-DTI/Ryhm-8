<script lang="ts">
  import SimpleBar from '$lib/Components/SimpleBar.svelte';

  let logs = $state(['Risk Logs', 'Risk Logs']);

  setInterval(() => {
    logs.push('Risk Logs');
  }, 1e3);
</script>

<div class="relative size-full content-center text-center">
  <SimpleBar>
    <div>
      {#each logs as log}
        <p>{log}</p>
      {/each}
    </div>
  </SimpleBar>
</div>
