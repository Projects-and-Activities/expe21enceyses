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
  let isSceneVisible = $state(false);
  let activeSessionIndex = $state(0);
  let sessionContainer: HTMLDivElement | undefined = $state();

  onMount(() => {
    isSceneVisible = true;
  });

  function handleSessionScroll() {
    if (!sessionContainer) return;

    const scrollLeft = sessionContainer.scrollLeft;
    const stride = 317 + 24;

    activeSessionIndex = Math.round(scrollLeft / stride);
  }

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
  let isDark = $derived(mode.current === 'dark');

  let BORDER_GRADIENT = $derived(
    isDark
      ? 'linear-gradient(90deg, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.01) 10%, rgba(255,255,255,0.05) 100%)'
      : 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 100%)'
  );

  let GLASS_OPTIONS = $derived(
    isDark
      ? ({
          mainBlur: '0.1rem',
          mainBackgroundColor: 'rgba(250, 250, 250, 0.05)',
          edgeBlur: '1rem',
          edgeBackgroundColor: 'rgba(150, 150, 150, 0.0)',
          edgeWidth: '0.15rem',
          sheenBlur: '4rem',
          sheenBackgroundColor: 'rgba(100, 100, 100, 0.05)',
          sheenWidth: '1rem'
        } as const)
      : ({
          mainBlur: '0.5rem',
          mainBackgroundColor: 'rgba(255, 255, 255, 0.2)',
          edgeBlur: '0.5rem',
          edgeBackgroundColor: 'rgba(1, 1, 1, 0.0)',
          edgeWidth: '0.1rem',
          sheenBlur: '4rem',
          sheenBackgroundColor: 'rgba(100, 100, 100, 0.05)',
          sheenWidth: '1rem'
        } as const)
  );

  let BLOB_CLASSES = $derived(
    isDark ? 'pointer-events-none absolute inset-0 -z-10 h-screen' : 'hidden'
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
</script>

<!-- =====================
     BACKGROUND GRADIENT CIRCLES
===================== -->
<div class="pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-hidden">
  <div
    class="absolute top-[0%] -left-[17%] h-[340px] w-[300px]
           rounded-full opacity-50 mix-blend-multiply blur-[130px]
           lg:top-[5%] lg:-left-[24%] lg:h-[200px]
           lg:w-[500px] lg:opacity-100 lg:blur-[120px]"
    style="background: linear-gradient(135deg, #7410FF, #55059B);"
  ></div>

  <div
    class="absolute top-[4%] right-[15%] h-[400px] w-[300px]
           rounded-full opacity-40 mix-blend-overlay blur-[80px]
           lg:top-[2%] lg:right-[37%] lg:h-[800px]
           lg:w-[300px] lg:opacity-60 lg:blur-[300px]"
    style="background: linear-gradient(135deg, #AB3550 0%, #7410FF 100%);"
  ></div>

  <div
    class="absolute top-[15%] -right-[50%] h-[180px] w-[500px]
           rounded-full mix-blend-multiply blur-[230px] lg:top-[10%]
           lg:-right-[18%] lg:h-[300px] lg:w-[400px] lg:blur-[150px]"
    style="background: linear-gradient(135deg, #7410FF, #55059B);"
  ></div>

  <div
    class="absolute top-[58%] -right-[30%] h-[400px] w-[200px] rounded-full
           mix-blend-multiply blur-[150px] lg:top-[25%]
           lg:-left-[5%] lg:h-[500px] lg:w-[400px] lg:blur-[300px]"
    style="background: linear-gradient(135deg, #7410FF, #55059B);"
  ></div>

  <div
    class="absolute top-[25%] right-[10%] h-[450px] w-[350px] rounded-full
           opacity-50 mix-blend-overlay blur-[150px] xs:hidden
           lg:top-[40%] lg:-right-[15%] lg:h-[600px]
           lg:w-[500px] lg:opacity-60 lg:blur-[200px]"
    style="background: linear-gradient(135deg, #AB3550 0%, #7410FF 100%);"
  ></div>
  <div
    class="absolute top-[37%] right-[10%] h-[350px] w-[350px] rounded-full
           opacity-50 mix-blend-overlay blur-[150px]
           lg:top-[40%] lg:-right-[15%] lg:h-[600px]
           lg:w-[500px] lg:opacity-60 lg:blur-[200px]"
    style="background: linear-gradient(135deg, #AB3550 0%, #7410FF 100%);"
  ></div>
  <div
    class="absolute top-[100%] -right-[5%] h-[0px] w-[0px]
           rounded-full mix-blend-multiply blur-[100px] lg:top-[55%]
           lg:-right-[0%] lg:h-[400px] lg:w-[400px] lg:blur-[300px]"
    style="background: linear-gradient(135deg, #7410FF, #55059B);"
  ></div>

  <div
    class="lg:top-[60% ] absolute top-[50%] left-[5%]
           h-[450px] w-[250px] rounded-full opacity-50
           mix-blend-overlay blur-[140px] lg:-left-[10%] lg:h-[500px]
           lg:w-[500px] lg:opacity-60 lg:blur-[200px]"
    style="background: linear-gradient(135deg, #AB3550 0%, #7410FF 100%);"
  ></div>

  <div
    class="absolute top-[80%] -right-[5%] h-[0px] w-[0px]
           rounded-full mix-blend-multiply blur-[80px] lg:top-[82%]
           lg:-left-[7%] lg:h-[300px] lg:w-[400px] lg:blur-[200px]"
    style="background: linear-gradient(135deg, #7410FF, #55059B);"
  ></div>

  <div
    class="absolute top-[70%] right-[5%] h-[1200px] w-[300px] rounded-full
           opacity-50 mix-blend-overlay blur-[200px]
           lg:top-[84%] lg:right-[8%] lg:h-[400px]
           lg:w-[600px] lg:opacity-60 lg:blur-[200px]"
    style="background: linear-gradient(135deg, #AB3550 0%, #7410FF 100%);"
  ></div>
</div>
<section
  class="relative mt-50 flex flex-col place-content-center place-items-center gap-2
	       lg:mt-20 lg:h-screen lg:gap-9"
>
  <!-- TEXT CONTENT -->
  <h1
    class="relative z-10 grid place-content-center text-center
		       font-[Lexend] font-semibold tracking-normal
		       *:leading-12 xs:*:leading-18"
  >
    <ScrollReveal delay="300ms">
      <div class="dark text-[28px] lg:text-5xl">EXPE21ENCE YSES:</div>
    </ScrollReveal>
    <ScrollReveal delay="400ms" class="mx-auto">
      <div class="bold text-[40px] lg:text-7xl">Company Talks</div>
    </ScrollReveal>
  </h1>

  <ScrollReveal delay="500ms">
    <div class="relative z-10 px-4 text-center text-[14px] lg:px-0 lg:text-xl">
      Inside the Tech Industry — From Professionals Themselves
    </div>
  </ScrollReveal>

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

  <ScrollReveal delay="600ms">
    <div
      class="relative z-10 ml-2 rounded-[3.75rem] p-[0.135rem]"
      style="background: linear-gradient(180deg, var(--muted-foreground) 0%, var(--background) 60%, var(--muted-foreground) 100%);"
    >
      <Button
        variant="gradient"
        size="xl"
        class="register-btn 
         relative isolate !h-10 overflow-hidden !bg-transparent !px-6 !text-sm shadow-[0px_5px_20px_rgba(0,0,0,0.3),inset_0px_1px_0px_rgba(255,255,255,0.6)]
         md:!h-14 md:!px-10 md:!text-lg"
      >
        <span class="relative z-10 md:hidden">Learn More</span>

        <span class="relative z-10 hidden md:inline">Register Now</span>
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

<!-- =====================
     OVERVIEW
===================== -->
<section
  id="overview"
  class=" relative mx-auto flex scroll-mt-36 flex-col gap-4 text-center md:scroll-mt-64 lg:mt-[5rem]"
>
  <Star
    class="bottom-20 -left-30 h-[261px] w-[255px] rotate-44 opacity-40 blur-[1px] dark:opacity-70"
  />

  <Star class="bottom-16 -left-40 w-18 rotate-250 opacity-20 blur-[1px] dark:opacity-40" />
  <Star class="-bottom-28 -left-40 w-50 rotate-10 opacity-40 dark:opacity-80" />
  <Star class="top-64 left-5 w-20 rotate-250 opacity-40 blur-[1px] dark:opacity-60" />
  <Star class="-top-26 -right-45 w-45 rotate-40 opacity-50 dark:opacity-60" />
  <Star class="top-14 -right-27 w-20 rotate-250 opacity-20 blur-[1px] dark:opacity-40" />

  <Star class="top-24 -right-45 w-80 rotate-44 opacity-40 dark:opacity-80" />
  <div class=" mx-5 rounded-[1.5625rem] shadow-xl lg:mx-0" style={`background: ${BORDER_GRADIENT}`}>
    <LiquidGlass
      class="relative block h-full w-full !overflow-visible rounded-[1.5rem] p-8 hover:border-purple-500/50"
      options={GLASS_OPTIONS}
      style={`border: 1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(150,150,150,0.5)'};`}
    >
      <h2 class="mb-4 text-2xl font-semibold text-primary">Overview</h2>
      <p class="text-justify leading-relaxed lg:text-center">
        <strong>EXPE21ENCE YSES: Company Talks</strong> is a curated series of talks and interactive Q&A
        sessions where industry professionals share real-world perspectives on working in the tech industry
        today. As part of EXPE21ENCE YSES, it reinforces the organization's 21-year mission of bridging
        the gap between the academe and the industry—helping the students understand how their skills,
        values, and education translate into real impact.
      </p>
    </LiquidGlass>
  </div>
</section>

<!-- ===================== INSIDE THE SESSIONS ===================== -->
<section
  class="relative flex scroll-mt-20 flex-col items-center gap-4 text-center md:scroll-mt-64 lg:mt-60"
>
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
  <div class="flex w-full flex-col items-center gap-8 lg:hidden">
    <ScrollReveal>
      <h2 class="text-3xl leading-relaxed font-normal">
        <span class="font-semibold">Inside</span> the
        <span class="font-semibold italic">Sessions</span>
      </h2>
      <p class="leaning-relaxed mt-2 text-sm italic">Where theory meets practice.</p>
    </ScrollReveal>

    <img
      style={`background: ${BORDER_GRADIENT}`}
      src="/images/company-talks/session-preview.png"
      alt="Session preview"
      class="w-full max-w-[420px] rounded-xl shadow-2xl"
    />

    <div class="overflow-hidde relative mr-8 w-full">
      <div
        bind:this={sessionContainer}
        onscroll={handleSessionScroll}
        class="scrollbar-hide flex w-full touch-pan-x snap-x snap-mandatory overflow-x-auto pb-6"
        style="scrollbar-width: none; -ms-overflow-style: none; scroll-behavior: smooth;"
      >
        {#each keyDetails as detail, i}
          <div
            class="flex w-full shrink-0 snap-center justify-center
        {i === activeSessionIndex ? 'opacity-100' : 'pointer-events-none opacity-0'}"
          >
            <div class="w-[280px] rounded-[1.5625rem] sm:w-[320px]">
              {@render detailCard(detail)}
            </div>
          </div>
        {/each}
      </div>

      <div class="mt-4 flex justify-center gap-3">
        {#each keyDetails as _, i}
          <button
            onclick={() => {
              const containerWidth = sessionContainer.offsetWidth;
              sessionContainer?.scrollTo({ left: i * containerWidth, behavior: 'smooth' });
            }}
            class="h-2.5 rounded-full border border-white/10
        {i === activeSessionIndex
              ? 'w-8 bg-primary shadow-[0_0_10px_rgba(116,16,255,0.5)]'
              : 'w-2.5 bg-white/20 hover:bg-white/40'}"
            aria-label="Go to slide {i + 1}"
          ></button>
        {/each}
      </div>
    </div>
  </div>
  <!-- 3-COLUMN GRID -->
  <div class="hidden grid-cols-1 gap-16 lg:grid lg:grid-cols-[1fr_1.4fr_1fr]">
    <!-- LEFT COLUMN -->
    <div class="mt-10 flex flex-col items-center gap-50">
      <div class="rounded-[1.5625rem]" style={`background: ${BORDER_GRADIENT}`}>
        {@render detailCard(keyDetails[0])}
      </div>
      <div class="rounded-[1.5625rem]" style={`background: ${BORDER_GRADIENT}`}>
        {@render detailCard(keyDetails[2])}
      </div>
    </div>

    <!-- CENTER COLUMN -->
    <div class=" flex flex-col items-center lg:gap-15">
      <!-- HEADER -->
      <ScrollReveal class="mb-15">
        <h2 class="text-4xl leading-relaxed font-semibold">Inside the Sessions</h2>
        <p class="text-xl leading-relaxed italic">Where theory meets practice.</p>
      </ScrollReveal>

      <!-- CENTER IMAGE -->
      <img
        style={`background: ${BORDER_GRADIENT}`}
        src="/images/company-talks/session-preview.png"
        alt="Session preview"
        class="h-[294px] w-[257px] rounded-[1.5625rem] shadow-2xl lg:h-[467px] lg:w-[425px]"
      />

      <!-- CENTER CARD -->
      <div class="rounded-[1.5625rem]" style={`background: ${BORDER_GRADIENT}`}>
        {@render detailCard(keyDetails[4])}
      </div>
    </div>

    <!-- RIGHT COLUMN -->
    <div class="mt-10 flex flex-col items-center gap-50">
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
    <div class="mb-7 text-center">
      <h2 class="text-3xl leading-relaxed font-semibold lg:text-4xl">Meet the Speakers</h2>
      <p class=" px-5 text-sm leading-relaxed italic md:text-sm lg:text-lg">
        Insights from professionals working at the forefront of the tech industry.
      </p>
    </div></ScrollReveal
  >
  <div class="mx-7 flex justify-center lg:mx-0">
    <div
      class="w-[1210px] rounded-[1.75rem]
             shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
      style={BORDER_GRADIENT}
    >
      <LiquidGlass
        class="relative rounded-[1.7rem]
                p-10
               "
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
                class="mb-25 h-[244px] w-[244px]
                       object-cover object-center
                       transition-transform duration-500
                       group-hover:scale-105"
              />
              <!-- Bottom Overlay -->
              <div
                class="absolute inset-x-0 bottom-0 mt-10
                       text-center"
              >
                <p class=" bold text-[24px] leading-relaxed">
                  {speaker.name}
                </p>
                <p class=" text-[24px] leading-relaxed">
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
<section class="relative mb-10 flex w-[1184px] flex-col items-center">
  <Star class="absolute -right-40 bottom-20 w-28 rotate-12 opacity-50 dark:opacity-90" />
  <Star class="absolute -right-14 bottom-10 w-15 -rotate-0 opacity-35 dark:opacity-70" />
  <Star class="absolute bottom-40 -left-40 w-28 rotate-0 opacity-50 dark:opacity-90" />
  <Star class="absolute bottom-30 -left-14 w-15 -rotate-0 opacity-35 dark:opacity-70" />

  <ScrollReveal>
    <div class="mb-12 text-center">
      <h2 class="text-3xl leading-relaxed font-semibold lg:text-5xl">Register for Company Talks</h2>
      <p class="mt-1 px-4 text-center text-sm leading-relaxed italic lg:mt-2 lg:text-lg">
        Take your first step toward learning from industry professionals and gaining real-world
        insights
      </p>
    </div>
  </ScrollReveal>

  <div
    class="mx-auto mt-3 grid h-auto w-full max-w-[1184px] grid-cols-1 gap-8 md:grid-cols-[1fr_1fr] lg:h-[540px] lg:gap-12"
  >
    <div
      class="order-1 flex h-[450px] w-full items-center justify-center md:h-full md:w-full"
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

    <div class="order-2 flex flex-col text-center md:p-0">
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
              href="company-talks/register"
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
    <detail.icon class="mx-auto mb-6 h-[96px] w-[96px] text-primary" />

    <p
      class="mx-auto max-w-[260px] text-sm leading-relaxed
		       "
    >
      {detail.description}
    </p>
  </LiquidGlass>
{/snippet}
