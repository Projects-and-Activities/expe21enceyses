<script lang="ts">
  import { ChevronsDown, Bell, CloudUpload, SquarePen } from '@lucide/svelte';

  import { viewport } from '$lib/actions/viewport';
  import archives1 from '$lib/assets/archives-1.png';
  import archives2 from '$lib/assets/archives-2.png';
  import archives3 from '$lib/assets/archives-3.png';
  import archives4 from '$lib/assets/archives-4.png';
  import archives5 from '$lib/assets/archives-5.png';
  import archives6 from '$lib/assets/archives-6.png';
  import archives7 from '$lib/assets/archives-7.png';
  import { asciiState } from '$lib/components/3d-ascii/ascii.svelte';
  import { ASCII_CHARS_FULL, ASCII_CHARS_SAFE } from '$lib/components/3d-ascii/constants';
  import PFJFRegisterScene from '$lib/components/3d-ascii/sections/PFJFRegisterScene.svelte';
  import PFJFScene from '$lib/components/3d-ascii/sections/PFJFScene.svelte';
  import GlassCard from '$lib/components/GlassCard.svelte';
  import ScrollReveal from '$lib/components/ScrollReveal.svelte';
  import Star from '$lib/components/Star.svelte';
  import Button from '$lib/components/ui/button/button.svelte';

  let isSceneVisible = $state(false);

  const registrationSteps = [
    {
      Icon: SquarePen,
      title: 'Register',
      description: 'Go to [link] and choose “Practicum & Job Fair” to begin your registration.'
    },
    {
      Icon: CloudUpload,
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
  class="mt-30 flex max-w-none! flex-col place-content-center place-items-center gap-9 md:mt-35 lg:grid lg:h-screen"
>
  <div
    class="absolute inset-0 -z-10 hidden h-screen w-full [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)] md:block"
  >
    <PFJFScene />
  </div>

  <h1
    class="grid place-content-center text-center font-[Lexend] font-semibold tracking-normal *:leading-12 xs:*:leading-18"
  >
    <ScrollReveal delay="300ms">
      <div class="text-3xl md:text-5xl">EXPE21ENCE YSES:</div>
    </ScrollReveal>
    <ScrollReveal delay="400ms" class="mx-auto mt-2">
      <div class="text-5xl md:text-7xl">Practicum Fair <br /> & Job Fair</div>
    </ScrollReveal>
  </h1>
  <ScrollReveal delay="500ms">
    <div class="text-xl">Future-Ready. Industry-Bound</div>
  </ScrollReveal>

  <div class="relative block h-[30vh] w-full overflow-hidden md:hidden">
    <div class="absolute inset-0 -top-[40%] -bottom-[80%]">
      <PFJFScene />
    </div>
  </div>

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
  <Star class="-right-40 -bottom-35 w-80 rotate-220 opacity-40 dark:opacity-80" />
  <Star class="-right-10 -bottom-50 w-30 rotate-140 opacity-40 blur-[1px] dark:opacity-60" />
  <Star class="-right-35 -bottom-25 w-23 rotate-75 opacity-40 blur-[2px] dark:opacity-30" />
  <Star class="-top-40 -left-30 w-60 rotate-80 opacity-40 dark:opacity-80" />
  <Star class="-top-42 -left-20 w-25 -rotate-75 opacity-40 blur-[2px] dark:opacity-50" />
  <Star class="-top-0 -left-30 w-15 rotate-25 opacity-40 blur-[3px] dark:opacity-30" />

  <ScrollReveal delay="100ms">
    <GlassCard
      class="pf-jf-card border-2 border-border/50 p-10 transition-all duration-300 ease-in-out hover:border-purple-500/50"
    >
      <div class="text-lexend mb-4 text-center text-3xl font-semibold text-primary">Overview</div>
      <p class="text-lexend text-1xl text-center leading-relaxed text-foreground/90">
        <span class="font-semibold"> EXPE21ENCE YSES: PF/JF </span>
        <span class="font-light">
          is a practicum and job fair that bridges the gap between the academe and industry,
          offering a platform for companies to showcase their culture and career opportunities,
          especially to aspiring tech professionals. Students can explore diverse paths in computer
          science, engage with company representatives, and develop crucial professional skills
          through networking. Take the opportunity to make meaningful connections for future growth!
        </span>
      </p>
    </GlassCard>
  </ScrollReveal>
</section>

<section id="register" class="relative flex scroll-mt-30 flex-col items-center gap-10">
  <Star class="top-40 -left-35 w-60 rotate-230 opacity-40 dark:opacity-80" />
  <Star class="top-100 -left-22 w-25 -rotate-35 opacity-40 blur-[2px] dark:opacity-50" />
  <Star class="bottom-25 -left-20 w-28 rotate-20 opacity-50 dark:opacity-90" />
  <Star class="bottom-45 -left-40 w-50 rotate-12 opacity-50 dark:opacity-90" />

  <ScrollReveal delay="150ms">
    <div class="text-5xl font-semibold">The Archives</div>
  </ScrollReveal>

  <ScrollReveal delay="300ms">
    <div
      class="grid-rows-auto grid h-auto w-full grid-cols-8 gap-4 md:h-[130vh] md:grid-cols-15 md:grid-rows-22 md:gap-6"
      style="perspective: 1000px;"
    >
      <div
        class="hover:tilt-card relative col-span-8 row-span-3 overflow-hidden rounded-3xl bg-white/5 shadow-2xl backdrop-blur-sm transition-transform duration-500 ease-out md:col-span-4 md:row-span-8"
        style="transform-style: preserve-3d;"
      >
        <img src={archives1} alt="" class="h-full w-full object-cover" />
        <div
          class="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"
        ></div>
      </div>

      <div
        class="hover:tilt-card relative col-span-4 row-span-2 overflow-hidden rounded-3xl bg-white/5 shadow-2xl backdrop-blur-sm transition-transform duration-500 ease-out md:col-span-6 md:row-span-5"
        style="transform-style: preserve-3d;"
      >
        <img src={archives2} alt="" class="h-full w-full object-cover" />
        <div
          class="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"
        ></div>
      </div>

      <div
        class="hover:tilt-card relative col-span-4 row-span-2 overflow-hidden rounded-3xl bg-white/5 shadow-2xl backdrop-blur-sm transition-transform duration-500 ease-out md:col-span-5 md:row-span-11"
        style="transform-style: preserve-3d;"
      >
        <img src={archives3} alt="" class="h-full w-full object-cover" />
        <div
          class="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"
        ></div>
      </div>

      <div
        class="hover:tilt-card relative col-span-5 row-span-4 overflow-hidden rounded-3xl bg-white/5 shadow-2xl backdrop-blur-sm transition-transform duration-500 ease-out md:col-span-6 md:row-span-8"
        style="transform-style: preserve-3d;"
      >
        <img src={archives5} alt="" class="h-full w-full object-cover" />
        <div
          class="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"
        ></div>
      </div>

      <div
        class="hover:tilt-card relative col-span-3 row-span-3 overflow-hidden rounded-3xl bg-white/5 shadow-2xl backdrop-blur-sm transition-transform duration-500 ease-out md:col-span-4 md:row-span-5"
        style="transform-style: preserve-3d;"
      >
        <img src={archives4} alt="" class="h-full w-full object-cover" />
        <div
          class="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"
        ></div>
      </div>

      <div
        class="hover:tilt-card relative col-span-3 row-span-1 overflow-hidden rounded-3xl bg-white/5 shadow-2xl backdrop-blur-sm transition-transform duration-500 ease-out md:col-span-5 md:row-span-8"
        style="transform-style: preserve-3d;"
      >
        <img src={archives7} alt="" class="h-full w-full object-cover" />
        <div
          class="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"
        ></div>
      </div>

      <div
        class="hover:tilt-card relative col-span-8 row-span-3 overflow-hidden rounded-3xl bg-white/5 shadow-2xl backdrop-blur-sm transition-transform duration-500 ease-out md:col-span-10 md:row-span-6"
        style="transform-style: preserve-3d;"
      >
        <img src={archives6} alt="" class="h-full w-full object-cover" />
        <div
          class="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"
        ></div>
      </div>
    </div>
  </ScrollReveal>
</section>

<section id="register" class="relative flex scroll-mt-30 flex-col items-center gap-5">
  <Star class="bottom-10 -left-40 w-28 rotate-12 opacity-50 dark:opacity-90" />
  <Star class="-top-35 -right-40 w-80 rotate-220 opacity-40 dark:opacity-80" />
  <Star class="-top-50 -right-20 w-30 rotate-140 opacity-40 blur-[1px] dark:opacity-60" />
  <Star class="top-10 -right-40 w-23 rotate-165 opacity-40 blur-[2px] dark:opacity-30" />

  <ScrollReveal delay="50ms">
    <div class="text-center text-5xl font-semibold">Register for PF/JF</div>
  </ScrollReveal>
  <ScrollReveal delay="100ms">
    <p
      class="font-inter -mt-4 text-center text-sm leading-relaxed font-light text-foreground/90 italic"
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </p>
  </ScrollReveal>

  <div class="mt-4 mb-8 flex flex-col gap-5 md:flex-row">
    <div
      class="h-[300px] w-full shrink-0 md:w-[360px]"
      use:viewport={{
        onEnter: () => (isSceneVisible = true),
        threshold: 0.2
      }}
    >
      {#if isSceneVisible}
        <ScrollReveal delay="200ms" class="h-full w-full">
          <PFJFRegisterScene />
        </ScrollReveal>
      {/if}
    </div>

    <div class="place-items-center">
      <div class="grid grid-cols-[auto_1fr] gap-x-6 gap-y-8 px-4">
        {#each registrationSteps as step, i (step.title)}
          {@const { Icon, title, description } = step}

          <ScrollReveal delay={`${300 + i * 50}ms`} class="place-self-center">
            <Icon class="size-12 text-primary" />
          </ScrollReveal>
          <ScrollReveal delay={`${300 + i * 50}ms`}>
            <div class="flex flex-col gap-1">
              <span class="font-lexend text-2xl font-medium">{title}</span>
              <p class="font-lexend text-justify font-light">{description}</p>
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
            size="xl"
            class="register-btn relative isolate overflow-hidden !bg-transparent px-16 shadow-[0px_5px_20px_rgba(0,0,0,0.3),inset_0px_1px_0px_rgba(255,255,255,0.6)]"
          >
            <span class="relative z-10">Register</span>
          </Button>
        </div>
      </ScrollReveal>
    </div>
  </div>
</section>

<style>
  :global(.pf-jf-card:hover) {
    box-shadow:
      0px 2px 10px rgba(0, 0, 0, 0.25) inset,
      0 30px 40px -10px rgba(127, 82, 187, 0.15),
      0 12px 15px -8px rgba(0, 0, 0, 0.2) !important;
  }
  .hover\:tilt-card:hover {
    transform: rotateX(-3deg) rotateY(-3deg) scale(1.02);
  }
</style>
