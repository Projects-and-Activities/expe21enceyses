<script lang="ts">
	import Bell from '@lucide/svelte/icons/bell';
	import ChevronsDown from '@lucide/svelte/icons/chevrons-down';
	import MapPin from '@lucide/svelte/icons/map-pin';
	import Monitor from '@lucide/svelte/icons/monitor';
	import Users from '@lucide/svelte/icons/users';
	import Mic from '@lucide/svelte/icons/mic';

	import { LiquidGlass } from 'liquid-glass-svelte';
	import { mode } from 'mode-watcher';
	import { viewport } from '$lib/actions/viewport';
	import ScrollReveal from '$lib/components/ScrollReveal.svelte';
	import Star from '$lib/components/Star.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import CompanyTalksRegisterScene from '$lib/components/3d-ascii/sections/CompanyTalksRegisterScene.svelte';
	import CompanyTalksScene from '$lib/components/3d-ascii/sections/CtalksScene.svelte';

	// reactive states
	let isSceneVisible = false;

	// CSSLength type for LiquidGlass
	type CSSLength = `${number}${'px' | 'rem' | 'em' | '%' | 'vh' | 'vw'}`;

	interface GlassOptions {
		mainBlur: CSSLength;
		mainBackgroundColor: string;
		edgeBlur: CSSLength;
		edgeBackgroundColor: string;
		edgeWidth: CSSLength;
	}

	// reactive dark mode
	let isDark = mode.current === 'dark';

	// define GLASS_OPTIONS as a let first, then update reactively
	let GLASS_OPTIONS: GlassOptions = {
		mainBlur: '0.4rem' as CSSLength,
		mainBackgroundColor: 'rgba(0,0,0,0.1)',
		edgeBlur: '0.5rem' as CSSLength,
		edgeBackgroundColor: 'rgba(100,100,100,0.5)',
		edgeWidth: '0.01rem' as CSSLength
	};

	// reactive update whenever dark mode changes
	$: GLASS_OPTIONS = {
		mainBlur: '0.4rem' as CSSLength,
		mainBackgroundColor: isDark ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.4)',
		edgeBlur: '0.5rem' as CSSLength,
		edgeBackgroundColor: isDark ? 'rgba(100,100,100,0.5)' : 'rgba(255,255,255,0.8)',
		edgeWidth: '0.01rem' as CSSLength
	};

	// Gradient border for key sections
	$: BORDER_GRADIENT = isDark
		? 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.05) 100%)'
		: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.1) 100%)';

	// Content
	const keyDetails = [
		{
			icon: Users,
			description: 'High school and college students interested in tech careers'
		},
		{
			icon: Mic,
			description: 'Live company-led talks and Q&A sessions'
		},
		{
			icon: Monitor,
			description: 'Software engineering, AI, startups, and industry careers'
		},
		{
			icon: MapPin,
			description: 'University of the Philippines Los Baños'
		},
		{
			icon: Users,
			description: 'Ideal for software engineering'
		}
	];

	const registrationSteps = [
		{
			Icon: Bell,
			title: 'Register',
			description: 'Sign up through the official EXPE21ENCE YSES registration page.'
		},
		{
			Icon: Mic,
			title: 'Attend the Talks',
			description: 'Join live sessions led by industry professionals.'
		},
		{
			Icon: Users,
			title: 'Engage',
			description: 'Participate in Q&A sessions and network with speakers.'
		}
	];
</script>

<!-- =====================
     BACKGROUND GRADIENT CIRCLES
===================== -->
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

<!-- =====================
     HERO SECTION
===================== -->
<section class="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
	<div class="absolute inset-0 -z-10">
		<CompanyTalksScene />
	</div>

	<div class="z-10 max-w-4xl space-y-6">
		<ScrollReveal delay="300ms">
			<div class="text-3xl font-semibold md:text-5xl">EXPE21ENCE YSES:</div>
		</ScrollReveal>
		<ScrollReveal delay="400ms">
			<div class="text-5xl font-bold md:text-7xl">Company Talks</div>
		</ScrollReveal>
		<ScrollReveal delay="500ms">
			<div class="text-xl">Learn directly from industry professionals</div>
		</ScrollReveal>

		<ScrollReveal delay="600ms">
			<Button variant="gradient" size="xl">Register Now</Button>
		</ScrollReveal>

		<ScrollReveal delay="650ms">
			<button
				onclick={() =>
					document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })}
				class="mt-20 animate-bounce"
			>
				<ChevronsDown size={30} />
			</button>
		</ScrollReveal>
	</div>
</section>

<!-- =====================
     OVERVIEW
===================== -->
<section
	id="overview"
	class="relative flex scroll-mt-36 flex-col gap-4 text-center md:scroll-mt-64 lg:mt-[20rem]"
>
	<Star
		class="bottom-20 -left-30 h-[261px] w-[255px] rotate-44 opacity-20 blur-[1px] dark:opacity-40"
	/>

	<Star class="bottom-12 -left-40 w-22 rotate-250 opacity-20 blur-[1px] dark:opacity-40" />
	<Star class="-bottom-30 -left-16 w-62 rotate-10 opacity-40 dark:opacity-80" />
	<Star class="top-50 -left-30 w-20 -rotate-50 opacity-30 blur-[4px] dark:opacity-60" />
	<Star class="-top-8 -right-40 w-28 rotate-12 opacity-50 dark:opacity-90" />
	<Star class="top-1/2 -right-28 w-28 -rotate-0 opacity-35 blur-sm dark:opacity-70" />
	<ScrollReveal delay="100ms">
		<div
			class="mx-auto rounded-[1.5625rem] p-px shadow-xl"
			style={`background: ${BORDER_GRADIENT}`}
		>
			<LiquidGlass
				class="relative block h-full w-full !overflow-visible rounded-[1.5rem] p-8"
				options={GLASS_OPTIONS}
			>
				<h2 class="mb-4 text-2xl font-semibold text-primary">Overview</h2>
				<p class="leading-relaxed text-foreground/90">
					<strong>EXPE21ENCE YSES: Company Talks</strong> is a curated series of talks an d
					interactive Q&A sessions where industry professionals share real-world perspectives
					on working in the tech industry today. As part of EXPE21ENCE YSES, it reinforces the
					organization's 21-year mission of bridging the gap between the academe and the industry—helping
					the students understand how their skills, values, and education translate into real
					impact.
				</p>
			</LiquidGlass>
		</div>
	</ScrollReveal>
</section>
<!-- =====================
     INSIDE THE SESSIONS
===================== -->
<section class="mx-auto w-[996px]">
	<!-- 3-COLUMN GRID -->
	<div class="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:items-center">
		<!-- LEFT COLUMN -->
		<div class="mt-0 flex flex-col items-center gap-30 rounded-[1.5625rem] shadow-xl">
			<div style={`background: ${BORDER_GRADIENT}`} class="rounded-[1.5625rem]">
				{@render detailCard(keyDetails[0])}
			</div>
			<div style={`background: ${BORDER_GRADIENT}`} class="rounded-[1.5625rem]">
				{@render detailCard(keyDetails[2])}
			</div>
		</div>

		<!-- CENTER COLUMN -->
		<div
			class="= flex flex-col items-center gap-20 rounded-[1.5625rem] p-px text-center shadow-xl"
		>
			<!-- HEADER -->
			<ScrollReveal>
				<h2 class="text-3xl font-semibold text-white">Inside the Sessions</h2>
				<p class="mt-2 text-sm text-white/80 italic">Where theory meets practice.</p>
			</ScrollReveal>

			<!-- CENTER IMAGE -->
			<img
				style={`background: ${BORDER_GRADIENT}`}
				src="/images/company-talks/session-preview.png"
				alt="Session preview"
				class="h-[467px] w-[425px] rounded-xl shadow-2xl"
			/>

			<!-- CENTER CARD -->
			<div style={`background: ${BORDER_GRADIENT}`} class="rounded-[1.5625rem]">
				{@render detailCard(keyDetails[4])}
			</div>
		</div>

		<!-- RIGHT COLUMN -->
		<div class="mt-0 flex flex-col items-center gap-30 rounded-[1.5625rem] shadow-xl">
			<div style={`background: ${BORDER_GRADIENT}`} class="rounded-[1.5625rem]">
				{@render detailCard(keyDetails[1])}
			</div>
			<div style={`background: ${BORDER_GRADIENT}`} class="rounded-[1.5625rem]">
				{@render detailCard(keyDetails[3])}
			</div>
		</div>
	</div>
</section>

{#snippet detailCard(detail)}
	<LiquidGlass
		class="relative h-[252px] w-[317px] !overflow-visible rounded-[28px] pt-10 pb-6 text-center"
		options={GLASS_OPTIONS}
	>
		<!-- Icon -->
		<svelte:component this={detail.icon} class="mx-auto mb-6 h-[96px] w-[96px] text-primary" />

		<!-- Text -->
		<p class="mx-auto max-w-[260px] text-sm leading-relaxed text-white/90">
			{detail.description}
		</p>
	</LiquidGlass>
{/snippet}

<!-- =====================
     REGISTRATION STEPS
===================== -->
<section class="mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 py-20 text-center">
	<ScrollReveal>
		<h2 class="mb-12 text-3xl font-bold">How to Join</h2>
	</ScrollReveal>

	<div class="grid w-full gap-8 sm:grid-cols-2 lg:grid-cols-3">
		{#each registrationSteps as step, i}
			<ScrollReveal>
				<div class="flex flex-col items-center space-y-4">
					<div
						class="mx-auto flex h-12 w-12 items-center justify-center rounded-full border text-lg font-bold"
					>
						{i + 1}
					</div>
					<svelte:component this={step.Icon} class="mx-auto h-6 w-6 text-primary" />
					<h3 class="font-semibold">{step.title}</h3>
					<p class="text-sm text-muted-foreground">{step.description}</p>
				</div>
			</ScrollReveal>
		{/each}
	</div>

	<ScrollReveal>
		<div
			class="mt-12 h-[300px]"
			use:viewport={{ onEnter: () => (isSceneVisible = true), threshold: 0.2 }}
		>
			{#if isSceneVisible}
				<CompanyTalksRegisterScene />
			{/if}
		</div>
	</ScrollReveal>

	<ScrollReveal delay="500ms">
		<Button variant="gradient" size="register" class="mt-6">Register</Button>
	</ScrollReveal>
</section>
