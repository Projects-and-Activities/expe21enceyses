<script lang="ts">
  import { T } from '@threlte/core';

  import DataUplink from '../effects/DataUplink.svelte';
  import Briefcase from '../models/Briefcase.svelte';

  import AsciiCanvas from '$lib/components/3d-ascii/containers/AsciiCanvas.svelte';
  import Stars from '$lib/components/3d-ascii/models/Stars.svelte';
  import SimpleFloat from '$lib/components/3d-ascii/rig/SimpleFloat.svelte';

  let innerWidth = $state(0);

  // Layout Logic
  let config = $derived.by(() => {
    if (innerWidth < 768) {
      return {
        briefcasePos: [0.5, -1.8, -0.57],
        starsPos: [0.4, 0.4, 1.8],
        scale: 0.8
      };
    }
    return {
      briefcasePos: [0.5, -3, -1],
      starsPos: [0.5, 0.3, 1.7],
      scale: 1
    };
  });
</script>

<svelte:window bind:innerWidth />

{#snippet heroLights()}
  <T.AmbientLight intensity={0.4} />
  <T.DirectionalLight position={[2, 10, 5]} intensity={1} castShadow />
  <T.PointLight position={[0.5, 1, 4]} intensity={1} color="#FFEDCC" distance={10} />
{/snippet}

<AsciiCanvas lights={heroLights}>
  <DataUplink color="#7F52BB" />

  <Briefcase
    position={config.briefcasePos as [number, number, number]}
    rotation={[0.4, -0.3, 0]}
    scale={config.scale}
  />

  <SimpleFloat speed={5} amplitude={0.2} enabled={true}>
    <Stars
      position={config.starsPos as [number, number, number]}
      rotation={[0.3, -0.5, 0]}
      scale={config.scale}
      delay={2000}
    />
  </SimpleFloat>
</AsciiCanvas>
