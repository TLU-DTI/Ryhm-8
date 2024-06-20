<script lang="ts">
  import RiskCard from '$lib/Cards/RiskCard.svelte';

  let card = {
    id: '1M',
    title: 'Unexpected Resignation',
    description:
      'A key member of the project team resigns unexpectedly, causing a temporary disruption in the project workflow.',
    category: 'Management',
    attributes: {
      cost: 10,
      quality: 5,
      scope: 3,
      time: 2
    },
    rng: 1
  };
</script>

<div class="handbg size-full content-center">
  <RiskCard riskCard={card} />
</div>

<style>
  .handbg {
    background: url('/assets/HandBG.svg');
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 2rem;
  }
</style>
