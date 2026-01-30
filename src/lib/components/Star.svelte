<script lang="ts">
	import starImage from '$lib/assets/star.png';
	import { CLOUDINARY_IMAGES } from '$lib/cloudinary/constants';

	type Props = {
		class?: string;
	};

	let { class: className }: Props = $props();

	const duration = (3 + Math.random() * 4).toFixed(2) + 's';
	const delay = (Math.random() * -5).toFixed(2) + 's';
</script>

<div class="pointer-events-none absolute -z-10 select-none {className}">
	<enhanced:img
		src={CLOUDINARY_IMAGES.star ? CLOUDINARY_IMAGES.star : starImage}
		alt=""
		style="animation-duration: {duration}; animation-delay: {delay};"
		class="star-anim block h-full w-full object-contain"
	/>
</div>
