<script lang="ts">
  import { T } from '@threlte/core';
  import { useGltf } from '@threlte/extras';
  import { Spring } from 'svelte/motion';

  let {
    position = [0, 0, 0] as [number, number, number],
    rotation = [0, 0, 0] as [number, number, number],
    scale = 1,
    delay = 0
  } = $props();

  const starsGltf = useGltf('/stars.glb');
  const springScale = new Spring(0, { stiffness: 0.1, damping: 0.25 });

  $effect(() => {
    const timer = setTimeout(() => {
      springScale.target = 1;
    }, delay);
    return () => clearTimeout(timer);
  });
</script>

{#if $starsGltf}
  <T is={$starsGltf.scene} {position} {rotation} scale={scale * springScale.current} />
{/if}
