<script lang="ts">
  import Credit from '$lib/UI/Credits/Credit.svelte';
  import Logo from '$lib/UI/Main/Logo.svelte';
  import Start from '$lib/UI/Main/Start.svelte';
  import Tutorial from '$lib/UI/Tutorial/Tutorial.svelte';
  import Version from '../../version?raw';

  const handleStartClick = () => {
    window.location.href = '/game';
  };
</script>

<div class="wrapper flex-col">
  <div class="mt-12 w-[700px]">
    <Logo />
  </div>
  <div class="mt-12 flex h-[60vh] flex-col content-center justify-center gap-4">
    <button class="w-44" onclick={handleStartClick}>
      <Start />
    </button>
    <div class="w-44">
      <Tutorial />
    </div>
    <div class="w-44">
      <Credit />
    </div>
  </div>
  {Version}
</div>

<style lang="scss">
  .wrapper {
    display: flex;
    align-items: center;
    height: 100vh;
    background: url('/assets/bg/filter.svg'), url('/assets/bg/bg.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
  }
</style>
