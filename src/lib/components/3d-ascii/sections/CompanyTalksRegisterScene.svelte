<script lang="ts">
	import { T } from '@threlte/core';
	import AsciiCanvas from '$lib/components/3d-ascii/containers/AsciiCanvas.svelte';
	import Microphone from '$lib/components/3d-ascii/models/Microphone.svelte';
	import Stars from '$lib/components/3d-ascii/models/Stars.svelte';

	let innerWidth = $state(0);

	// Optimized positioning based on your ctalks.jpg reference
	let config = $derived.by(() => {
		if (innerWidth < 768) {
			return {
				micPos: [0, -0.6, 2.5], // Center and slightly back
				starsPos: [-0.5, 0.2, 1.8], // Left-side star
				scale: 0.8
			};
		}
		return {
			micPos: [0, -0.8, 3], // More depth for desktop
			starsPos: [-0.8, 0.5, 2.2], // Top-left star framing
			scale: 1.1
		};
	});
</script>

<svelte:window bind:innerWidth />

{#snippet registerLights()}
	<T.AmbientLight intensity={0.4} />
	<T.DirectionalLight position={[5, 10, 5]} intensity={1.5} />
	<T.PointLight position={[0, 2, -2]} intensity={0.8} color="#ffffff" />
{/snippet}

<AsciiCanvas fgColor="gray" lights={registerLights}>
	<Microphone
		position={config.micPos as [number, number, number]}
		rotation={[0.1, -0.2, 0]}
		scale={config.scale}
	/>

	<Stars
		position={config.starsPos as [number, number, number]}
		rotation={[0.2, 0.4, 0.1]}
		scale={config.scale * 0.8}
		delay={1200}
	/>

	<Stars
		position={[0.8, -0.4, 2.5]}
		rotation={[-0.2, -0.3, 0]}
		scale={config.scale * 0.6}
		delay={1500}
	/>
</AsciiCanvas>
