<script lang="ts">
	import { T } from '@threlte/core';
	import { useGltf, useGltfAnimations } from '@threlte/extras';
	import * as THREE from 'three';

	let {
		position = [0, 0, 0] as [number, number, number],
		rotation = [0, 0, 0] as [number, number, number],
		scale = 1
	} = $props();

	// Assuming you have a microphone.glb in your static folder
	const micGltf = useGltf('/microphone.glb');
	const { actions } = useGltfAnimations(micGltf);

	$effect(() => {
		// If your model has a subtle "hover" or "float" animation
		const idleAction = $actions['Idle'] || $actions['Animation'];
		if (idleAction) {
			idleAction.reset().fadeIn(0.5).play();
		}
	});
</script>

{#if $micGltf}
	<T is={$micGltf.scene} {position} {rotation} {scale} />
{/if}
