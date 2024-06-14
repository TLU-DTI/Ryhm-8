<script lang="ts">
  import ActionCard from '$lib/UI/ActionCard/ActionCard.svelte';
  import CardHand from '$lib/UI/CardHand/CardHand.svelte';
  import EndTurn from '$lib/UI/EndTurn/EndTurn.svelte';
  import Manager from '$lib/UI/Manager/Manager.svelte';
  import Objective from '$lib/UI/Objective/Objective.svelte';
  import RiskLog from '$lib/UI/RiskLog/RiskLog.svelte';
  import Settings from '$lib/UI/Settings/Settings.svelte';
  import Timeline from '$lib/UI/Timeline/Timeline.svelte';
</script>

<div class="wrapper">
  <div class="flex">
    <!-- Column 1 -->
    <div class="w-[20vw]">
      <div class="relative h-[50vh]">
        <Objective />
      </div>

      <div class="h-[4vh]"></div>

      <div class="relative h-[46vh]">
        <RiskLog />
      </div>
    </div>

    <!-- Divider -->
    <div class="w-[6vw]">
      <div class="h-[100vh]"></div>
    </div>

    <!-- Column 2 -->
    <div class="w-[48vw]">
      <div class="relative h-[10vh]">
        <Timeline />
      </div>

      <div class="h-[1vh]"></div>

      <div class="relative h-[44vh]">
        <CardHand />
      </div>

      <div class="h-[4vh]"></div>

      <div class="relative h-[38vh] bg-yellow-500">
        <ActionCard />
      </div>
    </div>

    <!-- Divider -->
    <div class="w-[1vw]">
      <div class="h-[100vh]"></div>
    </div>

    <!-- Column 3 -->
    <div class="w-[25vw]">
      <div class="relative h-[10vh] bg-red-200">
        <Settings />
      </div>

      <div class="h-[6vh]"></div>

      <div class="relative h-[24vh] bg-red-300">
        <Manager />
      </div>

      <div class="h-[42vh]"></div>
      <div class="h-[2vh]"></div>

      <div class="relative flex h-[7vh]">
        <div class="w-[8vw]"></div>
        <EndTurn />
        <div class="w-[8vw]"></div>
      </div>

      <div class="h-[6vh]"></div>
    </div>
  </div>
</div>

<style lang="scss">
  .wrapper {
    background-repeat: no-repeat;
    background-image: url('/assets/bg/filter.svg'), url('/assets/bg/bg.jpg');
    background-size: cover;
  }
</style>
