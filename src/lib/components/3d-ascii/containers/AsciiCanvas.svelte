<script lang="ts">
  import { Canvas } from '@threlte/core';
  import { AsciiRenderer } from '@threlte/extras';
  import type { Snippet } from 'svelte';

  import { SCENE_COLOR, ASCII_CHARS, ASCII_OPTIONS } from '../constants';

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
    <AsciiRenderer {fgColor} {bgColor} characters={ASCII_CHARS} options={ASCII_OPTIONS} />

    {@render lights()}
    {@render children()}
  </Canvas>
</div>
