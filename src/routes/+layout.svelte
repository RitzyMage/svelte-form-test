<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";
  import BalatroBackground from "$lib/components/balatro-background/balatro-background.svelte";
  import { onMount } from "svelte";

  let { children } = $props();

  let intensity = $state(1);

  let decreaseIntensity = () => {
    intensity = Math.max(0, intensity - 0.05);
  };

  let increaseIntensity = () => {
    intensity = Math.min(1, intensity + 0.2);
  };

  onMount(() => {
    let interval = setInterval(decreaseIntensity, 100);
    return () => clearInterval(interval);
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<main>
  <BalatroBackground {intensity} />
  <div id="content" onkeydown={increaseIntensity}>
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
    margin: 32px;
    border-radius: 4px;
    width: 100%;
    flex-grow: 1;
    background-color: #eeeeeee0;
    height: 100%;
    overflow-y: auto;
    padding: 32px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 40%);
    z-index: 1;
  }
</style>
