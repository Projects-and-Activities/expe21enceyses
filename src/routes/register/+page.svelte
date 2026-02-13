<script lang="ts">
  import { ArrowRight } from '@lucide/svelte';

  import { goto } from '$app/navigation';
  import ctalksImage from '$lib/assets/ctalks.png?enhanced';
  import hackfestImage from '$lib/assets/hackfest.png?enhanced';
  import pfjfImage from '$lib/assets/pfjf.png?enhanced';
  import ScrollReveal from '$lib/components/ScrollReveal.svelte';
  import Star from '$lib/components/Star.svelte';

  const events = [
    {
      id: 'pfjf',
      name: 'PF/JF',
      image: pfjfImage,
      links: [{ label: 'Register', href: '/events/pf-jf/register' }]
    },
    {
      id: 'hackfest',
      name: 'The HackFest',
      image: hackfestImage,
      links: [
        { label: 'Junior Bracket', href: '/events/junior-hackfest/register' },
        { label: 'Senior Bracket', href: '/events/senior-hackfest/register' }
      ]
    },
    {
      id: 'ctalks',
      name: 'Company Talks',
      image: ctalksImage,
      links: [{ label: 'Register', href: '/events/company-talks/register' }]
    }
  ];
</script>

<div class="pointer-events-none fixed inset-0 -z-10 h-screen overflow-hidden">
  <div
    class="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-purple-400/20 mix-blend-multiply blur-[120px] dark:mix-blend-normal"
  ></div>
  <div
    class="absolute -right-[10%] -bottom-[10%] h-[40%] w-[40%] rounded-full bg-purple-400/20 mix-blend-multiply blur-[120px] dark:mix-blend-normal"
  ></div>
  <div
    class="absolute top-1/2 left-1/2 h-[50%] w-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-400/10 blur-[100px]"
  ></div>
</div>

<main
  class="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center px-4 pt-24 pb-16 md:pt-32 md:pb-20"
>
  <Star class="top-[15%] -left-20 hidden w-24 rotate-12 opacity-40 lg:block dark:opacity-70" />
  <Star class="top-[25%] -right-16 hidden w-32 -rotate-15 opacity-50 lg:block dark:opacity-80" />
  <Star
    class="bottom-[30%] -left-24 hidden w-20 rotate-25 opacity-30 blur-[2px] lg:block dark:opacity-60"
  />
  <Star class="-right-20 bottom-[20%] hidden w-28 -rotate-30 opacity-45 lg:block dark:opacity-75" />

  <section class="mb-12 text-center md:mb-16">
    <ScrollReveal delay="100ms">
      <h1
        class="mb-4 font-serif text-4xl leading-tight font-normal tracking-tight md:mb-6 md:text-5xl lg:text-8xl"
      >
        Register for EXPE21ENCE
      </h1>
    </ScrollReveal>

    <ScrollReveal delay="200ms">
      <p
        class="mx-auto max-w-2xl font-['Lexend'] text-lg leading-relaxed font-light text-muted-foreground md:text-xl"
      >
        Choose an event below to begin your registration journey with YSES.
      </p>
    </ScrollReveal>
  </section>

  <section class="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
    {#each events as event, i (event.id)}
      <ScrollReveal delay={`${300 + i * 150}ms`}>
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <div
          tabindex="-1"
          role="button"
          on:click={() => goto(event.links[0].href)}
          class="gradient-border-wrapper group card-entrance h-full cursor-pointer"
          style="--card-index: {i}"
        >
          <div
            class="register-card flex h-full min-h-[350px] flex-col rounded-xl border border-border/30 bg-card/80 backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 md:min-h-[420px] dark:bg-card/50"
          >
            <div
              class="ascii-glitch-wrapper flex min-h-[200px] flex-1 items-center justify-center p-4"
            >
              <enhanced:img
                src={event.image}
                alt={event.name}
                class="ascii-art h-auto max-h-[280px] w-full object-contain brightness-200 transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <h2 class="px-6 text-center font-['Lexend'] text-xl font-semibold tracking-tight">
              {event.name}
            </h2>

            <div class="mx-6 my-4 h-px bg-border/50"></div>

            <div class="mt-auto flex flex-col gap-3 px-6 pb-6">
              {#each event.links as link (link.label)}
                <a
                  href={link.href}
                  class="group/link flex items-center justify-center gap-2 rounded-lg py-2 font-['Lexend'] font-normal text-[#7F52BB] transition-all duration-200 hover:bg-purple-500/10"
                >
                  {link.label}
                  <ArrowRight
                    class="size-5 transition-transform duration-200 group-hover/link:translate-x-1"
                  />
                </a>
              {/each}
            </div>
          </div>
        </div>
      </ScrollReveal>
    {/each}
  </section>
</main>

<style>
  .gradient-border-wrapper {
    position: relative;
    border-radius: 0.75rem;
    padding: 2px;
    background: transparent;
    transition: all 0.3s ease;
  }

  .gradient-border-wrapper::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 0.75rem;
    padding: 2px;
    background: conic-gradient(
      from var(--gradient-angle, 0deg),
      #7f52bb,
      #14b8a6,
      #a855f7,
      #7f52bb
    );
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .gradient-border-wrapper:hover::before {
    opacity: 1;
    animation: rotate-gradient 3s linear infinite;
  }

  @keyframes rotate-gradient {
    0% {
      --gradient-angle: 0deg;
    }
    100% {
      --gradient-angle: 360deg;
    }
  }

  @property --gradient-angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }

  .gradient-border-wrapper:hover .register-card {
    box-shadow:
      0px 2px 10px rgba(0, 0, 0, 0.25) inset,
      0 30px 40px -10px rgba(127, 82, 187, 0.2),
      0 12px 15px -8px rgba(0, 0, 0, 0.2);
  }

  .gradient-border-wrapper:hover .ascii-art {
    animation: shake 0.5s ease-in-out;
  }

  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    20% {
      transform: translateX(-3px);
    }
    40% {
      transform: translateX(3px);
    }
    60% {
      transform: translateX(-2px);
    }
    80% {
      transform: translateX(2px);
    }
  }

  .card-entrance {
    animation: card-spring-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both;
    animation-delay: calc(var(--card-index) * 150ms);
  }

  @keyframes card-spring-in {
    0% {
      opacity: 0;
      transform: translateY(60px) scale(0.9);
    }
    60% {
      opacity: 1;
      transform: translateY(-8px) scale(1.02);
    }
    80% {
      transform: translateY(4px) scale(0.99);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
</style>
