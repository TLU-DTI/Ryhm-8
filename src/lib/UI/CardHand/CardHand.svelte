<script>
  import CardTest from '../ActionCard/CardTest.svelte';
</script>

<div class="flex size-full content-center justify-center text-center">
  <div class="card-container">
    <div class="card">
      <CardTest
        title="TIIIITEL"
        description="Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description "
      />
    </div>
  </div>
  <div class="card-container">
    <div class="card">
      <CardTest
        title="TIIIITEL"
        description="Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description "
      />
    </div>
  </div>
  <div class="card-container">
    <div class="card">
      <CardTest
        title="TIIIITEL"
        description="Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description "
      />
    </div>
  </div>
  <div class="card-container">
    <div class="card">
      <CardTest
        title="TIIIITEL"
        description="Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description "
      />
    </div>
  </div>
  <div class="card-container">
    <div class="card">
      <CardTest
        title="TIIIITEL"
        description="Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description "
      />
    </div>
  </div>
</div>

<style>
  .card-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    flex: 1 1 auto;
    flex-wrap: wrap;
    max-width: inherit;
    width: inherit;
    height: inherit;
  }
  .card {
    position: absolute;
    top: 0;
    left: 0;

    box-sizing: border-box;
    height: 100%;
    flex-basis: calc(33.33% - 1rem);
    transition:
      transform 0.3s ease-in-out,
      box-shadow 0.3s ease-in-out,
      border-width 0.3s ease-in-out,
      rotate 0.3s ease-in-out;
  }
  .card-container:last-child {
    flex: 1 0 50%;
  }
  .card:hover {
    z-index: 1;
    cursor: pointer;
    transform: scale(1.05);
    rotate: 3deg;
  }
  .card-container:nth-child(even):hover .card {
    rotate: -3deg;
  }
</style>
