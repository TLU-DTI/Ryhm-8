<script>
  import CardTest from '../ActionCard/CardTest.svelte';
</script>

<div class="mb-3 ml-3 mr-3 mt-3 flex size-full content-center text-center">
  <div class="card-container">
    <div class="card"><CardTest /></div>
  </div>
  <div class="card-container">
    <div class="card"><CardTest /></div>
  </div>
  <div class="card-container">
    <div class="card"><CardTest /></div>
  </div>
  <div class="card-container">
    <div class="card"><CardTest /></div>
  </div>
  <div class="card-container">
    <div class="card"><CardTest /></div>
  </div>
  <!-- <p>Card Hand</p> -->
</div>

<style>
  .card-container {
    position: relative;
    flex: 1 1 auto;
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
  }
  .card-container:last-child {
    flex: 1 0 50%;
  }
  .card:hover {
    z-index: 1;
    cursor: pointer;
  }
</style>
