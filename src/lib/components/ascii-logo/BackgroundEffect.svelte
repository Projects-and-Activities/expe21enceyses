<script lang="ts">
	import { Text } from '@threlte/extras';

	import { CHAR_COUNT, CHARS, SCENE_COLOR } from './constants';

	const particles = Array.from({ length: CHAR_COUNT }).map(() => {
		return {
			position: [
				(Math.random() - 0.5) * 80,
				(Math.random() - 0.5) * 80,
				(Math.random() - 0.5) * 40
			] as [number, number, number],

			char: CHARS[Math.floor(Math.random() * CHARS.length)],
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
