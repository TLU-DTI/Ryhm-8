<script>
  import SimpleBar from '$lib/Components/SimpleBar.svelte';
  import CardTest from './CardTest.svelte';
</script>

<div class="size-full">
  <SimpleBar>
    <div class="flex gap-4 text-center">
      <div class="card size-16 bg-gray-700"><p>Action Cards</p></div>
      <div class="card size-16 bg-gray-700"><p>Action Cards</p></div>
      <div class="card size-16 bg-gray-700"><p>Action Cards</p></div>
      <div class="card size-16 bg-gray-700"><p>Action Cards</p></div>
      <div class="card size-60">
        <CardTest title="Use me" description="Pweaase" />
      </div>
      <div class="card size-16 bg-gray-700"><p>Action Cards</p></div>
      <div class="card size-16 bg-gray-700"><p>Action Cards</p></div>
      <div class="card size-16 bg-gray-700"><p>Action Cards</p></div>
      <div class="card size-16 bg-gray-700"><p>Action Cards</p></div>
      <div class="card size-16 bg-gray-700"><p>Action Cards</p></div>
      <div class="card size-16 bg-gray-700"><p>Action Cards</p></div>
      <div class="card size-16 bg-gray-700"><p>Action Cards</p></div>
      <div class="card size-16 bg-gray-700"><p>Action Cards</p></div>
      <div class="card size-16 bg-gray-700"><p>Action Cards</p></div>
    </div>
  </SimpleBar>
</div>

<style>
  .card:hover {
    transform: translateY(-1vh);
    transition: 0.3s;
    filter: drop-shadow(0 2vh 0.5rem rgba(0, 0, 0, 0.169));
    z-index: 1;
  }
</style>
