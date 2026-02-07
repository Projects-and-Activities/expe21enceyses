<script lang="ts">
  import { useThrelte, useTask, watch } from '@threlte/core';
  import { onDestroy } from 'svelte';
  import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';

  let {
    characters = ' .:+*=%@#',
    options = {},
    fgColor = '#ffffff',
    bgColor = 'transparent'
  } = $props();

  const { renderer, scene, camera, size, renderStage } = useThrelte();

  let asciiEffect: AsciiEffect | undefined;
  let effectElement: HTMLElement | undefined;

  function setupEffect(newChars: string) {
    if (effectElement) effectElement.remove();

    asciiEffect = new AsciiEffect(renderer, newChars, options);
    effectElement = asciiEffect.domElement;

    renderer.domElement.style.opacity = '0';

    Object.assign(effectElement.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      color: fgColor,
      backgroundColor: bgColor,
      imageRendering: 'pixelated'
    });

    asciiEffect.setSize($size.width, $size.height);
    renderer.domElement.parentElement?.appendChild(effectElement);
  }

  $effect(() => {
    setupEffect(characters);
  });

  watch(size, ($s) => {
    asciiEffect?.setSize($s.width, $s.height);
  });

  useTask(
    () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const s = (scene as any).current ?? scene;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const c = (camera as any).current ?? camera;

      if (asciiEffect && s && c) {
        asciiEffect.render(s, c);
      }
    },
    { stage: renderStage, autoInvalidate: false }
  );

  onDestroy(() => {
    if (effectElement) effectElement.remove();
    renderer.domElement.style.opacity = '1';
  });
</script>
