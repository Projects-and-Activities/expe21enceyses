<script lang="ts">
  import { T } from '@threlte/core';

  import Briefcase from '../models/Briefcase.svelte';

  import AsciiCanvas from '$lib/components/3d-ascii/containers/AsciiCanvas.svelte';
  import Stars from '$lib/components/3d-ascii/models/Stars.svelte';

  let innerWidth = $state(0);

  let config = $derived.by(() => {
    if (innerWidth < 768) {
      return {
        laptopPos: [0.3, 0, -0.57],
        starsPos: [0.4, 0.8, -0.3],
        scale: 0.8
      };
    }
    return {
      laptopPos: [0.5, -3, 0.7],
      starsPos: [0.5, 0, 3],
      scale: 1
    };
  });
</script>

<svelte:window bind:innerWidth />

{#snippet registerLights()}
  <T.AmbientLight intensity={0.5} />
  <T.DirectionalLight position={[5, 5, 5]} intensity={1.2} />
  <T.PointLight position={[-2, 1, 2]} intensity={0.8} color="#ffffff" distance={10} />
{/snippet}

<AsciiCanvas fgColor="gray" lights={registerLights}>
  <Briefcase
    position={config.laptopPos as [number, number, number]}
    rotation={[0.3, -0.3, 0]}
    scale={1}
  />

  <Stars
    position={config.starsPos as [number, number, number]}
    rotation={[0.3, -0.5, 0]}
    scale={config.scale}
    delay={1000}
  />
</AsciiCanvas>
