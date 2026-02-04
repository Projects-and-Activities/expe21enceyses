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
  import dane1 from '$lib/assets/dane1.JPG';
  import dane2 from '$lib/assets/dane2.JPG';
  import dane3 from '$lib/assets/dane3.JPG';
  import microphone from '$lib/assets/ctalks.png';

  import { onMount } from 'svelte';

  onMount(() => {
    isSceneVisible = true;
  });

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

  let BORDER_GRADIENT = $derived(
    isDark
      ? 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 10%, rgba(255,255,255,0.05) 100%)'
      : 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 100%)'
  );

  /* ============================
   GLASS OPTIONS (FOR-21 STYLE)
============================ */
  let GLASS_OPTIONS = $derived(
    isDark
      ? ({
          // for dark mode play around with this until we get the desired effect
          mainBlur: '0.1rem',
          mainBackgroundColor: 'rgba(250, 250, 250, 0.0)',
          edgeBlur: '1rem',
          edgeBackgroundColor: 'rgba(150, 150, 150, 0.0)',
          edgeWidth: '0.15rem',
          sheenBlur: '4rem',
          sheenBackgroundColor: 'rgba(100, 100, 100, 0.05)',
          sheenWidth: '1rem'
        } as const)
      : ({
          // light mode
          mainBlur: '0.5rem',
          mainBackgroundColor: 'rgba(255, 255, 255, 0.2)',
          edgeBlur: '0.5rem',
          edgeBackgroundColor: 'rgba(100, 100, 100, 0.0)',
          edgeWidth: '0.01rem',
          sheenBlur: '4rem',
          sheenBackgroundColor: 'rgba(100, 100, 100, 0.05)',
          sheenWidth: '1rem'
        } as const)
  );

  // Content
  const keyDetails = [
    {
      icon: Users,
      description:
        'Bridges academic learning with real-world industry practice through insights shared by professionals.'
    },
    {
      icon: Mic,
      description:
        'Understand industry expectations, essential skills, and professional readiness for early careers.'
    },
    {
      icon: Monitor,
      description:
        'Gain firsthand knowledge of roles, responsibilities, and realities of working in the tech industry.'
    },
    {
      icon: MapPin,
      description:
        'Engage directly with company representatives through meaningful Q&A and open discussions.'
    },
    {
      icon: Users,
      description:
        'Understand how technology and AI are used in real-world and community-focused solutions.'
    }
  ];

  const registrationSteps = [
    {
      Icon: Bell,
      title: 'Register',
      description: 'Go to [link] and choose "Company Talks" to begin your registration.'
    },
    {
      Icon: Mic,
      title: 'Submit Your Details',
      description:
        'Fill out the form, upload the necessary requirements, and submit your application.'
    },
    {
      Icon: Bell,
      title: 'Await Confirmation',
      description:
        'Once you have submitted your application, wait for a confirmation email to secure your entry.'
    }
  ];

  type Speaker = {
    name: string;
    company: string;
    image: string;
  };

  const speakers: Speaker[] = [
    {
      name: 'Dane Garcia',
      company: 'Google',
      image: dane2
    },
    {
      name: 'Henrich Miguel',
      company: 'Microsoft',
      image: dane1
    },
    {
      name: 'Dane Henrich',
      company: 'Startup PH',
      image: dane3
    }
  ];
  let activeIndex = 0;
  let cards: HTMLDivElement[] = [];

  function scrollTo(index: number) {
    cards[index]?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center'
    });
  }
</script>

<!-- =====================
     BACKGROUND GRADIENT CIRCLES
===================== -->

<div class="pointer-events-none absolute inset-0 -z-10 h-screen">
  <div
    class="absolute top-[25%] -left-[20%] h-[40%] w-[30%] rounded-full mix-blend-multiply blur-[150px]"
    style="background: linear-gradient(135deg, #7410FF, #55059B);"
  ></div>

  <div
    class="absolute -right-[20%] bottom-[10%] h-[40%] w-[30%] rounded-full mix-blend-multiply blur-[150px]"
    style="background: linear-gradient(135deg, #7410FF, #55059B);"
  ></div>

  <div
    class="absolute right-[30%] -bottom-[20%] h-[100%] w-[35%] rounded-full opacity-60 mix-blend-overlay blur-[250px]"
    style="background: linear-gradient(135deg, #AB3550 0%, #7410FF 100%);"
  ></div>
  <div
    class="absolute -bottom-[430%] -left-[10%] h-[20%] w-[30%] rounded-full mix-blend-multiply blur-[200px]"
    style="background: linear-gradient(135deg, #7410FF, #55059B);"
  ></div>
  <div
    class="absolute -bottom-[340%] -left-[10%] h-[40%] w-[40%] rounded-full opacity-60 mix-blend-overlay blur-[300px]"
    style="background: linear-gradient(135deg, #AB3550 0%, #7410FF 100%);"
  ></div>
  <div
    class="absolute right-[10%] -bottom-[260%] h-[40%] w-[30%] rounded-full mix-blend-multiply blur-[250px]"
    style="background: linear-gradient(135deg, #7410FF, #55059B);"
  ></div>
  <div
    class="absolute -right-[10%] -bottom-[200%] h-[70%] w-[40%] rounded-full opacity-60 mix-blend-overlay blur-[270px]"
    style="background: linear-gradient(135deg, #AB3550 0%, #7410FF 100%);"
  ></div>
  <div
    class="absolute right-[10%] -bottom-[480%] h-[70%] w-[40%] rounded-full opacity-60 mix-blend-overlay blur-[200px]"
    style="background: linear-gradient(135deg, #AB3550 0%, #7410FF 100%);"
  ></div>
</div>

<section
  class="relative mt-50 flex flex-col place-content-center place-items-center gap-4
	       lg:mt-20 lg:h-screen lg:gap-9"
>
  <!-- TEXT CONTENT -->
  <h1
    class="relative z-10 grid place-content-center text-center
		       font-[Lexend] font-semibold tracking-normal
		       *:leading-12 xs:*:leading-18"
  >
    <ScrollReveal delay="300ms">
      <div class="text-[28px] lg:text-5xl">EXPE21ENCE YSES:</div>
    </ScrollReveal>
    <ScrollReveal delay="400ms" class="mx-auto">
      <div class="text-[40px] lg:text-7xl">Company Talks</div>
    </ScrollReveal>
  </h1>

  <ScrollReveal delay="500ms">
    <div class="relative z-10 text-center text-[14px] lg:text-xl">
      Inside the Tech Industry — From the Professionals Themselves
    </div>
  </ScrollReveal>

  <!-- MIC (responsive behavior) -->
  <div
    class="
			relative z-0 mt-6 flex justify-center
			[mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]
			lg:pointer-events-none lg:absolute lg:inset-0
			lg:-z-10
			lg:mt-0
		"
  >
    <ScrollReveal>
      <img
        src={microphone}
        alt="ctalks icon"
        class="
					h-[214px] w-[214px]
					object-cover object-center
					opacity-40
					lg:h-[522px] lg:w-[522px]
				"
      />
    </ScrollReveal>
  </div>

  <!-- CTA -->
  <ScrollReveal delay="600ms">
    <div
      class="relative z-10 ml-2 rounded-[3.75rem] p-[0.135rem]"
      style="background: linear-gradient(180deg, var(--muted-foreground) 0%, var(--background) 60%, var(--muted-foreground) 100%);"
    >
      <Button
        variant="gradient"
        size="xl"
        class="register-btn relative isolate overflow-hidden
				       !bg-transparent
				       shadow-[0px_5px_20px_rgba(0,0,0,0.3),inset_0px_1px_0px_rgba(255,255,255,0.6)]"
      >
        <span class="relative z-10">Register Now</span>
      </Button>
    </div>
  </ScrollReveal>

  <ScrollReveal delay="650ms">
    <button
      onclick={() => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })}
      class="relative z-10 mt-20 animate-bounce cursor-pointer
			       transition-transform hover:translate-y-1"
      aria-label="Scroll to next section"
    >
      <ChevronsDown size={30} />
    </button>
  </ScrollReveal>
</section>

<div class="pointer-events-none absolute inset-0 -z-10 h-screen">
  <div
    class="absolute top-[160%] -left-[0%] h-[40%] w-[30%] rounded-full mix-blend-multiply blur-[200px]"
    style="background: linear-gradient(135deg, #7410FF, #55059B);"
  ></div>
</div>
<!-- =====================
     OVERVIEW
===================== -->
<section
  id="overview"
  class="relative flex scroll-mt-36 flex-col gap-4 text-center md:scroll-mt-64 lg:mt-[5rem]"
>
  <div
    class="absolute top-[%] -left-[20%] h-[40%] w-[30%] rounded-full mix-blend-multiply blur-[100px]"
    style="background: linear-gradient(135deg, #7410FF, #55059B);"
  ></div>
  <Star
    class="bottom-20 -left-30 h-[261px] w-[255px] rotate-44 opacity-40 blur-[1px] dark:opacity-70"
  />

  <Star class="bottom-16 -left-40 w-18 rotate-250 opacity-20 blur-[1px] dark:opacity-40" />
  <Star class="-bottom-28 -left-40 w-50 rotate-10 opacity-40 dark:opacity-80" />
  <Star class="top-64 left-5 w-20 rotate-250 opacity-40 blur-[1px] dark:opacity-60" />
  <Star class="-top-26 -right-45 w-45 rotate-40 opacity-50 dark:opacity-60" />
  <Star class="top-14 -right-27 w-20 rotate-250 opacity-20 blur-[1px] dark:opacity-40" />

  <Star class="top-24 -right-45 w-80 rotate-44 opacity-40 dark:opacity-80" />
  <ScrollReveal delay="100ms">
    <div
      class="mx-auto rounded-[1.5625rem] p-px shadow-xl"
      style={`background: ${BORDER_GRADIENT}`}
    >
      <LiquidGlass
        class="relative block h-full w-full !overflow-visible rounded-[1.5rem] p-8 hover:border-purple-500/50"
        options={GLASS_OPTIONS}
        style={`border: 1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(150,150,150,0.5)'};`}
      >
        <h2 class="mb-4 text-2xl font-semibold text-primary">Overview</h2>
        <p class="leading-relaxed text-foreground/90">
          <strong>EXPE21ENCE YSES: Company Talks</strong> is a curated series of talks an d interactive
          Q&A sessions where industry professionals share real-world perspectives on working in the tech
          industry today. As part of EXPE21ENCE YSES, it reinforces the organization's 21-year mission
          of bridging the gap between the academe and the industry—helping the students understand how
          their skills, values, and education translate into real impact.
        </p>
      </LiquidGlass>
    </div>
  </ScrollReveal>
</section>

<!-- ===================== INSIDE THE SESSIONS ===================== -->
<section class="relative flex scroll-mt-20 flex-col gap-4 text-center md:scroll-mt-64 lg:mt-60">
  <!-- Right Side Stars -->
  <Star class="top-28 -right-40 w-20 rotate-250 opacity-15 blur-[1px] dark:opacity-40" />
  <Star class="top-90 right-70 w-20 rotate-10 opacity-15 dark:opacity-40" />
  <Star class="top-70 -right-55 w-60 rotate-30 opacity-30 dark:opacity-80" />
  <Star class="-right-35 bottom-80 w-22 rotate-40 opacity-30 dark:opacity-60" />
  <Star class="right-75 bottom-20 w-22 rotate-20 opacity-40 dark:opacity-60" />
  <Star class="-right-10 bottom-30 w-22 rotate-250 opacity-40 dark:opacity-80" />

  <!-- Left Side Stars -->
  <Star class="top-77 -left-55 w-53 rotate-30 opacity-30 dark:opacity-80" />
  <Star class="bottom-10 left-50 w-17 rotate-25 opacity-40 dark:opacity-60" />
  <Star class="top-105 left-59 w-20 rotate-45 opacity-15 dark:opacity-60" />
  <Star class="bottom-65 left-87 w-13 rotate-250 opacity-40 dark:opacity-80" />
  <Star class="bottom-55 -left-40 w-17 rotate-250 opacity-40 dark:opacity-80" />

  <!-- MOBILE VIEW ONLY -->
  <div class="flex flex-col items-center gap-8 lg:hidden">
    <!-- Header -->
    <ScrollReveal>
      <h2 class="text-3xl font-semibold text-slate-900 dark:text-white">Inside the Sessions</h2>
      <p class="mt-2 text-sm text-slate-600 italic dark:text-white/80">
        Where theory meets practice.
      </p>
    </ScrollReveal>

    <!-- Center Image -->
    <img
      style={`background: ${BORDER_GRADIENT}`}
      src="/images/company-talks/session-preview.png"
      alt="Session preview"
      class="w-full max-w-[420px] rounded-xl shadow-2xl"
    />

    <!-- Swipeable Detail Cards -->
    <div
      class="
			flex w-full snap-x snap-mandatory gap-6 overflow-x-auto
			px-6 pb-6
		"
    >
      {#each keyDetails as detail}
        <div
          class="shrink-0 snap-center rounded-[1.5625rem]"
          style={`background: ${BORDER_GRADIENT}`}
        >
          {@render detailCard(detail)}
        </div>
      {/each}
    </div>
  </div>

  <!-- 3-COLUMN GRID -->
  <div class="hidden grid-cols-1 gap-12 lg:grid lg:grid-cols-3 lg:pt-20">
    <!-- LEFT COLUMN -->
    <div class="flex flex-col items-center gap-50">
      <div class="rounded-[1.5625rem]" style={`background: ${BORDER_GRADIENT}`}>
        {@render detailCard(keyDetails[0])}
      </div>
      <div class="rounded-[1.5625rem]" style={`background: ${BORDER_GRADIENT}`}>
        {@render detailCard(keyDetails[2])}
      </div>
    </div>

    <!-- CENTER COLUMN -->
    <div class="flex flex-col items-center gap-20">
      <!-- HEADER -->
      <ScrollReveal>
        <h2 class="mt-2 text-3xl leading-relaxed font-semibold">Inside the Sessions</h2>
        <p class=" mt-2 text-sm leading-relaxed italic">Where theory meets practice.</p>
      </ScrollReveal>

      <!-- CENTER IMAGE -->
      <img
        style={`background: ${BORDER_GRADIENT}`}
        src="/images/company-talks/session-preview.png"
        alt="Session preview"
        class="h-[467px] w-[425px] rounded-xl shadow-2xl"
      />

      <!-- CENTER CARD -->
      <div class="rounded-[1.5625rem]" style={`background: ${BORDER_GRADIENT}`}>
        {@render detailCard(keyDetails[4])}
      </div>
    </div>

    <!-- RIGHT COLUMN -->
    <div class="flex flex-col items-center gap-50">
      <div class="rounded-[1.5625rem]" style={`background: ${BORDER_GRADIENT}`}>
        {@render detailCard(keyDetails[1])}
      </div>
      <div class="rounded-[1.5625rem]" style={`background: ${BORDER_GRADIENT}`}>
        {@render detailCard(keyDetails[3])}
      </div>
    </div>
  </div>
</section>

<!-- =====================
     SPEAKERS
===================== -->
<section class="relative mx-auto w-full px-6 py-12">
  <!-- Decorative stars -->
  <Star class="-right-50 -bottom-10 w-40 -rotate-1 opacity-20 dark:opacity-80" />
  <Star class="top-0 -right-50 w-80 rotate-43 opacity-15 dark:opacity-70" />
  <Star class="-right-25 bottom-44 w-24 rotate-250 opacity-20 dark:opacity-70" />
  <Star class="top-10 -left-40 w-70 opacity-20 dark:opacity-80" />
  <Star class="bottom-35 -left-40 w-30 rotate-210 opacity-20 dark:opacity-70" />
  <Star class="-bottom-20 -left-24 w-50 rotate-50 opacity-20 dark:opacity-70" />

  <ScrollReveal>
    <!-- Header -->
    <div class="mb-12 text-center">
      <h2 class="text-4xl leading-relaxed font-semibold">Meet the Speakers</h2>
      <p class=" text-lg leading-relaxed">
        Insights from professionals working at the forefront of the tech industry.
      </p>
    </div></ScrollReveal
  >

  <!-- Glass Wrapper -->
  <div class="flex justify-center">
    <div
      class="w-[1210px] rounded-[1.75rem] p-px
			       shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
      style={`background: ${BORDER_GRADIENT}`}
    >
      <LiquidGlass
        class="relative rounded-[1.7rem]
				       bg-white/70 p-10
				       backdrop-blur-xl
				       dark:bg-white/5"
        options={GLASS_OPTIONS}
        style={`border: 1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(150,150,150,0.5)'};`}
      >
        <!-- Speakers Grid -->
        <div class="grid grid-cols-1 place-items-center gap-10 md:grid-cols-3">
          {#each speakers as speaker}
            <div class="group relative overflow-hidden">
              <img
                src={speaker.image}
                alt={speaker.name}
                class="mb-20 h-[244px] w-[244px]
								       object-cover object-center
								       transition-transform duration-500
								       group-hover:scale-105"
              />

              <!-- Bottom Overlay -->
              <div
                class="absolute inset-x-0 bottom-0
								       py-3
								       text-center"
              >
                <p class=" text-xs leading-relaxed">
                  {speaker.name}
                </p>
                <p class=" text-xs leading-relaxed">
                  {speaker.company}
                </p>
              </div>
            </div>
          {/each}
        </div>
      </LiquidGlass>
    </div>
  </div>
</section>

<section class="relative flex h-[713px] w-[1184px] flex-col items-center">
  <!-- Decorative Stars -->
  <Star class="-top-8 -right-40 w-28 rotate-12 opacity-50 dark:opacity-90" />
  <Star class="top-1/2 -right-28 w-28 -rotate-0 opacity-35 blur-sm dark:opacity-70" />
  <ScrollReveal
    ><div class="mb-12 text-center">
      <h2 class="text-4xl leading-relaxed font-semibold">Register for Company Talks</h2>
      <p class="mt-2 text-center text-lg leading-relaxed lg:mt-2">
        Take your first step toward learning from industry professionals and gaining real-world
        insights
      </p>
    </div></ScrollReveal
  >

  <!-- Main Flex Content -->
  <div
    class="mx-auto mt-3 grid h-auto w-full max-w-[1184px] grid-cols-1 gap-8 md:grid-cols-[1fr_1fr] lg:h-[540px] lg:gap-12"
  >
    <!-- LEFT: 3D Scene -->
    <div
      class="flex h-[450px] w-full items-center justify-center md:h-full md:w-full"
      use:viewport={{
        onEnter: () => (isSceneVisible = true),
        threshold: 0.2
      }}
    >
      {#if isSceneVisible}
        <ScrollReveal delay="200ms" class="h-full w-full">
          <CompanyTalksRegisterScene />
        </ScrollReveal>
      {/if}
    </div>

    <!-- RIGHT: Registration Steps -->
    <div class="flex flex-col text-center md:p-0">
      <div class="grid grid-cols-[auto_1fr] gap-x-6 gap-y-8 text-justify">
        {#each registrationSteps as step, i (step.title)}
          {@const { Icon, title, description } = step}
          <ScrollReveal delay={`${300 + i * 50}ms`} class="place-self-center">
            <div class="pt-1 text-primary">
              <Icon class="size-14" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={`${300 + i * 50}ms`}>
            <div class="flex flex-col gap-2">
              <span class="text-xl font-bold md:text-xl">{title}</span>
              <p class="text-justify text-lg leading-relaxed">
                {description}
              </p>
            </div>
          </ScrollReveal>
        {/each}
      </div>
      <ScrollReveal delay="600ms">
        <div class="relative z-10 mt-7 ml-2 flex justify-center">
          <div
            class="flex h-[58px] w-[230px] items-center justify-center rounded-[3.75rem] p-[0.135rem]"
            style="background: linear-gradient(180deg, var(--muted-foreground) 0%, var(--background) 60%, var(--muted-foreground) 100%);"
          >
            <Button
              variant="gradient"
              class="register-btn relative isolate h-[53px] w-[225px] overflow-hidden rounded-[3.75rem] !bg-transparent
				       p-[0.135rem]
				       shadow-[0px_5px_20px_rgba(0,0,0,0.3),inset_0px_1px_0px_rgba(255,255,255,0.6)]"
            >
              <span class="relative z-10 text-lg">Register</span>
            </Button>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </div>
</section>

{#snippet detailCard(detail)}
  <LiquidGlass
    class="relative h-[252px] w-[317px] !overflow-visible rounded-[28px] bg-white/30 pt-10 pb-6
	       text-center shadow-lg dark:bg-white/10"
    options={GLASS_OPTIONS}
    style={`border: 1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(150,150,150,0.5)'};`}
  >
    <!-- Icon (Svelte 5 safe) -->
    <detail.icon class="mx-auto mb-6 h-[96px] w-[96px] text-primary" />

    <!-- Text -->
    <p
      class="mx-auto max-w-[260px] text-sm leading-relaxed
		       "
    >
      {detail.description}
    </p>
  </LiquidGlass>
{/snippet}
