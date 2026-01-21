<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { useGltf } from '@threlte/extras';
	import { DoubleSide, MeshStandardMaterial, Mesh } from 'three';

	import { SCENE_COLOR } from './constants';

	export let waveTrigger = 0;

	const gltf = useGltf('/3D_logo.glb');

	const uniforms = {
		uTime: { value: 0 }
	};

	useTask(() => {
		if (waveTrigger === 0) return;

		const timeSinceClick = (Date.now() - waveTrigger) / 1000;

		// Run wave for 10 seconds
		if (timeSinceClick >= 0 && timeSinceClick < 10) {
			uniforms.uTime.value = timeSinceClick;
		} else {
			uniforms.uTime.value = 0;
			waveTrigger = 0;
		}
	});

	$: if ($gltf) {
		$gltf.scene.traverse((child) => {
			const m = child as Mesh;
			if (m.isMesh) {
				const mat = new MeshStandardMaterial({
					color: SCENE_COLOR,
					roughness: 0.2,
					metalness: 0.5,
					side: DoubleSide
				});

				mat.onBeforeCompile = (shader) => {
					shader.uniforms.uTime = uniforms.uTime;

					shader.vertexShader = shader.vertexShader.replace(
						'#include <common>',
						`
            #include <common>
            varying vec3 vPos;
            `
					);

					shader.vertexShader = shader.vertexShader.replace(
						'#include <begin_vertex>',
						`
            #include <begin_vertex>
            vPos = position;
            `
					);

					shader.fragmentShader = shader.fragmentShader.replace(
						'#include <common>',
						`
            #include <common>
            uniform float uTime;
            varying vec3 vPos;
            `
					);

					shader.fragmentShader = shader.fragmentShader.replace(
						'#include <color_fragment>',
						`
            #include <color_fragment>
            
            float dist = length(vPos);
            float radius = 8.0 * uTime;
            float thickness = 4.0;
            
            // Calculate the wave shape
            float glow = exp(-pow(dist - radius, 2.0) / thickness);
            
            if (uTime > 0.0) {
              // Clamp logic:
              // 1.0 = Normal Color
              // 0.2 = Darkest Shadow 
              float darkenFactor = clamp(1.0 - (glow * 1.5), 0.2, 1.0);
              
              diffuseColor.rgb *= darkenFactor;
            }
            `
					);
				};

				m.material = mat;
			}
		});
	}
</script>

{#if $gltf}
	<T is={$gltf.scene} rotation.x={Math.PI / 4} position={[0, 0, 0]} />
{/if}
