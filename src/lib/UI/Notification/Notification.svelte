<script lang="ts">
  import ManagerSvg from './NotificationSVG.svelte';
  import Happy from './Manager/Happy.svelte';
  // import Mad from './Manager/Mad.svelte';
  // import Unhappy from './Manager/Unhappy.svelte';
  // import Evil from './Manager/Evil.svelte';

  import type { INotification } from '$lib/States/NotificationState.svelte';
  import { getContext } from 'svelte';

  let notifiction = getContext<INotification>('Notification');
</script>

{#if notifiction?.notification}
  <div class="size-full">
    <ManagerSvg name="Manager" icon={Happy} message={notifiction.notification.message} />
  </div>
{/if}
