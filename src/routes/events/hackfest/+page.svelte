<script lang="ts">
	import Bell from '@lucide/svelte/icons/bell';
	import ChevronsDown from '@lucide/svelte/icons/chevrons-down';
	import CloudUpload from '@lucide/svelte/icons/cloud-upload';
	import MapPin from '@lucide/svelte/icons/map-pin';
	import Monitor from '@lucide/svelte/icons/monitor';
	import Search from '@lucide/svelte/icons/search';
	import SquarePen from '@lucide/svelte/icons/square-pen';
	import Users from '@lucide/svelte/icons/users';
	import { LiquidGlass } from 'liquid-glass-svelte';
	import { type Component } from 'svelte';

	import HackfestRegisterScene from '$lib/components/3d-ascii/sections/HackfestRegisterScene.svelte';
	import HackfestScene from '$lib/components/3d-ascii/sections/HackfestScene.svelte';
	import ScrollReveal from '$lib/components/ScrollReveal.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	let selectedHackfest = $state<'junior' | 'senior'>('junior');

	const GLASS_OPTIONS = {
		mainBlur: '0.28rem',
		mainBackgroundColor: 'rgba(255, 255, 255, 0.4)',
		edgeBlur: '0.8rem',
		edgeBackgroundColor: 'rgba(255, 255, 255, 0.8)',
		edgeWidth: '0.5rem',
		sheenBlur: '5rem',
		sheenBackgroundColor: 'rgba(255, 255, 255, 0.5)',
		sheenWidth: '2rem'
	} as const;

	const content = {
		junior: {
			highlight: 'Junior HackFest',
			text: 'introduces high school students to software engineering by guiding them through the end‑to‑end design and development of FlutterFlow applications. Teams will identify community problems, translate them into user‑centered app ideas, and build working prototypes that responsibly integrate AI to support more sustainable, inclusive, and resilient local communities.'
		},
		senior: {
			highlight: 'Senior HackFest',
			text: 'Senior HackFest challenges college students to engineer full software solutions—web or mobile—that leverage AI and open‑source practices to respond to the needs of Philippine communities. Participants will experience the full software development lifecycle, from ideation and UI/UX design to implementation, deployment, and pitching projects that contribute to more sustainable, inclusive, and resilient local communities.'
		}
	};

	const keyDetails = [
		{
			icon: Users,
			title: 'Who can join',
			description:
				'Grade 7–12 students, teams of 3–4 from the same school and 1 team coach (maximum of 3 per school)'
		},
		{
			icon: Monitor,
			title: 'Platform',
			description: 'FlutterFlow'
		},
		{
			icon: Search,
			title: 'Focus',
			description: 'AI-Driven Solutions for Sustainable Communities'
		},
		{
			icon: MapPin,
			title: 'Format',
			description:
				'Asynchronous proposal development + on-site showcase at the University of the Philippines Los Baños'
		}
	];

	const registrationSteps = [
		{
			Icon: SquarePen,
			title: 'Register',
			description:
				'Go to [link] and under the Hackfest registration page, choose “Junior Hackfest” to begin your registration.'
		},
		{
			Icon: CloudUpload,
			title: 'Submit Your Details',
			description:
				'Fill out the form, upload the necessary requirements, pay the registration fee, and submit your application.'
		},
		{
			Icon: Bell,
			title: 'Await Confirmation',
			description:
				'Once your team has submitted your application, wait for a confirmation email to secure your entry.'
		}
	];
</script>

<main
	class="w-full space-y-36 overflow-x-hidden overflow-y-hidden not-lg:*:px-4 lg:px-50 [&>section]:container [&>section]:mx-auto"
>
	<div class="pointer-events-none fixed inset-0 -z-10 h-screen overflow-hidden">
		<div
			class="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-purple-400/20 mix-blend-multiply blur-[120px]"
		></div>
		<div
			class="absolute -right-[10%] -bottom-[10%] h-[40%] w-[40%] rounded-full bg-indigo-400/20 mix-blend-multiply blur-[120px]"
		></div>
		<div
			class="absolute top-1/2 left-1/2 h-[50%] w-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-200/10 blur-[100px]"
		></div>
	</div>

	<section
		class="mt-50 flex max-w-none! flex-col place-content-center place-items-center gap-9 lg:mt-20 lg:grid lg:h-screen"
	>
		<div
			class="absolute inset-0 -z-10 h-screen w-full [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]"
		>
			<HackfestScene />
		</div>

		<h1
			class="grid place-content-center text-center font-[Lexend] font-semibold tracking-normal *:leading-12 xs:*:leading-18"
		>
			<ScrollReveal delay="300ms">
				<div class="text-3xl md:text-5xl">EXPE21ENCE YSES:</div>
			</ScrollReveal>
			<ScrollReveal delay="400ms" class="mx-auto">
				<div class="text-5xl md:text-7xl">The HackFest</div>
			</ScrollReveal>
		</h1>

		<ScrollReveal delay="500ms">
			<div class="text-xl">Ideate, Design and Build</div>
		</ScrollReveal>

		<ScrollReveal delay="600ms">
			<div
				class="mt-2 ml-2 rounded-[3.75rem] p-[0.135rem]"
				style="background: linear-gradient(180deg, var(--muted-foreground) 0%, var(--background) 60%, var(--muted-foreground) 100%);"
			>
				<Button
					variant="gradient"
					size="xl"
					class="register-btn relative isolate overflow-hidden !bg-transparent shadow-[0px_5px_20px_rgba(0,0,0,0.3),inset_0px_1px_0px_rgba(255,255,255,0.6)]"
					onclick={() => console.log('Register clicked')}
				>
					<span class="relative z-10">Register Now</span>
				</Button>
			</div>
		</ScrollReveal>

		<ScrollReveal delay="650ms">
			<button
				onclick={() =>
					document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })}
				class="mt-20 animate-bounce cursor-pointer transition-transform hover:translate-y-1"
				aria-label="Scroll to next section"
			>
				<ChevronsDown size={30} />
			</button>
		</ScrollReveal>
	</section>

	<section
		id="overview"
		class="relative flex scroll-mt-36 flex-col gap-4 text-center md:scroll-mt-64 lg:mt-[20rem]"
	>
		{@render star('bottom-12 -left-40 w-30 rotate-40 blur-[1px] opacity-20 dark:opacity-40')}
		{@render star('-bottom-30 -left-16 w-62 rotate-10 opacity-40 dark:opacity-80')}
		{@render star('top-50 -left-30 w-20 -rotate-50 blur-[4px] opacity-30 dark:opacity-60')}
		{@render star('-top-8 -right-40 w-28 rotate-12 opacity-50 dark:opacity-90')}
		{@render star('top-1/2 -right-28 w-28 -rotate-0 blur-sm opacity-35 dark:opacity-70')}

		<ScrollReveal delay="100ms">
			<LiquidGlass class="mx-auto rounded-3xl p-8" options={GLASS_OPTIONS}>
				<div class="mb-4 text-xl font-semibold text-primary">Overview</div>
				<p class="leading-relaxed text-foreground/90">
					<span class="font-semibold"> EXPE21ENCE YSES: The HackFest </span> is a bracketed
					hackathon for high school and college students to ideate, design, and build AI‑driven
					software that addresses real issues faced by Philippine communities and helps make
					them more sustainable, inclusive, and resilient—focusing on livable cities and communities,
					from climate resilience and public health to quality education, inclusive livelihoods,
					and good governance.
				</p>
			</LiquidGlass>
		</ScrollReveal>
	</section>

	<section class="relative flex flex-col items-center gap-10 text-center">
		{@render star('top-50 -left-54 w-30 -rotate-50 blur-[4px] opacity-30 dark:opacity-60')}

		<ScrollReveal delay="200ms">
			<div class="flex flex-col gap-12">
				<div
					class="flex justify-center gap-14 [&>button]:cursor-pointer [&>button]:text-3xl [&>button]:font-medium [&>button]:lg:text-5xl"
				>
					{@render hackfestTab('junior', 'Junior')}
					{@render hackfestTab('senior', 'Senior')}
				</div>

				<div class="h-72 place-content-center md:h-30">
					<span class="font-bold">
						{selectedHackfest === 'junior'
							? content.junior.highlight
							: content.senior.highlight}
					</span>
					{selectedHackfest === 'junior' ? content.junior.text : content.senior.text}
				</div>
			</div>
		</ScrollReveal>

		<div class="relative">
			{@render star(
				'-top-8 -right-10 w-40 lg:-right-50 lg:w-76 rotate-12 opacity-50 dark:opacity-90 hidden lg:block'
			)}
			{@render star(
				'-top-20 -right-28 w-28 -rotate-0 blur-sm opacity-35 dark:opacity-70 hidden md:block'
			)}
			{@render star(
				'top-50 -right-50 w-28 -rotate-0 blur-[1px] opacity-35 dark:opacity-70 hidden md:block'
			)}

			<ScrollReveal delay="200ms">
				<span class="text-3xl">Key Details</span>
			</ScrollReveal>

			<div class="mt-6 grid grid-cols-1 grid-rows-4 gap-5 md:grid-cols-2 md:grid-rows-2">
				{#each keyDetails as keyDetail, i (keyDetail.title)}
					{@const { icon, title, description } = keyDetail}
					<ScrollReveal delay={`${200 + i * 50}ms`}>
						{@render details(icon, title, description)}
					</ScrollReveal>
				{/each}
			</div>
		</div>
	</section>

	<section class="relative">
		{@render star('bottom-12 -left-40 w-62 rotate-40 opacity-20 dark:opacity-40')}
		{@render star('-bottom-30 -left-46 w-32 rotate-10 blur-[6px] opacity-40 dark:opacity-80')}

		<ScrollReveal delay="200ms" class="flex flex-col items-center gap-5">
			<div class="text-3xl font-semibold">Guidelines</div>
			<p class="text-center leading-relaxed text-foreground/90">
				Before joining, please review our guidelines to ensure a smooth and successful
				experience at EXPE21ENCE YSES: The HackFest. These guidelines cover everything you
				need to know about registration, participation requirements, and the overall process
				for our event. Click the button below to open the full document.
			</p>

			<div
				class="mt-2 ml-2 rounded-[3.75rem] p-[0.125rem]"
				style="background: linear-gradient(180deg, var(--muted-foreground) 0%, var(--background) 60%, var(--muted-foreground) 100%);"
			>
				<Button
					variant="gradient"
					size="xl"
					class="register-btn relative isolate overflow-hidden !bg-transparent shadow-[0px_5px_20px_rgba(0,0,0,0.3),inset_0px_1px_0px_rgba(255,255,255,0.6)]"
					onclick={() => console.log('Register clicked')}
				>
					<span class="relative z-10">See Guidelines</span>
				</Button>
			</div>
		</ScrollReveal>
	</section>

	<section class="relative flex flex-col items-center gap-5">
		{@render star('-top-8 -right-40 w-28 rotate-12 opacity-50 dark:opacity-90')}
		{@render star('top-1/2 -right-28 w-28 -rotate-0 blur-sm opacity-35 dark:opacity-70')}

		<ScrollReveal delay="50ms">
			<div class="text-center text-3xl font-semibold">Register for The Hackfest</div>
		</ScrollReveal>
		<ScrollReveal delay="100ms">
			<p class="-mt-4 text-center leading-relaxed text-foreground/90">
				Take your first step toward ideating, designing, and building for communities.
			</p>
		</ScrollReveal>

		<div class="flex flex-col gap-5 md:flex-row">
			<ScrollReveal delay="200ms" class="w-full shrink-0 md:w-[360px]">
				<HackfestRegisterScene />
			</ScrollReveal>

			<div class="place-items-center">
				<div class="grid grid-cols-[auto_1fr] gap-x-6 gap-y-8">
					{#each registrationSteps as step, i (step.title)}
						{@const { Icon, title, description } = step}
						<ScrollReveal delay={`${300 + i * 50}ms`} class="place-self-center">
							<div class="pt-1 text-primary">
								<Icon class="size-8" />
							</div>
						</ScrollReveal>
						<ScrollReveal delay={`${300 + i * 50}ms`}>
							<div class="flex flex-col gap-1">
								<span class="text-lg font-bold">{title}</span>
								<p class="text-justify leading-relaxed text-muted-foreground">
									{description}
								</p>
							</div>
						</ScrollReveal>
					{/each}
				</div>

				<ScrollReveal delay="500ms">
					<div
						class="my-8 ml-2 rounded-[3.75rem] p-[0.125rem]"
						style="background: linear-gradient(180deg, var(--muted-foreground) 0%, var(--background) 60%, var(--muted-foreground) 100%);"
					>
						<Button
							variant="gradient"
							size="register"
							class="register-btn relative isolate overflow-hidden !bg-transparent shadow-[0px_5px_20px_rgba(0,0,0,0.3),inset_0px_1px_0px_rgba(255,255,255,0.6)]"
							onclick={() => console.log('Register clicked')}
						>
							<span class="relative z-10">Register</span>
						</Button>
					</div>
				</ScrollReveal>
			</div>
		</div>
	</section>
</main>

{#snippet star(className: string)}
	{@const duration = (3 + Math.random() * 4).toFixed(2) + 's'}
	{@const delay = (Math.random() * -5).toFixed(2) + 's'}

	<div class="pointer-events-none absolute -z-10 select-none {className}">
		<img
			src="/star.png"
			alt=""
			style="animation-duration: {duration}; animation-delay: {delay};"
			class="star-anim block h-full w-full object-contain"
		/>
	</div>
{/snippet}

{#snippet hackfestTab(id: 'junior' | 'senior', label: string)}
	<button
		class="relative transition-colors duration-300 {selectedHackfest === id
			? 'text-purple-600 dark:text-[#d8b4fe]'
			: 'text-gray-400 dark:text-[#9ca3af]'}"
		onclick={() => (selectedHackfest = id)}
	>
		<span
			class="block transition-all duration-300 not-lg:text-3xl lg:inline {selectedHackfest ===
			id
				? 'dark:drop-shadow-[0_0_15px_rgba(127,82,187,0.9)]'
				: ''}"
		>
			<span class="font-bold">{label}</span> Hackfest
		</span>

		<svg
			class="absolute top-full left-0 mt-2 h-6 w-full overflow-visible"
			viewBox="0 0 100 4"
			preserveAspectRatio="none"
		>
			<path
				d="M0,2 L100,2"
				stroke="#1f2937"
				stroke-width="1"
				fill="none"
				class="opacity-30 dark:opacity-100"
			/>

			<path
				d="M0,2 L100,2"
				class="origin-center transition-transform duration-300 ease-out {selectedHackfest ===
				id
					? 'scale-x-100'
					: 'scale-x-0'}
				translate-y-[4px] opacity-60 blur-[4px]
				dark:opacity-80"
				stroke="#7F52BB"
				stroke-width="1"
				fill="none"
			/>

			<path
				d="M0,2 L100,2"
				class="origin-center transition-transform duration-300 ease-out {selectedHackfest ===
				id
					? 'scale-x-100'
					: 'scale-x-0'}"
				stroke="#7F52BB"
				stroke-width="1"
				fill="none"
			/>
		</svg>
	</button>
{/snippet}
{#snippet details(Icon: Component, title: string, description: string)}
	<LiquidGlass class="mx-auto h-full rounded-3xl p-10" options={GLASS_OPTIONS}>
		<div class="place-items-center">
			<Icon />
			<article class="mt-5">
				<span class="font-semibold">{title}</span>
				<p>{description}</p>
			</article>
		</div>
	</LiquidGlass>
{/snippet}
