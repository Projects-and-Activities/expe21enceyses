<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import { draw } from 'svelte/transition';

	import AnnotatedBorderedContainer from '$lib/components/AnnotatedBorderedContainer.svelte';
	import AsciiLogo from '$lib/components/ascii-logo/AsciiLogo.svelte';
	import ProgramSection from '$lib/components/ProgramSection.svelte';
	import ScrollReveal from '$lib/components/ScrollReveal.svelte';

	let showUnderline = $state(false);

	function viewportTrigger(node: HTMLElement) {
		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				setTimeout(() => {
					showUnderline = true;
				}, 700);
				observer.disconnect();
			}
		});

		observer.observe(node);

		return {
			destroy() {
				observer.disconnect();
			}
		};
	}

	const STACK_OFFSET = 80;

	const programSections = [
		{
			title: 'The Hackfest',
			subtitle: 'Engineer solutions that move communities forward.',
			bg: 'bg-neutral-200 dark:bg-neutral-800'
		},
		{
			title: 'Practicum/Job Fair',
			subtitle: 'Land opportunities where your career begins.',
			bg: 'bg-neutral-100 dark:bg-neutral-900'
		},
		{
			title: 'Company Talks',
			subtitle: 'Unlock what it takes to thrive in tech.',
			bg: 'bg-neutral-50 dark:bg-neutral-950 dark:brightness-80'
		}
	];
</script>

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
				<img src="https://placehold.co/610x343" alt="" />
			</AnnotatedBorderedContainer>
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
								src="../../static/images/logo.png"
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

		<div class="right-0 -bottom-36 ml-auto anchor/bottom-hand lg:absolute">
			<AnnotatedBorderedContainer
				annotation="INDUSTRY"
				annotationAlign="top-right"
				color="green"
				size="xs"
			>
				<img src="https://placehold.co/555x453" alt="" />
			</AnnotatedBorderedContainer>
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
				<AsciiLogo />
			</ScrollReveal>
		</div>
	</section>

	<section class="flex flex-col *:text-6xl md:pb-32">
		<ScrollReveal delay="200ms">
			<div>
				Experience the <span class="relative inline-block" use:viewportTrigger>
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
