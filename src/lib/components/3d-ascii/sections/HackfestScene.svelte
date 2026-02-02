<script lang="ts">
  import { T } from '@threlte/core';

  import AsciiCanvas from '$lib/components/3d-ascii/containers/AsciiCanvas.svelte';
  import MatrixRain from '$lib/components/3d-ascii/effects/MatrixRain.svelte';
  import Laptop from '$lib/components/3d-ascii/models/Laptop.svelte';
  import Stars from '$lib/components/3d-ascii/models/Stars.svelte';
  import SimpleFloat from '$lib/components/3d-ascii/rig/SimpleFloat.svelte';

  let innerWidth = $state(0);

  // Layout Logic
  let config = $derived.by(() => {
    if (innerWidth < 768) {
      return {
        laptopPos: [0.5, -0.5, -0.2],
        starsPos: [0.5, -0.2, 0],
        scale: 0.6
      };
    }
    return {
      laptopPos: [0.5, -0.7, 1],
      starsPos: [0.5, 0.3, 1.7],
      scale: 1
    };
  });
</script>

<svelte:window bind:innerWidth />

{#snippet heroLights()}
  <T.AmbientLight intensity={0.4} />
  <T.DirectionalLight position={[2, 10, 5]} intensity={1.5} castShadow />
  <T.PointLight position={[0.5, 1, 4]} intensity={1} color="#FFEDCC" distance={10} />
{/snippet}

<AsciiCanvas lights={heroLights}>
  <MatrixRain color="#7F52BB" />

  <Laptop
    position={config.laptopPos as [number, number, number]}
    rotation={[0.4, -0.3, 0]}
    scale={1}
  />

  <SimpleFloat speed={5} amplitude={0.2} enabled={true}>
    <Stars
      position={config.starsPos as [number, number, number]}
      rotation={[0.3, -0.5, 0]}
      scale={config.scale}
      delay={1000}
    />
  </SimpleFloat>
</AsciiCanvas>
