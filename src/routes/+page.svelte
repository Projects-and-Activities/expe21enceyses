<script lang="ts">
	import { ChevronsDown } from '@lucide/svelte';
	import { gsap } from 'gsap';
	import { onMount } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import { draw } from 'svelte/transition';

	import { viewport } from '$lib/actions/viewport';
	import ctalksImg from '$lib/assets/ctalks.png?enhanced';
	import hackfestImg from '$lib/assets/hackfest.png?enhanced';
	import leftHandImg from '$lib/assets/hand_transparent_left.png?enhanced';
	import rightHandImg from '$lib/assets/hand_transparent_right.png?enhanced';
	import logoImg from '$lib/assets/logo.png?enhanced';
	import pfjfImg from '$lib/assets/pfjf.png?enhanced';
	import LogoScene from '$lib/components/3d-ascii/sections/LogoScene.svelte';
	import AnnotatedBorderedContainer from '$lib/components/AnnotatedBorderedContainer.svelte';
	import GlassCard from '$lib/components/GlassCard.svelte';
	import ProgramSection from '$lib/components/ProgramSection.svelte';
	import ScrollReveal from '$lib/components/ScrollReveal.svelte';
	import Star from '$lib/components/Star.svelte';

	let showUnderline = $state(false);

	let curtainContainer: HTMLDivElement;
	let leftHand: HTMLImageElement;
	let rightHand: HTMLImageElement;

	onMount(() => {
		if (!curtainContainer) return;

		const tl = gsap.timeline();
		const bars = curtainContainer.children;

		// Slide bars
		tl.to(
			bars,
			{
				y: '-1%',
				duration: 0.06,
				ease: 'none'
			},
			0.5
		);

		tl.to(bars, {
			y: '-100%',
			duration: (i) => 0.7 + i * 0.06,
			ease: 'power2.in',
			stagger: 0
		});

		// Hands
		tl.from(
			leftHand,
			{
				x: -200,
				duration: 2,
				ease: 'power4.out',
				force3D: true
			},
			0.86
		);

		tl.from(
			rightHand,
			{
				x: 200,
				duration: 2,
				ease: 'power4.out',
				force3D: true
			},
			0.86
		);
	});

	const programSections = [
		{
			title: 'The Hackfest',
			subtitle: 'Engineer solutions that move communities forward.',
			bg: 'bg-primary/5 dark:bg-primary/15 backdrop-blur-sm',
			img: hackfestImg
		},
		{
			title: 'Practicum/Job Fair',
			subtitle: 'Land the opportunities that launch your career.',
			bg: 'bg-neutral-50/80 dark:bg-primary/10 backdrop-blur-md',
			img: pfjfImg
		},
		{
			title: 'Company Talks',
			subtitle: 'Unlock what it takes to thrive in tech.',
			bg: 'bg-neutral-50/90 dark:bg-primary/5  backdrop-blur-lg',
			img: ctalksImg
		},
		{
			title: '',
			subtitle: '',
			bg: '',
			img: ''
		}
	];
</script>

<div bind:this={curtainContainer} class="pointer-events-none fixed inset-0 z-9999 flex">
	<div class="flex-[0.16] border-r border-neutral-800 bg-neutral-900"></div>
	<div class="flex-1 border-r border-neutral-800 bg-neutral-900"></div>
	<div class="flex-1 border-r border-neutral-800 bg-neutral-900"></div>
	<div class="flex-1 border-r border-neutral-800 bg-neutral-900"></div>
	<div class="flex-1 border-r border-neutral-800 bg-neutral-900"></div>
	<div class="flex-[0.16] border-r border-neutral-800 bg-neutral-900"></div>
</div>

<div class="pointer-events-none fixed inset-0 -z-10 h-screen overflow-hidden">
	<div
		class="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-purple-400/20 mix-blend-multiply blur-[120px]"
	></div>
	<div
		class="absolute -right-[10%] -bottom-[10%] h-[40%] w-[40%] rounded-full bg-purple-400/20 mix-blend-multiply blur-[120px]"
	></div>
	<div
		class="absolute top-1/2 left-1/2 h-[50%] w-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-400/10 blur-[100px]"
	></div>
</div>

<main class="space-y-36 [&>section]:container [&>section]:mx-auto [&>section]:px-4">
	<section
		class="relative flex max-w-none! flex-col place-content-center place-items-center gap-4 overflow-x-clip px-0! not-xs:mb-16 lg:mt-74 lg:grid"
	>
		<div class="-top-74 left-0 mr-auto lg:absolute">
			<AnnotatedBorderedContainer
				annotation="ACADEME"
				annotationAlign="bottom-left"
				color="red"
				size="xs"
			>
				<div class="aspect-610/343 h-70 w-auto max-w-[calc(100dvw-0.25rem)] sm:w-132">
					<enhanced:img
						bind:this={leftHand}
						src={leftHandImg}
						fetchpriority="high"
						alt="Left Hand"
						class="
					pointer-events-none
					absolute
					top-[22%]
					-left-20
					z-10
					w-130
					-translate-y-1/2
						-rotate-15
				"
					/>
				</div>
			</AnnotatedBorderedContainer>
		</div>

		<AnnotatedBorderedContainer
			annotation="XX/2026 - XX/2026"
			annotationAlign="bottom-center"
			color="primary"
			size="sm"
			class="z-10 w-fit text-center anchor/bridge-anchor not-md:border-none not-md:[&_#annotation]:hidden"
		>
			<div class="font-light md:hidden md:text-xl">XX/2026 - XX/2026</div>
			<h1
				class="z-50 grid place-content-center text-center font-serif tracking-tight opacity-80 *:leading-12 xs:*:leading-20 lg:p-4"
			>
				<ScrollReveal delay="1000ms">
					<div>Expe21ence</div>
				</ScrollReveal>

				<ScrollReveal delay="1200ms" class="mx-auto">
					<div class="mx-auto flex place-items-center gap-1">
						YSES
						<AnnotatedBorderedContainer
							annotation="YSES"
							annotationAlign="bottom-right"
							color="primary"
							size="xs"
						>
							<enhanced:img
								src={logoImg}
								alt=""
								class="aspect-square size-16 p-1 lg:size-24"
							/>
						</AnnotatedBorderedContainer>
					</div>
				</ScrollReveal>
			</h1>

			<ScrollReveal delay="1600ms" class="absolute -top-6 right-0 hidden  text-sm lg:block"
				>est. 2005</ScrollReveal
			>
			<ScrollReveal
				delay="1800ms"
				class="absolute top-18 -right-52 z-10 hidden max-w-50 translate-y-8 text-left leading-tight text-balance not-md:hidden! supports-[not(anchor-name:--a)]:block"
			>
				<p>Bridging Future Software Engineers of the 21st Century</p>
			</ScrollReveal>
		</AnnotatedBorderedContainer>

		<ScrollReveal
			delay="1800ms"
			class="anchored-bottom-left/bottom-hand -top-anchor-center-10 left-anchor-right-2 z-50 hidden max-w-50 leading-tight text-balance supports-[not(anchor-name:--a)]:hidden! md:anchored-bottom-right/bridge-anchor md:top-anchor-center-0 md:block"
		>
			<p>Bridging Future Software Engineers of the 21st Century</p>
		</ScrollReveal>

		<div class="relative top-0 right-0 ml-auto anchor/bottom-hand lg:absolute lg:top-48">
			<AnnotatedBorderedContainer
				annotation="INDUSTRY"
				annotationAlign="top-right"
				color="green"
				size="xs"
			>
				<div
					class="aspect-610/343 h-70 w-auto max-w-[calc(100dvw-0.25rem)] sm:w-132 lg:h-100"
				>
					<enhanced:img
						bind:this={rightHand}
						src={rightHandImg}
						fetchpriority="high"
						alt="Right Hand"
						class="
					pointer-events-none
					absolute
					top-0
					-right-16
					z-20
					w-130
					-rotate-[7deg]
				"
					/>
				</div>
			</AnnotatedBorderedContainer>
		</div>
	</section>

	<section class="flex flex-col">
		<div class="space-y-4 text-xs font-light [&_p]:max-w-67.5 [&_p]:text-justify">
			<ScrollReveal delay="200ms">
				<p class="mb-8 text-left! text-xl font-normal text-balance md:hidden">
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

		<ScrollReveal delay="650ms" class="mx-auto">
			<button
				onclick={() =>
					document
						.getElementById('for-21')
						?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
				class="mt-20 animate-bounce cursor-pointer transition-transform hover:translate-y-1"
				aria-label="Scroll to next section"
			>
				<ChevronsDown size={30} />
			</button>
		</ScrollReveal>
	</section>

	<div class="relative overflow-x-clip">
		<Star class="-top-14 left-12 z-auto! w-30  rotate-50" />
		<Star class="top-0 -left-24 z-auto! w-55  rotate-50" />
		<Star class="top-42 -left-26 z-auto! w-30  rotate-50" />

		<Star class="-right-18 -bottom-8 z-auto! w-35 -rotate-15" />
		<Star class="right-8 -bottom-12 z-auto! w-15 rotate-50" />
		<section id="for-21" class="relative container mx-auto px-4 not-md:overflow-x-clip">
			<GlassCard
				class="relative z-50 grid place-content-center gap-20 px-16 py-12 lg:grid-cols-2 lg:justify-between xl:py-24"
			>
				<div
					class="z-0 my-auto flex h-fit flex-col gap-6 text-wrap not-lg:place-items-center xl:px-16 [&_p]:text-justify [&_p]:font-light md:[&_p]:text-lg"
				>
					<ScrollReveal delay="200ms" class="mb-4 text-6xl">
						<h2 class="text-nowrap not-xs:text-center">
							For <span class="font-bold text-primary">21 Years,</span>
						</h2>
					</ScrollReveal>

					<ScrollReveal delay="300ms">
						<p>
							the Young Software Engineers' Society (YSES) has been at the forefront
							of promoting software engineering and <span
								class="font-bold text-primary"
							>
								bridging the gap between the academe and the industry.
							</span>
						</p>
					</ScrollReveal>

					<ScrollReveal delay="500ms">
						<p>
							<span class="font-bold text-primary">
								EXPE21ENCE YSES: Bridging Future Software Engineers of the 21st
								Century
							</span>
							continues this mission by equipping students with the skills, network, and
							experience they need to become holistic software engineers in a rapidly evolving
							digital world.
						</p>
					</ScrollReveal>
				</div>

				<div class=" size-full">
					<ScrollReveal delay="500ms" class="h-full min-h-64">
						<LogoScene />
					</ScrollReveal>
				</div>
			</GlassCard>
		</section>
	</div>
	<section class="flex flex-col *:text-5xl xs:*:text-6xl md:pb-24">
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

	<div class="w-full px-0!">
		{#each programSections as section, i (section.title)}
			<ProgramSection
				title={section.title}
				subtitle={section.subtitle}
				class=" w-full rounded-t-4xl pb-20   xs:pb-12 {section.bg}  top-20 mb-100 h-[calc(100dvh-5rem)] last:mb-0 last:*:hidden! nth-last-2:mb-0! xs:top-20! xs:h-[min(1104px,calc(100dvh-5rem))]!"
				style="
				z-index: {i};
            "
			>
				<enhanced:img
					src={section.img}
					class="size-100 brightness-200"
					width="600"
					height="600"
				/>
			</ProgramSection>
		{/each}
	</div>
</main>
