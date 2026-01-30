<script>
	import Facebook from './icons/Facebook.svelte';
	import Github from './icons/Github.svelte';
	import Instagram from './icons/Instagram.svelte';
	import LinkedIn from './icons/LinkedIn.svelte';
	import X from './icons/X.svelte';
	import YouTube from './icons/YouTube.svelte';

	import invertedLogo from '$lib/assets/colored-logo-inverted.png?enhanced';
	import coloredLogo from '$lib/assets/colored-logo.png?enhanced';
	import { CLOUDINARY_IMAGES } from '$lib/cloudinary/constants';
</script>

<footer class="bg-background p-8 not-xs:pb-16 not-lg:px-0">
	<div class="container mx-auto flex flex-col place-items-center gap-4 md:flex-row">
		<enhanced:img
			src={CLOUDINARY_IMAGES.coloredLogo ? CLOUDINARY_IMAGES.coloredLogo : coloredLogo}
			class="block size-16 dark:hidden"
			loading="lazy"
			decoding="async"
			alt="Logo"
		/>

		<enhanced:img
			src={CLOUDINARY_IMAGES.coloredLogoInverted ? CLOUDINARY_IMAGES.coloredLogoInverted : invertedLogo}
			class="hidden size-16 dark:block"
			loading="lazy"
			decoding="async"
			alt="Logo"
		/>

		<div class="not-md:text-center">
			<h3 class="text-lg">Young Software Engineers' Society</h3>
			<div class="text-sm">University of the Philippines Los Baños</div>
		</div>
		<div class="flex w-fit flex-col-reverse not-md:place-items-center not-md:gap-y-12 md:ml-auto">
			<div class="flex gap-1 not-md:scale-120">
				<LinkedIn />
				<Github />
				<Facebook />
				<X />
				<YouTube />
				<Instagram />
			</div>
			<div>info@yses.org / +63 932 796 3292</div>
		</div>
	</div>
</footer>
