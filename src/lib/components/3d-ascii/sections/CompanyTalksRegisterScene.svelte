<script lang="ts">
  import { T } from '@threlte/core';

  import Microphone from '../models/Microphone.svelte';
  import Stars1 from '../models/Stars1.svelte';
  import SimpleFloat from '$lib/components/3d-ascii/rig/SimpleFloat.svelte';

  import AsciiCanvas from '$lib/components/3d-ascii/containers/AsciiCanvas.svelte';

  let innerWidth = $state(0);

  // Layout Logic
  let config = $derived.by(() => {
    if (innerWidth < 768) {
      return {
        laptopPos: [1.1, -5.8, -0.2],
        starsPos: [0.6, -6.4 - 0.6],
        scale: 1.6
      };
    }
    return {
      laptopPos: [1.3, -4.6, -0.8],
      starsPos: [0.8, -5.6, -0.3],
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
  <SimpleFloat speed={5} amplitude={0.2} enabled={true}>
    <Microphone
      position={config.laptopPos as [number, number, number]}
      rotation={[-0.2, 0.1, 0]}
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
