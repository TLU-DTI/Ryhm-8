<script lang="ts">
  import SimpleBar from '$lib/Components/SimpleBar.svelte';
  import type { INotificationProps } from '$lib/States/NotificationState.svelte';

  let { name, icon, message }: INotificationProps = $props();
</script>

<svg
  id="Manager"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 428.25 215.31"
  style="height: inherit; width: inherit;"
>
  <rect
    x="34.98"
    y="2"
    width="391.28"
    height="183.41"
    rx="8.4"
    ry="8.4"
    fill="#282844"
    stroke="#6e78b3"
    stroke-miterlimit="10"
    stroke-width="4"
  />
  <foreignObject x="140" y="10" width="280" height="170">
    <SimpleBar>
      <div class="font-['Lato'] text-white">
        <span class="mr-1 font-['Changa_One'] text-xl">{name}:</span>
        {message}
      </div>
    </SimpleBar>
  </foreignObject>

  <foreignObject x="0" y="5" width="140" height="220">
    <div class="">
      <svelte:component this={icon} />
    </div>
  </foreignObject>
</svg>
