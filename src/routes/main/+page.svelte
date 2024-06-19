<script lang="ts">
  import Settings from '$lib/UI/Settings/Settings.svelte';
</script>

<div class="wrapper">
  <div class="content">
    <h1 class="header">Mitigate Online</h1>
    <a href="/" class="button">Start</a>
  </div>
  <div class="sidebar top-right">
    <a href="/tutorial" class="sidebar-link">Tutorial</a>
  </div>
  <div class="sidebar bottom-right">
    <Settings />
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
    border-radius: 30%;
    border: 5px solid black;
    text-decoration: none;
    transition: background-color 0.3s ease;
  }

  .button:hover {
    background-color: #5a32a3;
  }

  .sidebar {
    position: absolute;
    color: white;
  }

  .top-right {
    top: 2rem;
    right: 2rem;
  }

  .bottom-right {
    bottom: 2rem;
    right: 2rem;
  }

  .sidebar-link,
  .settings-button {
    display: block;
    background-color: #6f42c1;
    color: white;
    font-size: 2rem;
    padding: 1rem 0.5rem;
    border-radius: 20%;
    border: 5px solid black;
    text-decoration: none;
    transition: background-color 0.3s ease;
  }

  .sidebar-link:hover,
  .settings-button:hover {
    background-color: #5a32a3;
  }
</style>
