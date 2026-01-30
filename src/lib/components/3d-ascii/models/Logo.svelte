<script lang="ts">
	import { T } from '@threlte/core';
	import { useGltf } from '@threlte/extras';

	let {
		ref = $bindable(),
		position = [0, 0, 0] as [number, number, number],
		rotation = [0, 0, 0] as [number, number, number],
		scale = 1
	} = $props();

	const gltf = useGltf('/logo.glb');
</script>

{#if $gltf}
	<T is={$gltf.scene} bind:ref {position} {rotation} {scale} />
{/if}
