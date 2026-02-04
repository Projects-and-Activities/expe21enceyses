<script lang="ts">
  import {
    // GraduationCap,
    // School,
    Bell,
    ChevronsDown,
    CloudUpload,
    MapPin,
    Monitor,
    Search,
    SquarePen,
    Users
  } from '@lucide/svelte';
  import { type Component } from 'svelte';

  // import { goto } from '$app/navigation';
  import { viewport } from '$lib/actions/viewport';
  import HackfestRegisterScene from '$lib/components/3d-ascii/sections/HackfestRegisterScene.svelte';
  import HackfestScene from '$lib/components/3d-ascii/sections/HackfestScene.svelte';
  import GlassCard from '$lib/components/GlassCard.svelte';
  import ScrollReveal from '$lib/components/ScrollReveal.svelte';
  import Star from '$lib/components/Star.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  // import * as Dialog from '$lib/components/ui/dialog/index.js';

  let selectedHackfest = $state<'junior' | 'senior'>('junior');
  let isSceneVisible = $state(false);
  // let isSelectionOpen = $state(false);

  const content = {
    junior: {
      highlight: 'Junior HackFest',
      text: 'introduces high school students to software engineering by guiding them through the end‑to‑end design and development of FlutterFlow applications. Teams will identify community problems, translate them into user‑centered app ideas, and build working prototypes that responsibly integrate AI to support more sustainable, inclusive, and resilient local communities.'
    },
    senior: {
      highlight: 'Senior HackFest',
      text: 'challenges college students to engineer full software solutions—web or mobile—that leverage AI and open‑source practices to respond to the needs of Philippine communities. Participants will experience the full software development lifecycle, from ideation and UI/UX design to implementation, deployment, and pitching projects that contribute to more sustainable, inclusive, and resilient local communities.'
    }
  };

  type HackfestDetail = {
    icon: Component;
    title: string;
    description: string | { junior: string; senior: string };
  };

  const keyDetails: HackfestDetail[] = [
    {
      icon: Users,
      title: 'Who can join',
      description: {
        junior:
          'Grade 7–12 students, teams of 3–4 from the same school and 1 team coach (maximum of 3 per school)',
        senior: 'College students, teams of 3–4 members'
      }
    },
    {
      icon: Monitor,
      title: 'Platform',
      description: {
        junior: 'FlutterFlow',
        senior: 'Any technology stack'
      }
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
      description: {
        junior:
          'Go to [link] and under the Hackfest registration page, choose “Junior Hackfest” to begin your registration.',
        senior:
          'Go to [link] and under the Hackfest registration page, choose “Senior Hackfest” to begin your registration.'
      }
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
        onclick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span class="relative z-10">Register Now</span>
      </Button>
    </div>
  </ScrollReveal>

  <ScrollReveal delay="650ms">
    <button
      onclick={() => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })}
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
  <Star class="bottom-12 -left-40 w-30 rotate-40 opacity-20 blur-[1px] dark:opacity-40" />
  <Star class="-bottom-30 -left-16 w-62 rotate-10 opacity-40 dark:opacity-80" />
  <Star class="top-50 -left-30 w-20 -rotate-50 opacity-30 blur-[4px] dark:opacity-60" />
  <Star class="-top-8 -right-40 w-28 rotate-12 opacity-50 dark:opacity-90" />
  <Star class="top-1/2 -right-28 w-28 -rotate-0 opacity-35 blur-sm dark:opacity-70" />

  <ScrollReveal delay="100ms">
    <GlassCard
      class="hackfest-card border-2 border-border/50 p-10 transition-all duration-300 ease-in-out hover:border-purple-500/50"
    >
      <div class="mb-4 text-center text-2xl font-semibold text-primary">Overview</div>
      <p class="text-center leading-relaxed text-foreground/90">
        <span class="font-semibold"> EXPE21ENCE YSES: The HackFest </span> is a bracketed hackathon for
        high school and college students to ideate, design, and build AI‑driven software that addresses
        real issues faced by Philippine communities and helps make them more sustainable, inclusive, and
        resilient—focusing on livable cities and communities, from climate resilience and public health
        to quality education, inclusive livelihoods, and good governance.
      </p>
    </GlassCard>
  </ScrollReveal>
</section>

<section class="relative flex flex-col items-center gap-10 text-center">
  <Star class="top-50 -left-54 w-30 -rotate-50 opacity-30 blur-[4px] dark:opacity-60" />

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
          {selectedHackfest === 'junior' ? content.junior.highlight : content.senior.highlight}
        </span>
        {selectedHackfest === 'junior' ? content.junior.text : content.senior.text}
      </div>
    </div>
  </ScrollReveal>

  <div class="relative">
    <Star
      class="-top-8 -right-10 hidden w-40 rotate-12 opacity-50 lg:-right-50 lg:block lg:w-76 dark:opacity-90"
    />
    <Star
      class="-top-20 -right-28 hidden w-28 -rotate-0 opacity-35 blur-sm md:block dark:opacity-70"
    />
    <Star
      class="top-50 -right-50 hidden w-28 -rotate-0 opacity-35 blur-[1px] md:block dark:opacity-70"
    />

    <ScrollReveal delay="200ms">
      <span class="text-3xl">Key Details</span>
    </ScrollReveal>

    <div class="mt-6 grid grid-cols-1 grid-rows-4 gap-5 md:grid-cols-2 md:grid-rows-2">
      {#each keyDetails as keyDetail, i (keyDetail.title)}
        {@const { icon, title, description } = keyDetail}

        {@const displayDescription =
          typeof description === 'string' ? description : description[selectedHackfest]}

        <ScrollReveal delay={`${200 + i * 50}ms`}>
          {@render details(icon, title, displayDescription)}
        </ScrollReveal>
      {/each}
    </div>
  </div>
</section>

<section class="relative">
  <Star class="bottom-12 -left-40 w-62 rotate-40 opacity-20 dark:opacity-40" />
  <Star class="-bottom-30 -left-46 w-32 rotate-10 opacity-40 blur-[6px] dark:opacity-80" />

  <ScrollReveal delay="200ms" class="flex flex-col items-center gap-5">
    <div class="text-3xl font-semibold">Guidelines</div>
    <p class="text-center leading-relaxed text-foreground/90">
      Before joining, please review our guidelines to ensure a smooth and successful experience at
      EXPE21ENCE YSES: The HackFest. These guidelines cover everything you need to know about
      registration, participation requirements, and the overall process for our event. Click the
      button below to open the full document.
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

<section id="register" class="relative flex scroll-mt-30 flex-col items-center gap-5">
  <Star class="-top-8 -right-40 w-28 rotate-12 opacity-50 dark:opacity-90" />
  <Star class="top-1/2 -right-28 w-28 -rotate-0 opacity-35 blur-sm dark:opacity-70" />

  <ScrollReveal delay="50ms">
    <div class="text-center text-3xl font-semibold">Register for The Hackfest</div>
  </ScrollReveal>
  <ScrollReveal delay="100ms">
    <p class="-mt-4 text-center leading-relaxed text-foreground/90">
      Take your first step toward ideating, designing, and building for communities.
    </p>
  </ScrollReveal>

  <div class="flex flex-col gap-5 md:flex-row">
    <div
      class="h-[300px] w-full shrink-0 md:w-[360px]"
      use:viewport={{
        onEnter: () => (isSceneVisible = true),
        threshold: 0.2
      }}
    >
      {#if isSceneVisible}
        <ScrollReveal delay="200ms" class="h-full w-full">
          <HackfestRegisterScene />
        </ScrollReveal>
      {/if}
    </div>

    <div class="place-items-center">
      <div class="grid grid-cols-[auto_1fr] gap-x-6 gap-y-8">
        {#each registrationSteps as step, i (step.title)}
          {@const { Icon, title, description } = step}

          {@const displayDescription =
            typeof description === 'string' ? description : description[selectedHackfest]}

          <ScrollReveal delay={`${300 + i * 50}ms`} class="place-self-center">
            <div class="pt-1 text-primary">
              <Icon class="size-8" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={`${300 + i * 50}ms`}>
            <div class="flex flex-col gap-1">
              <span class="text-lg font-bold">{title}</span>
              <p class="text-justify leading-relaxed text-muted-foreground">
                {displayDescription}
              </p>
            </div>
          </ScrollReveal>
        {/each}
      </div>

      <!-- Comment dialog for now as there could be a registration main hub  -->
      <ScrollReveal delay="500ms">
        <!-- <Dialog.Root bind:open={isSelectionOpen}> -->
        <!-- 	<Dialog.Trigger> -->
        <!-- 		{#snippet child({ props })} -->
        <!-- 			<div -->
        <!-- 				class="my-8 ml-2 rounded-[3.75rem] p-[0.125rem]" -->
        <!-- 				style="background: linear-gradient(180deg, var(--muted-foreground) 0%, var(--background) 60%, var(--muted-foreground) 100%);" -->
        <!-- 			> -->
        <!-- 				<Button -->
        <!-- 					{...props} -->
        <!-- 					variant="gradient" -->
        <!-- 					size="xl" -->
        <!-- 					class="register-btn relative isolate overflow-hidden !bg-transparent shadow-[0px_5px_20px_rgba(0,0,0,0.3),inset_0px_1px_0px_rgba(255,255,255,0.6)]" -->
        <!-- 				> -->
        <!-- 					<span class="relative z-10">Register Now</span> -->
        <!-- 				</Button> -->
        <!-- 			</div> -->
        <!-- 		{/snippet} -->
        <!-- 	</Dialog.Trigger> -->
        <!---->
        <!-- 	<Dialog.Content -->
        <!-- 		class="border-zinc-800 bg-zinc-950/90 backdrop-blur-xl sm:max-w-2xl" -->
        <!-- 	> -->
        <!-- 		<Dialog.Header> -->
        <!-- 			<Dialog.Title class="text-center text-2xl font-bold text-white" -->
        <!-- 				>Choose your Category</Dialog.Title -->
        <!-- 			> -->
        <!-- 			<Dialog.Description class="text-center text-zinc-400"> -->
        <!-- 				Select the Hackfest category that applies to your team. -->
        <!-- 			</Dialog.Description> -->
        <!-- 		</Dialog.Header> -->
        <!---->
        <!-- 		<div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"> -->
        <!-- 			<button -->
        <!-- 				onclick={() => { -->
        <!-- 					isSelectionOpen = false; -->
        <!-- 					goto('/register/junior-hackfest'); -->
        <!-- 				}} -->
        <!-- 				class="group relative flex flex-col items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:border-purple-500/50 hover:bg-zinc-900/80" -->
        <!-- 			> -->
        <!-- 				<div -->
        <!-- 					class="rounded-full bg-purple-500/10 p-4 text-purple-400 transition-colors group-hover:bg-purple-500/20 group-hover:text-purple-300" -->
        <!-- 				> -->
        <!-- 					<School class="size-8" /> -->
        <!-- 				</div> -->
        <!-- 				<div class="text-center"> -->
        <!-- 					<h3 -->
        <!-- 						class="text-lg font-bold text-white group-hover:text-purple-200" -->
        <!-- 					> -->
        <!-- 						Junior Hackfest -->
        <!-- 					</h3> -->
        <!-- 					<p class="text-sm text-zinc-500 group-hover:text-zinc-400"> -->
        <!-- 						For High School Students -->
        <!-- 					</p> -->
        <!-- 				</div> -->
        <!-- 			</button> -->
        <!---->
        <!-- 			<button -->
        <!-- 				onclick={() => { -->
        <!-- 					isSelectionOpen = false; -->
        <!-- 					goto('/register/senior-hackfest'); -->
        <!-- 				}} -->
        <!-- 				class="group relative flex flex-col items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:border-purple-500/50 hover:bg-zinc-900/80" -->
        <!-- 			> -->
        <!-- 				<div -->
        <!-- 					class="rounded-full bg-purple-500/10 p-4 text-purple-400 transition-colors group-hover:bg-purple-500/20 group-hover:text-purple-300" -->
        <!-- 				> -->
        <!-- 					<GraduationCap class="size-8" /> -->
        <!-- 				</div> -->
        <!-- 				<div class="text-center"> -->
        <!-- 					<h3 -->
        <!-- 						class="text-lg font-bold text-white group-hover:text-purple-200" -->
        <!-- 					> -->
        <!-- 						Senior Hackfest -->
        <!-- 					</h3> -->
        <!-- 					<p class="text-sm text-zinc-500 group-hover:text-zinc-400"> -->
        <!-- 						For College Students -->
        <!-- 					</p> -->
        <!-- 				</div> -->
        <!-- 			</button> -->
        <!-- 		</div> -->
        <!-- 	</Dialog.Content> -->
        <!-- </Dialog.Root> -->

        <div
          class="my-8 ml-2 rounded-[3.75rem] p-[0.125rem]"
          style="background: linear-gradient(180deg, var(--muted-foreground) 0%, var(--background) 60%, var(--muted-foreground) 100%);"
        >
          <Button
            variant="gradient"
            size="xl"
            class="register-btn relative isolate overflow-hidden !bg-transparent shadow-[0px_5px_20px_rgba(0,0,0,0.3),inset_0px_1px_0px_rgba(255,255,255,0.6)]"
          >
            <span class="relative z-10">Register Now</span>
          </Button>
        </div>
      </ScrollReveal>
    </div>
  </div>
</section>

{#snippet hackfestTab(id: 'junior' | 'senior', label: string)}
  <button
    class="relative transition-colors duration-300 {selectedHackfest === id
      ? 'text-purple-600 dark:text-[#d8b4fe]'
      : 'text-gray-400 dark:text-[#9ca3af]'}"
    onclick={() => (selectedHackfest = id)}
  >
    <span
      class="block transition-all duration-300 not-lg:text-3xl lg:inline {selectedHackfest === id
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
        class="origin-center transition-transform duration-300 ease-out {selectedHackfest === id
          ? 'scale-x-100'
          : 'scale-x-0'}
>>>>>>> app-stg
				translate-y-[4px] opacity-60 blur-[4px]
				dark:opacity-80"
        stroke="#7F52BB"
        stroke-width="1"
        fill="none"
      />

      <path
        d="M0,2 L100,2"
        class="origin-center transition-transform duration-300 ease-out {selectedHackfest === id
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
  <GlassCard
    class="hackfest-card flex h-full flex-col items-center gap-4 border-2 border-border/50 p-14 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-purple-500/50"
  >
    <div class="">
      <Icon class="size-7" />
    </div>

    <article class="space-y-2 text-center">
      <h3 class="text-xl font-semibold tracking-tight">{title}</h3>
      <p class="leading-relaxed text-muted-foreground">
        {description}
      </p>
    </article>
  </GlassCard>
{/snippet}

<style>
  :global(.hackfest-card:hover) {
    box-shadow:
      0px 2px 10px rgba(0, 0, 0, 0.25) inset,
      0 30px 40px -10px rgba(127, 82, 187, 0.15),
      0 12px 15px -8px rgba(0, 0, 0, 0.2) !important;
  }
</style>
