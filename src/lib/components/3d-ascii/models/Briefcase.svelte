<script lang="ts">
  import { T } from '@threlte/core';
  import { useGltf, useGltfAnimations } from '@threlte/extras';
  import * as THREE from 'three';

  let {
    position = [0, 0, 0] as [number, number, number],
    rotation = [0, 0, 0] as [number, number, number],
    scale = 1
  } = $props();

  const briefcaseGltf = useGltf('/briefcase.glb');
  const { actions } = useGltfAnimations(briefcaseGltf);

  $effect(() => {
    const openAction = $actions['PlaneAction.001'];
    const dropAction = $actions['StarAction.001'];
    if (openAction && dropAction) {
      openAction.reset();
      openAction.timeScale = 2;
      dropAction.timeScale = 2;
      openAction.setLoop(THREE.LoopOnce, 1);
      dropAction.setLoop(THREE.LoopOnce, 1);
      openAction.clampWhenFinished = true;
      dropAction.clampWhenFinished = true;
      openAction.play();
      dropAction.play();
    }
  });
</script>

{#if $briefcaseGltf}
  <T is={$briefcaseGltf.scene} {position} {rotation} {scale} />
{/if}
