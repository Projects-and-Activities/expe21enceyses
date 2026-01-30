<script lang="ts">
	import Plus from '@lucide/svelte/icons/plus';
	import X from '@lucide/svelte/icons/x';
	import { mode } from 'mode-watcher';
	import { Spring } from 'svelte/motion';

	import starImage from '$lib/assets/star.png';
	import ScrollReveal from '$lib/components/ScrollReveal.svelte';
	import * as Accordion from '$lib/components/ui/accordion';

	let isDark = $derived(mode.current === 'dark');

	let springX = new Spring(0, { stiffness: 0.05, damping: 0.25 });
	let springY = new Spring(0, { stiffness: 0.05, damping: 0.25 });

	function handleMouseMove(e: MouseEvent) {
		if (typeof window !== 'undefined') {
			springX.target = (e.clientX / window.innerWidth) * 2 - 1;
			springY.target = (e.clientY / window.innerHeight) * 2 - 1;
		}
	}

	type Spark = {
		id: number;
		x: number;
		y: number;
		tx: number;
		ty: number;
		scale: number;
		color: string;
	};

	let sparks = $state<Spark[]>([]);
	let sparkId = 0;

	function handleClick(e: MouseEvent) {
		const count = 8;
		const colors = isDark
			? ['#ffffff', '#e0b0ff', '#b379ff']
			: ['#7f52bb', '#b379ff', '#494949'];

		for (let i = 0; i < count; i++) {
			const id = sparkId++;
			const angle = Math.random() * Math.PI * 2;
			const velocity = 30 + Math.random() * 50;

			const spark: Spark = {
				id,
				x: e.clientX,
				y: e.clientY,
				tx: Math.cos(angle) * velocity,
				ty: Math.sin(angle) * velocity,
				scale: 0.5 + Math.random(),
				color: colors[Math.floor(Math.random() * colors.length)]
			};

			sparks.push(spark);

			setTimeout(() => {
				sparks = sparks.filter((s) => s.id !== id);
			}, 800);
		}
	}

	const ACCORDION_BG_GRADIENT =
		'linear-gradient(180deg, rgba(245, 243, 250, 0.08) 0%, rgba(250, 248, 253, 0.04) 50%, rgba(245, 243, 250, 0.08) 100%)';

	const ACCORDION_BORDER_GRADIENT = $derived(
		isDark
			? 'linear-gradient(180deg, rgba(73, 73, 73, 0.15) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(73, 73, 73, 0.15) 100%)'
			: 'linear-gradient(180deg, rgba(73, 73, 73, 0.1) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(73, 73, 73, 0.1) 100%)'
	);

	const ACCORDION_SHADOW = '0 0 2px rgba(245, 243, 250, 0.3)';

	// Hover state (lighter/more visible)
	const ACCORDION_BG_GRADIENT_HOVER =
		'linear-gradient(180deg, rgba(245, 243, 250, 0.12) 0%, rgba(250, 248, 253, 0.06) 50%, rgba(245, 243, 250, 0.12) 100%)';

	// Active/Open state (most visible)
	const ACCORDION_BG_GRADIENT_ACTIVE =
		'linear-gradient(180deg, rgba(245, 243, 250, 0.16) 0%, rgba(250, 248, 253, 0.08) 50%, rgba(245, 243, 250, 0.16) 100%)';

	const ACCORDION_BORDER_GRADIENT_ACTIVE =
		'linear-gradient(180deg, rgba(73, 73, 73, 0.5) 0%, rgba(255, 255, 255, 0.6) 50%, rgba(73, 73, 73, 0.4) 100%)';

	const ACCORDION_SHADOW_ACTIVE = '0 0 4px rgba(245, 243, 250, 0.4)';

	// template lng yung laman neto will change it later
	const faqs = [
		{
			id: 'faq-1',
			question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
			answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut vestibulum elit. Sed accumsan, lectus ut consequat auctor, ligula metus consectetur diam, a mattis nisl erat in eros. Aliquam tincidunt ipsum diam. Sed sodales cursus nisi, ac fringilla velit sollicitudin eget. In in nisl suscipit, tristique justo vel, hendrerit sapien.'
		},
		{
			id: 'faq-2',
			question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
			answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut vestibulum elit. Sed accumsan, lectus ut consequat auctor, ligula metus consectetur diam.'
		},
		{
			id: 'faq-3',
			question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
			answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut vestibulum elit. Sed accumsan, lectus ut consequat auctor, ligula metus consectetur diam.'
		},
		{
			id: 'faq-4',
			question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
			answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut vestibulum elit. Sed accumsan, lectus ut consequat auctor, ligula metus consectetur diam.'
		},
		{
			id: 'faq-5',
			question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
			answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut vestibulum elit. Sed accumsan, lectus ut consequat auctor, ligula metus consectetur diam.'
		},
		{
			id: 'faq-6',
			question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
			answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut vestibulum elit. Sed accumsan, lectus ut consequat auctor, ligula metus consectetur diam.'
		},
		{
			id: 'faq-7',
			question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
			answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut vestibulum elit. Sed accumsan, lectus ut consequat auctor, ligula metus consectetur diam.'
		}
	];

	let openValue = $state<string | undefined>(undefined);
</script>

<svelte:window onmousemove={handleMouseMove} onclick={handleClick} />

<div class="pointer-events-none fixed inset-0 z-50 overflow-hidden">
	{#each sparks as spark (spark.id)}
		<div
			class="absolute rounded-full"
			style="
				left: {spark.x}px; 
				top: {spark.y}px; 
				width: {spark.scale * 4}px; 
				height: {spark.scale * 4}px; 
				background-color: {spark.color};
				box-shadow: 0 0 {spark.scale * 4}px {spark.color};
				--tx: {spark.tx}px;
				--ty: {spark.ty}px;
				animation: spark-burst 0.8s ease-out forwards;
			"
		></div>
	{/each}
</div>

<!-- this is the dots stars that you see in the bg -->
<div class="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
	<!-- slow stars -->
	<div
		class="absolute inset-0"
		style="transform: translate({springX.current * 20}px, {springY.current * 20}px);"
	>
		<div class="stars-layer-1"></div>
	</div>

	<!-- slightly faster stars -->
	<div
		class="absolute inset-0"
		style="transform: translate({springX.current * 40}px, {springY.current * 40}px);"
	>
		<div class="stars-layer-2"></div>
	</div>

	<!-- fast stars -->
	<div
		class="absolute inset-0"
		style="transform: translate({springX.current * 60}px, {springY.current * 60}px);"
	>
		<div class="stars-layer-3"></div>
	</div>
</div>

<!-- bg gradient-->
<div class="pointer-events-none fixed inset-0 -z-10 h-screen overflow-hidden">
	<div
		class="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-purple-400/20 mix-blend-multiply blur-[100px]"
	></div>
	<div
		class="absolute -right-[10%] -bottom-[10%] h-[40%] w-[40%] rounded-full bg-purple-400/20 mix-blend-multiply blur-[120px]"
	></div>
	<div
		class="absolute top-1/2 left-1/2 h-[50%] w-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-400/10 blur-[100px]"
	></div>
</div>

<section class="relative mt-32 flex flex-col items-center gap-4 px-4 lg:mt-40 lg:px-0">
	<!-- star 1 small blurry, top-left near title -->
	{@render star(
		'top-16 -left-16 w-8 rotate-20 blur-[3px] opacity-50 dark:opacity-70 hidden lg:block'
	)}
	<!-- star 2 large 4-pointed sharp, top-right of title -->
	{@render star(
		'top-2 -right-50 w-40 blur-[2px] -rotate-15 opacity-70 dark:opacity-90 hidden lg:block'
	)}

	<ScrollReveal delay="100ms">
		<h1
			class="text-center font-[Lexend] text-4xl font-medium tracking-normal text-foreground md:text-5xl lg:text-[64px] lg:leading-[100%] dark:[text-shadow:0_0_4px_rgba(253,253,252,0.5)]"
		>
			Frequently Asked Questions
		</h1>
	</ScrollReveal>

	<ScrollReveal delay="200ms">
		<p class="text-center text-muted-foreground">
			Find answers to questions regarding EXPE21ENCE YSES
		</p>
	</ScrollReveal>
</section>

<section class="relative mx-auto mt-12 max-w-3xl px-4 lg:mt-16 lg:px-0">
	<!-- star 3 medium, left side, upper accordion -->
	{@render star(
		'top-1 -left-60 w-30 -rotate-25 blur-[2px] opacity-45 dark:opacity-65 hidden lg:block'
	)}
	<!-- star 4, large sharp - right side, middle accordion -->
	{@render star('top-[40%] -right-40 w-24 rotate-12 opacity-55 dark:opacity-80 hidden lg:block')}
	<!-- star 5, small blurred - left side, lower accordion -->
	{@render star(
		'bottom-32 -left-55 w-20 rotate-35 blur-[4px] opacity-35 dark:opacity-55 hidden lg:block'
	)}
	<!-- star 6, large sharp, bottom-right -->
	{@render star(
		'-bottom-50 -right-32 w-50 -rotate-50 opacity-60 dark:opacity-85 hidden lg:block'
	)}
	{@render star(
		'top-16 -left-40 w-90 rotate-20 blur-[0px] opacity-50 dark:opacity-70 hidden lg:block'
	)}
	<ScrollReveal delay="300ms">
		<Accordion.Root type="single" bind:value={openValue} class="flex flex-col gap-4">
			{#each faqs as faq, i (faq.id)}
				{@const isOpen = openValue === faq.id}
				<Accordion.Item value={faq.id} class="group border-0">
					<div
						role="group"
						class="relative overflow-hidden rounded-2xl p-px transition-all duration-200"
						style="background: {isOpen
							? ACCORDION_BG_GRADIENT_ACTIVE
							: ACCORDION_BG_GRADIENT}; box-shadow: {isOpen
							? ACCORDION_SHADOW_ACTIVE
							: ACCORDION_SHADOW};"
						onmouseenter={(e) => {
							if (!isOpen) {
								e.currentTarget.style.background = ACCORDION_BG_GRADIENT_HOVER;
							}
						}}
						onmouseleave={(e) => {
							if (!isOpen) {
								e.currentTarget.style.background = ACCORDION_BG_GRADIENT;
							}
						}}
					>
						<div
							class="pointer-events-none absolute inset-px z-10 rounded-[calc(1rem-1px)] opacity-30"
							style="background: {isOpen
								? ACCORDION_BORDER_GRADIENT_ACTIVE
								: ACCORDION_BORDER_GRADIENT};"
						></div>
						<div
							class="relative block h-full w-full overflow-visible rounded-2xl bg-background/40 backdrop-blur-sm"
						>
							<Accordion.Trigger
								class="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left text-lg font-medium text-foreground transition-colors hover:no-underline md:text-xl [&>svg]:hidden"
							>
								<span class="flex-1">{faq.question}</span>
								<span
									class="flex size-6 shrink-0 items-center justify-center text-muted-foreground"
								>
									{#if isOpen}
										<X class="size-4" />
									{:else}
										<Plus class="size-4" />
									{/if}
								</span>
							</Accordion.Trigger>

							<Accordion.Content
								class="overflow-hidden px-5 text-sm text-muted-foreground md:text-base"
							>
								<div class="pb-4">
									{faq.answer}
								</div>
							</Accordion.Content>
						</div>
					</div>
				</Accordion.Item>
			{/each}
		</Accordion.Root>
	</ScrollReveal>
</section>

<section class="relative mx-auto mt-16 max-w-3xl px-4 pb-16 lg:mt-20 lg:px-0">
	<ScrollReveal delay="400ms">
		<div class="space-y-4 text-sm text-muted-foreground">
			<p>
				Should you have more inquiries regarding event information, guidelines and mechanics
				do not hesitate to contact either of the following:
			</p>

			<ul class="list-inside list-disc space-y-1">
				<li>
					Email: <a href="mailto:sample@email.com" class="text-primary hover:underline"
						>sample@email.com</a
					>
				</li>
				<li>
					Contact Number:
					<ul class="ml-6 list-inside list-disc">
						<li>FirstName LastName: +639XXXXXXXXX</li>
					</ul>
				</li>
			</ul>
		</div>
	</ScrollReveal>
</section>

{#snippet star(className: string)}
	{@const duration = (3 + Math.random() * 4).toFixed(2) + 's'}
	{@const delay = (Math.random() * -5).toFixed(2) + 's'}

	<div class="pointer-events-none absolute -z-10 select-none {className}">
		<img
			src={starImage}
			alt=""
			style="animation-duration: {duration}; animation-delay: {delay};"
			class="star-anim block h-full w-full object-contain"
		/>
	</div>
{/snippet}
