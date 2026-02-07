<script lang="ts">
  import Plus from '@lucide/svelte/icons/plus';
  import { mode } from 'mode-watcher';
  import { Spring } from 'svelte/motion';
  import { onMount } from 'svelte';
  import starImage from '$lib/assets/star.png';
  import GlassCard from '$lib/components/GlassCard.svelte';
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

  const faqs = [
    {
      id: 'faq-1',
      question: 'What is EXPE21ENCE YSES?',
      answer:
        'EXPE21ENCE YSES is YSES\' annual celebration marking our 21st year of bridging the gap between academe and industry. It\'s a series of events running from March 7-28, 2026, with the theme "Bridging Future Software Engineers of the 21st Century."'
    },
    {
      id: 'faq-2',
      question: 'What is YSES?',
      answer:
        "The Young Software Engineers' Society (YSES) is an academic organization based in the University of the Philippines Los Baños that promotes software engineering and prepares students for successful careers by bridging the gap between academe and industry, while nurturing future tech leaders who embody Leadership, Professionalism, and Excellence."
    },
    {
      id: 'faq-3',
      question: 'What events are part of EXPE21ENCE YSES?',
      intro: 'The celebration includes three main events:',
      bullets: [
        'The HackFest (March 7-28, 2026) — AI-driven hackathon for high school and college students',
        'PF/JF (Practicum Fair/Job Fair) (March 19, 2026) — Career fair connecting students with companies',
        'Company Talks (March 19, 2026) — Industry speakers sharing insights about tech careers'
      ]
    },
    {
      id: 'faq-4',
      question: 'Who can participate in EXPE21ENCE YSES events?',
      intro: 'It depends on the event:',
      bullets: [
        'HackFest — High school students (Grades 7-12) and college students',
        'PF/JF — Students looking for practicum opportunities or jobs',
        'Company Talks — All students interested in the technology industry'
      ]
    },
    {
      id: 'faq-5',
      question: 'Is there a registration fee?',
      intro: 'Yes, but it varies by event:',
      bullets: [
        'HackFest — ₱350 per team (3-4 members)',
        'PF/JF — Free (pre-registration encouraged)',
        'Company Talks — Free (pre-registration encouraged)'
      ]
    },
    {
      id: 'faq-6',
      question: 'Where can I register?',
      answer:
        'Registration will be available through the EXPE21ENCE YSES website, launching approximately one month before the events. Pre-registered participants will receive important updates for EXPE21ENCE YSES.'
    },
    {
      id: 'faq-7',
      question: "I'm not from UP Los Baños. Can I still join?",
      answer:
        'Yes! EXPE21ENCE YSES events are open to students from all schools and universities across the Philippines.'
    },
    {
      id: 'faq-8',
      question: 'How do I stay updated?',
      bullets: [
        'Follow YSES on social media (Facebook, Instagram)',
        'Pre-register to receive email updates',
        'Check the EXPE21ENCE YSES website regularly'
      ]
    },
    {
      id: 'faq-9',
      question: 'Who do I contact for questions?',
      bullets: [
        'Email: prog@yses.org',
        'Contact Numbers: Justin Dayne Bryant Peña (+63 927 279 4988) or Yuuri Nonaka (+63 932 164 4789)',
        'For HackFest questions — Email prog@yses.org with subject line starting with "HackFest:"',
        'For PF/JF questions — Email prog@yses.org with subject line starting with "PF/JF:"',
        'For Company Talks questions — Email prog@yses.org with subject line starting with "Company Talks:"'
      ]
    }
  ];

  let openValue = $state<string | undefined>(undefined);

  let hoveredCard = $state<string | null>(null);
  let tiltX = $state(0);
  let tiltY = $state(0);

  function handleCardHover(e: MouseEvent, cardId: string, isLeaving = false) {
    if (isLeaving) {
      hoveredCard = null;
      tiltX = 0;
      tiltY = 0;
      return;
    }

    hoveredCard = cardId;
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    tiltX = ((y - centerY) / centerY) * -2;
    tiltY = ((x - centerX) / centerX) * 2;
  }

  type ShootingStar = {
    id: number;
    x: number;
    y: number;
    duration: number;
  };

  let shootingStars = $state<ShootingStar[]>([]);
  let shootingStarId = 0;

  function spawnShootingStar() {
    const id = shootingStarId++;
    const star: ShootingStar = {
      id,
      x: Math.random() * 20, //spawn
      y: -20 + Math.random() * 50, // spread -10% to 40% from top
      duration: 4 + Math.random() * 2
    };

    shootingStars.push(star);

    setTimeout(
      () => {
        shootingStars = shootingStars.filter((s) => s.id !== id);
      },
      star.duration * 1000 + 500
    );
  }

  type Particle = {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
  };

  let particles = $state<Particle[]>([]);

  onMount(() => {
    const particleCount = 8;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 3 + Math.random() * 4,
        duration: 8 + Math.random() * 8,
        delay: Math.random() * 5
      });
    }
    // spawn every 1.5 sec
    const shootingStarInterval = setInterval(() => {
      spawnShootingStar();
    }, 1500);

    return () => {
      clearInterval(shootingStarInterval);
    };
  });

  function handleClick(e: MouseEvent) {
    const count = 8;
    const colors = isDark ? ['#ffffff', '#e0b0ff', '#b379ff'] : ['#7f52bb', '#b379ff', '#494949'];

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

<div class="pointer-events-none fixed inset-0 -z-5 overflow-hidden">
  {#each shootingStars as star (star.id)}
    <div
      class="shooting-star absolute"
      style="
				left: {star.x}%;
				top: {star.y}%;
				--duration: {star.duration}s;
			"
    ></div>
  {/each}
</div>

<div class="pointer-events-none fixed inset-0 -z-15 overflow-hidden">
  {#each particles as particle (particle.id)}
    <div
      class="float-particle absolute rounded-full bg-purple-400/20 blur-sm"
      style="
				left: {particle.x}%;
				top: {particle.y}%;
				width: {particle.size}px;
				height: {particle.size}px;
				--duration: {particle.duration}s;
				--delay: {particle.delay}s;
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
    class="blob-morph-1 absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-purple-400/20 mix-blend-multiply blur-[100px]"
  ></div>
  <div
    class="blob-morph-2 absolute -right-[10%] -bottom-[10%] h-[40%] w-[40%] rounded-full bg-purple-400/20 mix-blend-multiply blur-[120px]"
  ></div>
  <div
    class="blob-morph-3 absolute top-1/2 left-1/2 h-[50%] w-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-400/10 blur-[100px]"
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
  {@render star('-bottom-50 -right-32 w-50 -rotate-50 opacity-60 dark:opacity-85 hidden lg:block')}
  {@render star(
    'top-16 -left-40 w-90 rotate-20 blur-[0px] opacity-50 dark:opacity-70 hidden lg:block'
  )}
  <Accordion.Root type="single" bind:value={openValue} class="flex flex-col gap-4">
    {#each faqs as faq, i (faq.id)}
      {@const isOpen = openValue === faq.id}
      <ScrollReveal delay="{300 + i * 80}ms">
        <Accordion.Item value={faq.id} class="border-b-0">
          <GlassCard
            class="group relative overflow-hidden rounded-2xl border-2 transition-all duration-300
						{isOpen
              ? 'border-purple-500/50 bg-muted/40 !shadow-[0_0_20px_rgba(127,82,187,0.15)]'
              : 'border-border/50 bg-background/40 hover:border-purple-500/30 hover:!bg-muted/20 hover:!shadow-lg hover:!shadow-purple-500/5'} 
						"
            style="
							transform: {hoveredCard === faq.id
              ? `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`
              : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'};
							transition: transform 0.2s ease-out;
						"
            onmousemove={(e: MouseEvent) => handleCardHover(e, faq.id)}
            onmouseleave={(e: MouseEvent) => handleCardHover(e, faq.id, true)}
          >
            <div
              class="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style="background: radial-gradient(circle at center, var(--primary) 0%, transparent 70%); filter: blur(40px); opacity: 0.1;"
            ></div>
            <div
              class="relative block h-full w-full overflow-visible rounded-2xl bg-background/40 backdrop-blur-sm"
            >
              <Accordion.Trigger
                class="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left text-lg font-medium text-foreground transition-colors hover:no-underline md:text-xl [&>svg]:hidden"
              >
                <div class="flex flex-1 items-center gap-3 md:gap-4">
                  <span
                    class="font-mono text-sm font-bold text-purple-500/60 transition-all duration-300 group-hover:text-purple-500 md:text-base"
                    style="
											animation: slide-in 0.4s ease-out {300 + i * 80}ms both;
										"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span class="flex-1">{faq.question}</span>
                </div>

                <span
                  class="flex size-8 shrink-0 items-center justify-center rounded-full bg-background/50 text-muted-foreground transition-colors group-hover:bg-purple-500/10 group-hover:text-purple-500"
                >
                  <Plus
                    class="size-5 transition-transform duration-200 ease-[cubic-bezier(0.87,0,0.13,1)] {isOpen
                      ? '-rotate-45 text-purple-500'
                      : 'rotate-0'}"
                  />
                </span>
              </Accordion.Trigger>

              <Accordion.Content
                class="overflow-hidden px-5 text-sm text-muted-foreground md:text-base"
              >
                <div class="pb-4 pl-0 md:pl-11">
                  {#if faq.answer}
                    {faq.answer}
                  {:else}
                    {#if faq.intro}
                      <p class="mb-3">{faq.intro}</p>
                    {/if}
                    {#if faq.bullets}
                      <ul class="list-none space-y-2">
                        {#each faq.bullets as bullet}
                          <li class="flex items-start gap-2">
                            <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-500"
                            ></span>
                            <span>{bullet}</span>
                          </li>
                        {/each}
                      </ul>
                    {/if}
                  {/if}
                </div>
              </Accordion.Content>
            </div>
          </GlassCard>
        </Accordion.Item>
      </ScrollReveal>
    {/each}
  </Accordion.Root>
</section>

<section class="relative mx-auto mt-16 max-w-3xl px-4 pb-16 lg:mt-20 lg:px-0">
  <ScrollReveal delay="400ms">
    <div class="space-y-4 text-sm text-muted-foreground">
      <p>
        Should you have more inquiries regarding event information, guidelines and mechanics do not
        hesitate to contact either of the following:
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
