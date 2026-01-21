<script lang="ts">
	import { Text } from '@threlte/extras';

	import { SCENE_COLOR } from './constants';

	const chars = ['π', '0', '1', '404', 'NULL', '{', '}', '≠'];

	//NOTE: reduced count for performance
	const count = 100;
	const particles = Array.from({ length: count }).map(() => {
		return {
			position: [
				(Math.random() - 0.5) * 80,
				(Math.random() - 0.5) * 80,
				(Math.random() - 0.5) * 40
			] as [number, number, number],

			char: chars[Math.floor(Math.random() * chars.length)],
			scale: 0.5 + Math.random() * 0.5,
			opacity: 0.4 + Math.random() * 0.5
		};
	});
</script>

{#each particles as p, i (i)}
	<Text
		text={p.char}
		position={p.position}
		fontSize={2}
		color={SCENE_COLOR}
		fillOpacity={p.opacity}
	/>
{/each}
