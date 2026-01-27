<script lang="ts">
	import { Text } from '@threlte/extras';

	import { SCENE_COLOR } from '../constants';

	const PARTICLE_CHARS = ['π', '0', '1', '404', 'NULL', '{', '}', '≠', '+', 'x', '<', '>'];

	let {
		mode = 'static',
		count = 50,
		area = [100, 100, 40] as [number, number, number]
	} = $props();

	// Initialize Particles
	const particles = $derived(
		Array.from({ length: count }).map(() => ({
			position: [
				(Math.random() - 0.5) * area[0],
				(Math.random() - 0.5) * area[1],
				(Math.random() - 0.5) * area[2]
			] as [number, number, number],
			char: PARTICLE_CHARS[Math.floor(Math.random() * PARTICLE_CHARS.length)],
			scale: 0.5 + Math.random() * 2.5, // Random size
			speed: 0.5 + Math.random() * 1.5,
			offset: Math.random() * 100,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			ref: undefined as any
		}))
	);
</script>

{#each particles as p, i (i)}
	<Text
		text={p.char}
		position={p.position}
		fontSize={p.scale}
		color={SCENE_COLOR}
		anchorX="center"
		anchorY="middle"
		fillOpacity={mode === 'static' ? 0.4 : 0}
		bind:ref={p.ref}
	/>
{/each}
