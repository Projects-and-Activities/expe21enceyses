<script lang="ts">
  import { Canvas } from '@threlte/core';
  import type { Snippet } from 'svelte';

  import { SCENE_COLOR, ASCII_OPTIONS } from '../constants';

  import DynamicAsciiRenderer from './DynamicAsciiRenderer.svelte';

  import { asciiState } from '$lib/components/3d-ascii/ascii.svelte';

  let {
    fgColor = SCENE_COLOR,
    bgColor = 'transparent',
    dpr = 1,
    children,
    lights
  }: {
    fgColor?: string;
    bgColor?: string;
    dpr?: number;
    children: Snippet;
    lights: Snippet;
  } = $props();
</script>

<div class="h-full w-full">
  <Canvas {dpr}>
    <DynamicAsciiRenderer
      {fgColor}
      {bgColor}
      characters={asciiState.currentChars}
      options={ASCII_OPTIONS}
    />

    {@render lights()}
    {@render children()}
  </Canvas>
</div>
