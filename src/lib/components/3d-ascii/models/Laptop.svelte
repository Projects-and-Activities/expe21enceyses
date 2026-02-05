<script lang="ts">
  import { T } from '@threlte/core';
  import { useGltf, useGltfAnimations } from '@threlte/extras';
  import * as THREE from 'three';

  let {
    position = [0, 0, 0] as [number, number, number],
    rotation = [0, 0, 0] as [number, number, number],
    scale = 1
  } = $props();

  const laptopGltf = useGltf('/laptop.glb');
  const { actions } = useGltfAnimations(laptopGltf);

  $effect(() => {
    const openAction = $actions['Open'];
    if (openAction) {
      openAction.reset();
      openAction.timeScale = 2;
      openAction.setLoop(THREE.LoopOnce, 1);
      openAction.clampWhenFinished = true;
      openAction.play();
    }
  });
</script>

{#if $laptopGltf}
  <T is={$laptopGltf.scene} {position} {rotation} {scale} />
{/if}
