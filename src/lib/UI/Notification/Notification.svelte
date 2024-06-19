<script lang="ts">
  import ManagerSvg from './NotificationSVG.svelte';
  import Happy from './Manager/Happy.svelte';
  import Mad from './Manager/Mad.svelte';
  import Unhappy from './Manager/Unhappy.svelte';
  import Evil from './Manager/Evil.svelte';
  import ManagerLogStateSvelte, { type IManagerLog } from '$lib/States/ManagerLogState.svelte';


  let managerLogs = $state([]) as IManagerLog[];


  $effect(() => {
    managerLogs = ManagerLogStateSvelte.ManagerLogsState.logs;

  });
    

  /*name={managerLogs[0].title}
    icon={Happy}
    message={managerLogs[0].message}*/
</script>

<div class="size-full">
  <ManagerSvg
    
    name={managerLogs?.[0]?.title ?? 'No Logs'}
    icon={Happy}
    message={managerLogs?.[0]?.message ?? 'There are no logs available.'}
  />
</div>
