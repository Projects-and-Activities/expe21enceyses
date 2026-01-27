<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import type { Snippet } from 'svelte';
	import * as THREE from 'three';

	let {
		speed = 5,
		amplitude = 0.2,
		enabled = true,
		children
	}: {
		speed?: number;
		amplitude?: number;
		enabled?: boolean;
		children: Snippet;
	} = $props();

	let groupRef: THREE.Group | undefined = $state();
	let time = 0;

	useTask((delta) => {
		if (enabled && groupRef) {
			time += delta;
			// Bob up and down relative to the parent's position
			groupRef.position.y = Math.sin(time * speed) * amplitude;
		} else if (groupRef) {
			// Reset to 0 when disabled so it doesn't get stuck midway
			groupRef.position.y = 0;
		}
	});
</script>

<T.Group bind:ref={groupRef}>
	{@render children()}
</T.Group>
