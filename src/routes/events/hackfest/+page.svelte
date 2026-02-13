<script lang="ts">
  import {
    Bell,
    ChevronsDown,
    CloudUpload,
    MapPin,
    Monitor,
    Search,
    SquarePen,
    Users,
    CircleStar,
    Medal,
    Trophy
  } from '@lucide/svelte';
  import { type Component } from 'svelte';

  import { viewport } from '$lib/actions/viewport';
  import { asciiState } from '$lib/components/3d-ascii/ascii.svelte';
  import { ASCII_CHARS_FULL, ASCII_CHARS_SAFE } from '$lib/components/3d-ascii/constants';
  import HackfestRegisterScene from '$lib/components/3d-ascii/sections/HackfestRegisterScene.svelte';
  import HackfestScene from '$lib/components/3d-ascii/sections/HackfestScene.svelte';
  import GlassCard from '$lib/components/GlassCard.svelte';
  import ScrollReveal from '$lib/components/ScrollReveal.svelte';
  import Star from '$lib/components/Star.svelte';
  import Button from '$lib/components/ui/button/button.svelte';

  $effect(() => {
    asciiState.currentChars = ASCII_CHARS_FULL;

    return () => {
      asciiState.currentChars = ASCII_CHARS_SAFE;
    };
  });

  let selectedHackfest = $state<'junior' | 'senior'>('junior');
  let isSceneVisible = $state(false);

  const content = {
    junior: {
      highlight: 'Junior HackFest',
      text: 'introduces high school students to software engineering by guiding through the end‑to‑end design and development of FlutterFlow applications. Teams will identify community problems, translate them into user‑centered app ideas, and build working prototypes that responsibly integrate AI to support more sustainable, inclusive, and resilient local communities.'
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
          'Maximum of three teams per school, with 3–4 students from Grades 7–12 and 1 team coach per team.',
        senior: 'College students, teams of 3–4 members'
      }
    },
    {
      icon: Monitor,
      title: 'Platform',
      description: {
        junior: 'MIT App Inventor',
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
        'Asynchronous proposal development and on-site showcase at the University of the Philippines Los Baños'
    }
  ];

  const podium = [
    {
      rank: '1st Runner-Up',
      amount: '₱5,000',
      Icon: Medal,
      height: 'h-48 md:h-80',
      cardStyle: 'bg-purple-900/70 dark:border-purple-500/50 text-white',
      pillStyle: 'bg-white/10 text-white',
      iconStyle: 'text-purple-300/20',
      delay: '400ms',
      order: 'order-1'
    },
    {
      rank: 'Champion',
      amount: '₱8,000',
      Icon: Trophy,
      height: 'h-60 md:h-96',
      cardStyle:
        'bg-purple-600/60 dark:border-purple-400/50 shadow-[0_0_50px_-12px_rgba(147,51,234,0.5)] text-white',
      pillStyle: 'dark:bg-white/20 text-white backdrop-blur-md',
      iconStyle: 'text-purple-300/20',
      delay: '600ms',
      order: 'order-2',
      isCenter: true
    },
    {
      rank: '2nd Runner-Up',
      amount: '₱3,000',
      Icon: CircleStar,
      height: 'h-40 md:h-64',
      cardStyle: 'bg-purple-900/50 dark:border-purple-500/30 text-white',
      pillStyle: 'bg-white/10 text-white',
      iconStyle: 'text-purple-300/20',
      delay: '200ms',
      order: 'order-3'
    }
  ];

  const registrationSteps = [
    {
      id: 'register',
      Icon: SquarePen,
      title: 'Register'
    },
    {
      id: 'submit',
      Icon: CloudUpload,
      title: 'Submit Your Details',
      description:
        'Fill out the form, upload the necessary requirements, pay the registration fee, and submit your application.'
    },
    {
      id: 'await',
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
    <Button
      onclick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })}
      variant="gradient"
      size="xl">Register Now</Button
    >
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

<section id="overview" class="relative flex flex-col gap-4 text-center">
  <Star class="bottom-12 -left-40 w-30 rotate-40 opacity-20 blur-[1px] dark:opacity-40" />
  <Star class="-bottom-30 -left-16 w-62 rotate-10 opacity-40 dark:opacity-80" />
  <Star class="top-50 -left-30 w-20 -rotate-50 opacity-30 blur-[4px] dark:opacity-60" />
  <Star class="-top-8 -right-40 w-28 rotate-12 opacity-50 dark:opacity-90" />
  <Star class="top-1/2 -right-28 w-28 -rotate-0 opacity-35 blur-sm dark:opacity-70" />

  <ScrollReveal delay="100ms">
    <GlassCard>
      <div class="mb-4 text-center text-2xl font-semibold text-primary">Overview</div>
      <p
        class="text-justify leading-relaxed text-balance text-foreground/90 lg:text-center lg:text-xl"
      >
        <span class="font-semibold"> EXPE21ENCE YSES: The HackFest </span>
        <span class="font-light">
          is a bracketed hackathon for high school and college students to ideate, design, and build
          AI‑driven software that addresses real issues faced by Philippine communities and helps
          make them more sustainable, inclusive, and resilient—focusing on livable cities and
          communities, from climate resilience and public health to quality education, inclusive
          livelihoods, and good governance.
        </span>
      </p>
    </GlassCard>
  </ScrollReveal>
</section>

<section class="relative mt-0! flex flex-col items-center gap-10 text-center">
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

    <ScrollReveal delay="200ms" class="mt-12">
      <h2 class="font-semibold">Key Details</h2>
    </ScrollReveal>

    <div class="mt-6 grid grid-cols-1 grid-rows-4 gap-5 md:grid-cols-2 md:grid-rows-2">
      {#each keyDetails as keyDetail, i (keyDetail.title)}
        {@const { icon, title, description } = keyDetail}

        {@const displayDescription =
          typeof description === 'string' ? description : description[selectedHackfest]}

        <ScrollReveal delay={`${200 + i * 50}ms`} class="h-full">
          {@render details(icon, title, displayDescription)}
        </ScrollReveal>
      {/each}
    </div>
  </div>
</section>

<!-- <section class="relative"> -->
<!--   <Star class="top-60 -right-18 w-28 -rotate-0 opacity-35 dark:opacity-100" /> -->
<!--   <Star class="top-1/2 -right-28 w-28 -rotate-0 opacity-35 blur-sm dark:opacity-70" /> -->
<!--   <Star class="top-1/2 -left-40 w-28 -rotate-0 opacity-35 blur-sm dark:opacity-70" /> -->
<!--   <Star class="top-0 -left-40 w-62 rotate-40 opacity-20 dark:opacity-100" /> -->
<!---->
<!--   <div class="container mx-auto px-4"> -->
<!--     <ScrollReveal> -->
<!--       <h2 class="mb-12 text-center font-semibold">Prizes</h2> -->
<!--     </ScrollReveal> -->
<!---->
<!--     <div class="flex flex-row items-end justify-center gap-3 md:gap-8"> -->
<!--       {#each podium as spot (spot.rank)} -->
<!--         <ScrollReveal -->
<!--           delay={spot.delay} -->
<!--           class="{spot.order} flex w-1/3 max-w-[280px] flex-col items-center" -->
<!--         > -->
<!--           <div class="mb-3 text-center md:mb-4"> -->
<!--             <span class="block text-lg font-bold tracking-tight md:text-4xl"> -->
<!--               {spot.amount} -->
<!--             </span> -->
<!--           </div> -->
<!---->
<!--           <div -->
<!--             class="relative w-full rounded-2xl border shadow-lg backdrop-blur-md transition-all duration-500 hover:-translate-y-2 md:rounded-3xl {spot.height} {spot.cardStyle}" -->
<!--           > -->
<!--             <div -->
<!--               class="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/20 to-transparent md:rounded-3xl dark:from-white/10" -->
<!--             ></div> -->
<!---->
<!--             <div class="absolute top-4 left-1/2 w-full -translate-x-1/2 px-2 text-center md:top-6"> -->
<!--               <span -->
<!--                 class="inline-block rounded-full px-2 py-1 text-[8px] font-semibold tracking-wider whitespace-nowrap md:px-4 md:py-1.5 md:text-base {spot.pillStyle}" -->
<!--               > -->
<!--                 {spot.rank} -->
<!--               </span> -->
<!--             </div> -->
<!---->
<!--             <div class="absolute bottom-4 left-1/2 -translate-x-1/2 md:bottom-6 {spot.iconStyle}"> -->
<!--               <spot.Icon class="size-8 md:size-12" /> -->
<!--             </div> -->
<!--           </div> -->
<!--         </ScrollReveal> -->
<!--       {/each} -->
<!--     </div> -->
<!---->
<!--     <ScrollReveal delay="800ms" class="mt-16 text-center md:mt-20"> -->
<!--       <h3 class="mb-2 text-xl font-semibold md:text-2xl">Special Awards</h3> -->
<!--       <p class="text-sm text-purple-900/80 md:text-lg dark:text-purple-200/80"> -->
<!--         Most Innovative Idea, Best Presentation, People's Choice -->
<!--       </p> -->
<!--     </ScrollReveal> -->
<!--   </div> -->
<!-- </section> -->

<section class="relative">
  <Star class="bottom-12 -left-40 w-62 rotate-40 opacity-20 dark:opacity-40" />
  <Star class="-bottom-30 -left-46 w-32 rotate-10 opacity-40 blur-[6px] dark:opacity-80" />

  <ScrollReveal delay="200ms" class="flex flex-col items-center gap-5">
    <h2 class="font-semibold">Guidelines</h2>
    <p class="text-center leading-relaxed text-foreground/90">
      Before joining, please review our guidelines to ensure a smooth and successful experience at
      EXPE21ENCE YSES: The HackFest. These guidelines cover everything you need to know about
      registration, participation requirements, and the overall process for our event. Click the
      button below to open the full document.
    </p>

    <Button
      href="https://www.canva.com/design/DAHAK8Ynb8k/ErmEbungfLCbjSSKvdhcMw/view?utm_content=DAHAK8Ynb8k&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h39dd491aff"
      variant="gradient"
      target="_blank"
      rel="noopener noreferrer"
      size="xl">See Guidelines</Button
    >
  </ScrollReveal>
</section>

<section id="register" class="relative flex scroll-mt-30 flex-col items-center gap-5">
  <Star class="-top-8 -right-40 w-28 rotate-12 opacity-50 dark:opacity-90" />
  <Star class="top-1/2 -right-28 w-28 -rotate-0 opacity-35 blur-sm dark:opacity-70" />

  <ScrollReveal delay="50ms">
    <h2 class="text-center font-semibold">Register for The Hackfest</h2>
  </ScrollReveal>
  <ScrollReveal delay="100ms">
    <p class="-mt-4 text-center font-light text-foreground/90">
      Take your first step toward ideating, designing, and building for communities.
    </p>
  </ScrollReveal>

  <div class="mt-8 flex flex-col gap-5 md:flex-row">
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
      <div class="grid grid-cols-[auto_1fr] gap-x-6 gap-y-8 px-4">
        {#each registrationSteps as step, i (step.title)}
          {@const { Icon, title } = step}

          <ScrollReveal delay={`${300 + i * 50}ms`} class="place-self-center">
            <Icon class="size-12 text-primary" />
          </ScrollReveal>

          <ScrollReveal delay={`${300 + i * 50}ms`}>
            <div class="flex flex-col gap-1">
              <span class="text-xl font-bold">{title}</span>
              <p class="font-lexend text-justify font-light">
                {#if step.id === 'register'}
                  {@render registerStepContent()}
                {:else}
                  {step.description}
                {/if}
              </p>
            </div>
          </ScrollReveal>
        {/each}
      </div>

      <ScrollReveal delay="500ms" class="mx-auto my-12 w-fit">
        <Button href="/register" variant="gradient" size="xl" disabled>Register</Button>
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
  <GlassCard class=" h-full ">
    <div class="grid h-full place-content-center gap-4">
      <Icon class="mx-auto size-7" />

      <div class="space-y-2">
        <h3 class="text-xl font-semibold tracking-tight">{title}</h3>
        <p class="leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  </GlassCard>
{/snippet}

{#snippet registerStepContent()}
  Go to
  <a class="text-primary hover:underline" aria-disabled="true" role="link" tabindex="-1">register</a
  >
  and under the Hackfest registration page, choose "{selectedHackfest === 'junior'
    ? 'Junior'
    : 'Senior'} Hackfest" to begin your registration.
{/snippet}
