<script lang="ts">
	import { gsap } from 'gsap';
	import { cubicOut } from 'svelte/easing';
	import { draw } from 'svelte/transition';

	import { viewport } from '$lib/actions/viewport';
	import LogoScene from '$lib/components/3d-ascii/sections/LogoScene.svelte';
	import AnnotatedBorderedContainer from '$lib/components/AnnotatedBorderedContainer.svelte';
	import ProgramSection from '$lib/components/ProgramSection.svelte';
	import ScrollReveal from '$lib/components/ScrollReveal.svelte';

	let showUnderline = $state(false);

	let curtainContainer: HTMLDivElement;
	let leftHand: HTMLImageElement;
	let rightHand: HTMLImageElement;

	$effect(() => {
		if (!curtainContainer) return;

        const tl = gsap.timeline();
        const bars = curtainContainer.children;

        // Slide bars
        tl.to(bars, {
            y: '-1%',
            duration: 0.06,
            ease: "none"
        }, 0.5);

        tl.to(bars, {
            y: '-100%',
            duration: (i) => 0.7 + (i * 0.06), 
            ease: "power2.in", 
            stagger: 0
        });

        // Hands
        tl.from(leftHand, {
            x: -200,
            duration: 2,
            ease: "power4.out",
            force3D: true
        }, 0.86);

        tl.from(rightHand, {
            x: 200,
            duration: 2,
            ease: "power4.out",
            force3D: true
        }, 0.86);
    });

	const STACK_OFFSET = 80;

	const programSections = [
		{
			title: 'The Hackfest',
			subtitle: 'Engineer solutions that move communities forward.',
			bg: 'bg-neutral-200 dark:bg-neutral-800'
		},
		{
			title: 'Practicum/Job Fair',
			subtitle: 'Land the opportunities that launch your career.',
			bg: 'bg-neutral-100 dark:bg-neutral-900'
		},
		{
			title: 'Company Talks',
			subtitle: 'Unlock what it takes to thrive in tech.',
			bg: 'bg-neutral-50 dark:bg-neutral-950 dark:brightness-80'
		}
	];
</script>

<div
	bind:this={curtainContainer}
	class="fixed inset-0 z-[9999] flex pointer-events-none"
>
    <div class="flex-[0.16] bg-neutral-900 border-r border-neutral-800"></div>
	<div class="flex-1 bg-neutral-900 border-r border-neutral-800"></div>
	<div class="flex-1 bg-neutral-900 border-r border-neutral-800"></div>
	<div class="flex-1 bg-neutral-900 border-r border-neutral-800"></div>
	<div class="flex-1 bg-neutral-900 border-r border-neutral-800"></div>
	<div class="flex-[0.16] bg-neutral-900 border-r border-neutral-800"></div>
</div>

<main class="space-y-36 not-lg:*:px-4 [&>section]:container [&>section]:mx-auto">
	<section
		class="flex max-w-none! flex-col place-content-center place-items-center gap-4 lg:mt-60 lg:grid"
	>
		<div class="top-0 left-0 mr-auto lg:absolute">
			<AnnotatedBorderedContainer
				annotation="ACADEME"
				annotationAlign="bottom-left"
				color="red"
				size="xs"
			>
				<div class="aspect-[610/343] w-[610px] max-w-full"></div>
			</AnnotatedBorderedContainer>
			<img
				bind:this={leftHand}
				src="/images/hand_transparent_left.png"
				alt="Left Hand"
				class="
					absolute
					-w-[520px]
					-left-[80px]
					top-[22%]
					-translate-y-1/2
					-rotate-[15deg]
					z-10
					pointer-events-none
				"
			/>
		</div>

		<AnnotatedBorderedContainer
			annotation="XX/2026 - XX/2026"
			annotationAlign="bottom-center"
			color="primary"
			size="sm"
			class="z-10 w-fit text-center anchor/bridge-anchor not-lg:border-none not-lg:[&_#annotation]:hidden"
		>
			<div class="font-light md:text-xl lg:hidden">XX/2026 - XX/2026</div>
			<h1
				class="grid place-content-center text-center font-serif tracking-tight *:leading-12 xs:*:leading-20 lg:p-4"
			>
				<ScrollReveal>
					<div>EXPE21ENCE</div>
				</ScrollReveal>

				<ScrollReveal delay="200ms" class="mx-auto">
					<div class="mx-auto flex place-items-center gap-1">
						YSES
						<AnnotatedBorderedContainer
							annotation="YSES"
							annotationAlign="bottom-right"
							color="primary"
							size="xs"
						>
							<enhanced:img
								src="$images/logo.png"
								alt=""
								class="aspect-square size-16 p-1 lg:size-24"
							/>
						</AnnotatedBorderedContainer>
					</div>
				</ScrollReveal>
			</h1>

			<ScrollReveal delay="600ms" class="absolute -top-6 right-0 hidden  text-sm lg:block"
				>est. 2005</ScrollReveal
			>
			<ScrollReveal
				delay="800ms"
				class="absolute top-1/2 -right-52 z-10 hidden max-w-50 translate-y-8 text-left leading-tight text-balance not-lg:hidden! supports-[not(anchor)]:block"
			>
				<p>Bridging Future Software Engineers of the 21st Century</p>
			</ScrollReveal>
		</AnnotatedBorderedContainer>

		<ScrollReveal
			delay="800ms"
			class="anchored-bottom-left/bottom-hand -top-anchor-center-10 left-anchor-right-2 z-50 max-w-50 leading-tight text-balance supports-[not(anchor)]:hidden lg:anchored-bottom-right/bridge-anchor"
		>
			<p>Bridging Future Software Engineers of the 21st Century</p>
		</ScrollReveal>

		<div class="right-0 -bottom-36 ml-auto anchor/bottom-hand lg:absolute relative overflow-hidden">
			<AnnotatedBorderedContainer
				annotation="INDUSTRY"
				annotationAlign="top-right"
				color="green"
				size="xs"
			>
				<div class="aspect-[555/453] w-[555px] max-w-full"></div>
			</AnnotatedBorderedContainer>
			<img
				bind:this={rightHand}
				src="/images/hand_transparent_right.png"
				alt="Right Hand"
				class="
					absolute
					w-[520px]
					-right-[40px]
					top-[55%]
					-translate-y-1/2
					-rotate-[7deg]
					z-20
					pointer-events-none
				"
			/>
		</div>
	</section>

	<section>
		<div class="space-y-4 text-xs font-light [&_p]:max-w-67.5 [&_p]:text-justify">
			<ScrollReveal delay="200ms">
				<p class="mb-8 text-left! text-xl font-normal text-balance lg:hidden">
					Bridging Future Software Engineers of the 21st Century
				</p>
			</ScrollReveal>
			<ScrollReveal delay="200ms">
				<p>
					Learn directly from industry professionals and alumni about careers,
					technologies, and building impact in the 21st century.
				</p>
			</ScrollReveal>

			<div class="flex gap-4">
				<ScrollReveal delay="400ms" class="border-r pr-4">
					<p>
						Design and develop AI‑driven solutions for Philippine communities through a
						bracketed hackathon.
					</p>
				</ScrollReveal>

				<ScrollReveal delay="500ms">
					<p>
						Explore internships, OJT placements, and entry‑level roles with partner
						companies.
					</p>
				</ScrollReveal>
			</div>
		</div>
	</section>

	<section class="grid place-content-center gap-20 lg:grid-cols-2 lg:justify-between lg:p-16">
		<div
			class="my-auto flex h-fit flex-col gap-6 not-lg:place-items-center [&>p]:text-justify [&>p]:text-lg [&>p]:font-light"
		>
			<ScrollReveal delay="200ms" class="mb-4 text-6xl">
				<h2>
					For <span class="font-bold text-primary">21 Years,</span>
				</h2>
			</ScrollReveal>

			<ScrollReveal delay="300ms">
				<p>
					the Young Software Engineers' Society (YSES) has been at the forefront of
					promoting software engineering and <span class="font-bold text-primary">
						bridging the gap between the academe and the industry.
					</span>
				</p>
			</ScrollReveal>

			<ScrollReveal delay="500ms">
				<p>
					<span class="font-bold text-primary">
						EXPE21ENCE YSES: Bridging Future Software Engineers of the 21st Century
					</span>
					continues this mission by equipping students with the skills, network, and experience
					they need to become holistic software engineers in a rapidly evolving digital world.
				</p>
			</ScrollReveal>
		</div>

		<div class="aspect-square size-full">
			<ScrollReveal delay="500ms" class="h-full">
				<LogoScene />
			</ScrollReveal>
		</div>
	</section>

	<section class="flex flex-col *:text-6xl md:pb-32">
		<ScrollReveal delay="200ms">
			<div>
				Experience the <span
					class="relative inline-block"
					use:viewport={{
						onEnter: () => (showUnderline = true),
						delay: 700
					}}
				>
					future
					{#if showUnderline}
						<svg
							class="absolute top-full left-0 mt-1 h-0.5 w-full overflow-visible"
							viewBox="0 0 100 4"
							preserveAspectRatio="none"
						>
							<path
								d="M0,2 L100,2"
								stroke="var(--color-primary)"
								stroke-width="4"
								fill="none"
								in:draw={{ duration: 400, easing: cubicOut }}
							/>
						</svg>
					{/if}
				</span>,
			</div>
		</ScrollReveal>
		<ScrollReveal delay="300ms" class="ml-auto w-fit">
			<div>
				built for and by <span class="font-bold text-primary">you.</span>
			</div>
		</ScrollReveal>
	</section>

	<div class="w-full space-y-100 px-0!">
		{#each programSections as section, i (section.title)}
			<ProgramSection
				title={section.title}
				subtitle={section.subtitle}
				class="w-full rounded-t-4xl pb-20 not-xs:min-h-dvh! {section.bg} not-xs:top-4!"
				style="
				z-index: {i};
                top: {i * STACK_OFFSET}px; 
                min-height: min(calc(100dvh - {i * STACK_OFFSET}px), 1104px);
            "
			/>
		{/each}
	</div>
</main>
