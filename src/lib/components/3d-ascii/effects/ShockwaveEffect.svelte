<script lang="ts">
	import { useTask } from '@threlte/core';
	import { Mesh, MeshStandardMaterial, DoubleSide, type Object3D } from 'three';

	import { SCENE_COLOR } from '../constants';

	let {
		object,
		trigger = $bindable(0) // The timestamp trigger
	}: {
		object?: Object3D;
		trigger?: number;
	} = $props();

	const uniforms = { uTime: { value: 0 } };

	useTask(() => {
		if (trigger === 0) return;
		const timeSinceClick = (Date.now() - trigger) / 1000;

		if (timeSinceClick >= 0 && timeSinceClick < 10) {
			uniforms.uTime.value = timeSinceClick;
		} else {
			uniforms.uTime.value = 0;
			trigger = 0; // Reset trigger
		}
	});

	$effect(() => {
		if (object) {
			object.traverse((child) => {
				if ((child as Mesh).isMesh) {
					const m = child as Mesh;

					// Create the custom material
					const mat = new MeshStandardMaterial({
						color: SCENE_COLOR,
						roughness: 0.2,
						metalness: 0.5,
						side: DoubleSide
					});

					// Inject Shader Logic
					mat.onBeforeCompile = (shader) => {
						shader.uniforms.uTime = uniforms.uTime;

						shader.vertexShader = shader.vertexShader.replace(
							'#include <common>',
							`#include <common>\nvarying vec3 vPos;`
						);
						shader.vertexShader = shader.vertexShader.replace(
							'#include <begin_vertex>',
							`#include <begin_vertex>\nvPos = position;`
						);
						shader.fragmentShader = shader.fragmentShader.replace(
							'#include <common>',
							`#include <common>\nuniform float uTime;\nvarying vec3 vPos;`
						);
						shader.fragmentShader = shader.fragmentShader.replace(
							'#include <color_fragment>',
							`#include <color_fragment>
							 float dist = length(vPos);
							 float radius = 8.0 * uTime;
							 float thickness = 4.0;
							 float glow = exp(-pow(dist - radius, 2.0) / thickness);
							 if (uTime > 0.0) {
							   float darkenFactor = clamp(1.0 - (glow * 1.5), 0.2, 1.0);
							   diffuseColor.rgb *= darkenFactor;
							 }`
						);
					};

					m.material = mat;
				}
			});
		}
	});
</script>
