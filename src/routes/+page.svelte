<script lang="ts">
  import Credit from '$lib/UI/Credits/Credit.svelte';
  import { onMount } from 'svelte';

  const handleStartClick = () => {
    window.location.href = '/game';
  };

  onMount(() => {
    if (window.location.pathname === '/game') {
      window.location.reload();
    }
  });
</script>

<div class="wrapper">
  <div class="content">
    <h1 class="header">Mitigate Online</h1>
    <!-- Refactored button for better design -->
    <button class="button" on:click={handleStartClick}>Start Game</button>
  </div>
  <div class="sidebar bottom-right">
    <Credit />
  </div>
</div>

<style lang="scss">
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: url('../assets/bg/filter.svg'), url('../assets/bg/bg.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
  }

  .content {
    text-align: center;
    color: white;
  }

  .header {
    font-size: 5rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }

  .button {
    display: inline-block;
    background-color: #6f42c1;
    color: white;
    font-size: 2rem;
    padding: 1rem 2rem;
    border-radius: 12px; /* Adjusted from 30% to 12px for a cleaner look */
    border: 2px solid #5a32a3; /* Slightly reduced border thickness */
    text-decoration: none;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    outline: none; /* Remove focus outline */
  }

  .button:hover {
    background-color: #5a32a3;
    transform: scale(1.05); /* Scale up on hover for a subtle effect */
  }

  .sidebar {
    position: absolute;
    color: white;
  }

  .bottom-right {
    bottom: 2rem;
    right: 2rem;
  }
</style>
