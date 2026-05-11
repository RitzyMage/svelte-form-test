<script lang="ts">
  import { onMount } from "svelte";

  import { BalatroShader } from "./balatro-shader";

  let { intensity }: { intensity: number } = $props();

  let shader: BalatroShader;

  function toColor(h: number, s: number, v: number) {
    return `hsl(${h * 360}deg ${s * 100}% ${v * 100}%)`;
  }

  function hslToHex(h: number, s: number, l: number) {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0"); // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  function getColors(intensity2: number) {
    let hue = 230 + 120 * intensity2;
    let saturation = 40 + 30 * intensity2;
    return {
      c1: hslToHex(hue, saturation, 50 + 40 * intensity2),
      c2: hslToHex(hue, saturation, 40 + 20 * intensity2),
      c3: hslToHex(hue, saturation, 10 + 20 * intensity2),
    };
  }
  console.log(getColors(0.5), getColors(1));

  onMount(() => {
    // initShader();
    requestAnimationFrame(() => {
      shader = new BalatroShader({
        container: "#background", // the ID of the target element
        colours: getColors(intensity),
        speed: 0.5,
        contrast: 3.0,
        spinAmount: 0.5,
        pixelSizeFac: 4000,
        spinEase: 0.5,
      });
    });
  });

  $effect(() => {
    if (shader) {
      shader.opts.colours = getColors(intensity);
    } else {
      console.log("no shader", intensity);
    }
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
