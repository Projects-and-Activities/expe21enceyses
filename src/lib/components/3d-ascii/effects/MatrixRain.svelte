<script lang="ts">
	import { useTask } from '@threlte/core';
	import { Text } from '@threlte/extras';

	import { HEAD_COLOR } from '../constants';

	let { color = '#7F52BB' } = $props();

	const COLUMN_COUNT = 20;
	const AREA_WIDTH = 100;

	const CHARS = [
		'0',
		'1',
		'2',
		'3',
		'4',
		'5',
		'8',
		'9',
		'X',
		'Z',
		'M',
		'W',
		'日',
		'ﾊ',
		'ﾐ',
		'ﾋ',
		'ｰ',
		'ｳ',
		'ｼ',
		'ﾅ',
		'ﾓ',
		'ﾆ',
		'ｻ',
		'ﾜ',
		'ﾂ',
		'ｵ',
		'ﾘ',
		'ｱ',
		'ﾎ',
		'ﾃ',
		'ﾏ',
		'ｹ',
		'ﾒ',
		'ｴ',
		'ｶ',
		'ｷ',
		'ﾑ',
		'ﾕ',
		'ﾗ',
		'ｾ',
		'ﾈ',
		'ｽ',
		'ﾀ',
		'ﾇ',
		'ﾍ'
	];

	const getRandomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];
	const generateStream = (length: number) => Array.from({ length }).map(getRandomChar).join('\n');

	const streams = Array.from({ length: COLUMN_COUNT }).map(() => {
		const x = (Math.random() - 0.5) * AREA_WIDTH;

		// 2. PUSH IT BACK (Was -5 to -20, now -15 to -30)
		// This keeps it strictly in the background
		const z = -15 - Math.random() * 15;
		const startY = 30 + Math.random() * 40;

		return {
			x,
			z,
			y: startY,
			// 3. SLOW IT DOWN (Was 0.3, now 0.15)
			// Makes it feel ambient rather than aggressive
			speed: 0.15 + Math.random() * 0.1,
			fontSize: 1 + Math.random() * 1.5,

			tailText: generateStream(10 + Math.floor(Math.random() * 10)),
			tailOpacity: 0.15 + Math.random() * 0.3,
			headChar: getRandomChar(),
			glitchTimer: Math.random() * 10,

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			headRef: undefined as any,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			tailRef: undefined as any
		};
	});

	useTask((delta) => {
		streams.forEach((stream) => {
			stream.y -= stream.speed;

			if (stream.y < -40) {
				stream.y = 40 + Math.random() * 10;
				stream.x = (Math.random() - 0.5) * AREA_WIDTH;
				stream.headChar = getRandomChar();
				stream.tailText = generateStream(15);
			}

			stream.glitchTimer -= delta * 15;
			if (stream.glitchTimer < 0) {
				stream.glitchTimer = 2 + Math.random() * 5;
				stream.headChar = getRandomChar();
				if (Math.random() > 0.5) {
					stream.tailText = generateStream(stream.tailText.split('\n').length);
				}
			}

			if (stream.headRef) {
				stream.headRef.position.set(stream.x, stream.y, stream.z);
				stream.headRef.text = stream.headChar;
			}
			if (stream.tailRef) {
				const offset = stream.fontSize * 1.1;
				stream.tailRef.position.set(stream.x, stream.y + offset, stream.z);
				stream.tailRef.text = stream.tailText;
			}
		});
	});
</script>

{#each streams as stream, i (i)}
	<Text
		text={stream.headChar}
		position={[stream.x, stream.y, stream.z]}
		fontSize={stream.fontSize}
		color={HEAD_COLOR}
		fillOpacity={0.8}
		anchorX="center"
		anchorY="bottom"
		bind:ref={stream.headRef}
	/>

	<Text
		text={stream.tailText}
		position={[stream.x, stream.y, stream.z]}
		fontSize={stream.fontSize}
		{color}
		fillOpacity={stream.tailOpacity * 0.6}
		lineHeight={1.0}
		anchorX="center"
		anchorY="bottom"
		bind:ref={stream.tailRef}
	/>
{/each}
