<script lang="ts">
  import SimpleBar from '$lib/Components/SimpleBar.svelte';
  import ManagerLogs, { type IManagerLog } from '$lib/States/ManagerLogState.svelte';
  import ManagerLogSvg from './ManagerLogSVG.svelte';

  let logs = $state([]) as IManagerLog[];

  $effect(() => {
    logs = ManagerLogs.ManagerLogsState.logs;
    setInterval(() => {
      ManagerLogs.ManagerLogsState.addLog({
        message: 'You are fired!!!',
        title: 'A messeage from the boss:'
      });
    }, 1e3);
  });
</script>

<div class="size-full content-center text-center">
  <ManagerLogSvg>
    <SimpleBar>
      <div class="bg-black">
        {#each logs as log}
          <ul class="bg-white">
            <li>{log.title}</li>
            <li>{log.message}</li>
          </ul>
        {/each}
      </div>
    </SimpleBar>
  </ManagerLogSvg>
</div>