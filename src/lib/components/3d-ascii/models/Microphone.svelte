<script lang="ts">
  import { T } from '@threlte/core';
  import { useGltf, useGltfAnimations } from '@threlte/extras';
  import * as THREE from 'three';

  let {
    position = [0, 0, 0] as [number, number, number],
    rotation = [0, 0, 0] as [number, number, number],
    scale = 1
  } = $props();

  const micGltf = useGltf('/microphone.glb');
  const { actions } = useGltfAnimations(micGltf);

  $effect(() => {
    const introActions = ['Down', 'CTalks LogoAction'];

    introActions.forEach((name) => {
      const action = $actions[name];

      if (action) {
        action.reset();
        action.timeScale = 1.5;
        action.setLoop(THREE.LoopOnce, 1);
        action.clampWhenFinished = true;
        action.play();
      }
    });
  });
</script>

{#if $micGltf}
  <T is={$micGltf.scene} {position} {rotation} {scale} />
{/if}
