<script>
  import ManagerSvg from './NotificationSVG.svelte';
  import Happy from './Manager/Happy.svelte';
  import Mad from './Manager/Mad.svelte';
  import Unhappy from './Manager/Unhappy.svelte';
  import Evil from './Manager/Evil.svelte';
</script>

<div class="size-full">
  <ManagerSvg
    name="Manager"
    icon={Happy}
    message="Lorem ipsum dolor sit amet consectetur,
      adipisicing elit. Necessitatibus, est. Facilis doloremque officiis voluptatibus eveniet quia quas,
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum dignissimos rem iusto nostrum nemo
      asperiores maxime pariatur quae sapiente eius, laboriosam ut officiis doloremque. Officia, eius
      deleniti? Sint, animi beatae!"
  />
</div>
