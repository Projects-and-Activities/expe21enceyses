<script lang="ts">
  import { T } from '@threlte/core';

  import BusinessCards from '../effects/BusinessCards.svelte';
  import Microphone from '../models/Microphone.svelte';
  import Stars1 from '../models/Stars1.svelte';

  import AsciiCanvas from '$lib/components/3d-ascii/containers/AsciiCanvas.svelte';
  import SimpleFloat from '$lib/components/3d-ascii/rig/SimpleFloat.svelte';

  let innerWidth = $state(0);

  // Layout Logic
  let config = $derived.by(() => {
    if (innerWidth < 768) {
      return {
        laptopPos: [0.17, -0.7, -0.5],
        starsPos: [0.15, -1.1, 0],
        scale: 0.5
      };
    }
    return {
      laptopPos: [1, -6.0, -0.8],
      starsPos: [1.0, -6.6, 0],
      scale: 1.5
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
  <BusinessCards />

  <SimpleFloat speed={5} amplitude={0.2} enabled={true}>
    <Microphone
      position={config.laptopPos as [number, number, number]}
      rotation={[-0.22, -0.4, -0.2]}
      scale={config.scale}
    />
  </SimpleFloat>

  <SimpleFloat speed={5} amplitude={0.2} enabled={true}>
    <Stars1
      position={config.starsPos as [number, number, number]}
      rotation={[-0.2, 0.1, 0]}
      scale={config.scale}
      delay={3000}
    />
  </SimpleFloat>
</AsciiCanvas>
