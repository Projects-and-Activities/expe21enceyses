<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import type { Group } from 'three';

	import AsciiCanvas from '$lib/components/3d-ascii/containers/AsciiCanvas.svelte';
	import FloatingParticles from '$lib/components/3d-ascii/effects/FloatingParticles.svelte';
	import ShockwaveEffect from '$lib/components/3d-ascii/effects/ShockwaveEffect.svelte';
	import Logo from '$lib/components/3d-ascii/models/Logo.svelte';

	let waveTrigger = $state(0);
	let logoRef: Group | undefined = $state();

	function triggerShockwave() {
		waveTrigger = Date.now();
	}
</script>

{#snippet registerLights()}
	<T.AmbientLight intensity={0.5} />
	<T.DirectionalLight position={[5, 5, 5]} intensity={1.2} />
	<T.PointLight position={[-2, 1, 2]} intensity={0.8} color="#ffffff" distance={10} />
{/snippet}

<div
	class="relative h-full cursor-pointer transition-transform select-none active:scale-95"
	onpointerdown={triggerShockwave}
	onkeydown={() => {}}
	role="button"
	tabindex="0"
>
	<AsciiCanvas dpr={1} lights={registerLights}>
		<T.PerspectiveCamera makeDefault position={[0, 0, 24]} fov={25}>
			<OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
		</T.PerspectiveCamera>

		<ShockwaveEffect object={logoRef} bind:trigger={waveTrigger} />

		<FloatingParticles mode="static" count={200} />

		<Logo bind:ref={logoRef} rotation={[Math.PI / 4, 0, 0]} />
	</AsciiCanvas>
</div>
