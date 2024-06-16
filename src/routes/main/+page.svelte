<script lang="ts">
  import Settings from '$lib/UI/Settings/Settings.svelte';
</script>


<div id="title-page" class="bg-purple-600 flex wrapper" style="width: 100vw; height: 100vh;">
  <div class="w-[20vw]"></div>
  <div id="title-page" class="flex text-center w-[60vw]" style="relative width: 80vw; relative height: 100vh; justify-content: center; align-items: center; flex-direction: column;">
    <h1 class="header" style="font-size: 5rem; font-weight: bold; margin: 0;">Mitigate Online</h1>
    <a href="/" class="bg-purple-900" style="margin-top: 1rem; font-size: 4rem; padding: 0.5rem 1rem; border-radius: 30%; border: 5px solid black;">Start</a>
  </div>
  <div class="w-[20vw] text-center">
      <div class="h-[85vh]">
          <br/>
          <a href="/tutorial" class="bg-purple-900" style="margin-top: 1rem; font-size: 4rem; padding: 1rem 0.5rem; border-radius:20%; border: 5px solid black;">Tutorial</a>
      </div>
      <div class="h-[15vh]">
          <br/>
          <div>
            <Settings />
          </div>
      </div>
  </div>
  
</div>

<style lang="scss">
  .wrapper {
    background-repeat: no-repeat;
    background-image: url('../assets/bg/filter.svg'), url('../assets/bg/bg.jpg');
    background-size: cover;
  }
  .header {
    color: white;
  }
</style>