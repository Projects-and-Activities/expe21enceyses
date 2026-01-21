<script lang="ts">
	import { Canvas, T } from '@threlte/core';
	import { OrbitControls, AsciiRenderer } from '@threlte/extras';
	import type { AsciiEffectOptions } from 'three/examples/jsm/Addons.js';

	import BackgroundEffect from './BackgroundEffect.svelte';
	import { SCENE_COLOR } from './constants';
	import LogoScene from './LogoScene.svelte';

	const characters = ' .:+*=%@#▓█';

	const options: AsciiEffectOptions = {
		resolution: 0.28,
		invert: false
	};

	let waveTrigger = 0;

	function triggerShockwave() {
		waveTrigger = Date.now();
	}
</script>

<div
	class="relative h-full cursor-pointer bg-transparent font-black transition-transform select-none active:scale-95"
	on:pointerdown={triggerShockwave}
	on:keydown={() => {}}
	role="button"
	tabindex="0"
>
	<Canvas dpr={2}>
		<AsciiRenderer fgColor={SCENE_COLOR} bgColor="transparent" {characters} {options} />

		<T.PerspectiveCamera makeDefault position={[0, 0, 24]} fov={25}>
			<OrbitControls
				enableDamping
				enableZoom={false}
				autoRotate={true}
				autoRotateSpeed={1.5}
				target={[0, 0, 0]}
			/>
		</T.PerspectiveCamera>

		<T.HemisphereLight args={['#ffffff', '#5500ff', 3]} />
		<T.DirectionalLight position={[10, 10, 5]} intensity={5.0} />
		<T.DirectionalLight position={[-5, 0, -5]} intensity={5.0} />

		<BackgroundEffect />
		<LogoScene bind:waveTrigger />
	</Canvas>
</div>
