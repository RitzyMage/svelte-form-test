<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<main>
  <div id="content">
    {@render children()}
  </div>
</main>

<style>
  main {
    background-color: #ddd;
    margin: 0;
    min-height: 100dvh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: stretch;
  }

  #content {
    max-width: 800px;
    width: 100%;
    flex-grow: 1;
    background-color: #eee;
    height: 100%;
    overflow-y: auto;
    padding: 8px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 40%);
  }
</style>
