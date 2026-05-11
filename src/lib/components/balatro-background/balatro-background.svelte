<script lang="ts">
  import { onMount } from "svelte";

  import { BalatroShader } from "./balatro-shader";

  let { intensity }: { intensity: number } = $props();

  let shader: BalatroShader;

  onMount(() => {
    // initShader();
    requestAnimationFrame(() => {
      shader = new BalatroShader({
        container: "#background", // the ID of the target element
        colours: { c1: "#30e040", c2: "#40ff60", c3: "#004010" },
        speed: 0.5,
        contrast: 3.0,
        spinAmount: 0.5,
        pixelSizeFac: 4000,
        spinEase: 0.5,
      });
    });
  });

  $effect(() => {
    // shader.
    console.log(intensity);
  });
</script>

<div id="background"></div>

<style>
  #background {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
