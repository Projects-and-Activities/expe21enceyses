<script>
	import Facebook from './icons/Facebook.svelte';
	import Github from './icons/Github.svelte';
	import Instagram from './icons/Instagram.svelte';
	import LinkedIn from './icons/LinkedIn.svelte';
	import X from './icons/X.svelte';
	import YouTube from './icons/YouTube.svelte';
</script>

<footer class="bg-card px-16 py-8">
	<div class="flex place-items-center gap-4">
		<enhanced:img src="../../../static/images/colored-logo.png" />
		<div>
			<h3>Young Software Engineers' Society</h3>
			<div>University of the Philippines Los Baños</div>
		</div>
		<div class="ml-auto w-fit">
			<div class="flex gap-1">
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
