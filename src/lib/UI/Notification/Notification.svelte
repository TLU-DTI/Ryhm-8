<script lang="ts">
  import ManagerSvg from './NotificationSVG.svelte';
  import Happy from './Manager/Happy.svelte';
  // import Mad from './Manager/Mad.svelte';
  // import Unhappy from './Manager/Unhappy.svelte';
  // import Evil from './Manager/Evil.svelte';

  import type { INotification } from '$lib/States/NotificationState.svelte';
  import { getContext } from 'svelte';

  let notifiction = getContext<INotification>('Notification');

  $effect(() => {
    setInterval(() => {
      notifiction.delNotification();
    }, 0.5e3);

    setInterval(() => {
      notifiction.setNotification({
        name: 'Manager',
        icon: Happy,
        message: 'Hello, Manager!'
      });
    }, 1e3);
  });
</script>

{#if notifiction?.notification}
  <div class="size-full">
    <ManagerSvg name="Manager" icon={Happy} message={notifiction.notification.message} />
  </div>
{/if}
