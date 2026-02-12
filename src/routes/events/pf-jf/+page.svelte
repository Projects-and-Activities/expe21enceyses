<script lang="ts">
  import { ChevronsDown, Bell, CloudUpload, SquarePen } from '@lucide/svelte';

  import { page } from '$app/state';
  import { viewport } from '$lib/actions/viewport';
  import archives1 from '$lib/assets/archives-1.png?enhanced';
  import archives2 from '$lib/assets/archives-2.png?enhanced';
  import archives3 from '$lib/assets/archives-3.png?enhanced';
  import archives4 from '$lib/assets/archives-4.png?enhanced';
  import archives5 from '$lib/assets/archives-5.png?enhanced';
  import archives6 from '$lib/assets/archives-6.png?enhanced';
  import archives7 from '$lib/assets/archives-7.png?enhanced';
  import PFJFRegisterScene from '$lib/components/3d-ascii/sections/PFJFRegisterScene.svelte';
  import PFJFScene from '$lib/components/3d-ascii/sections/PFJFScene.svelte';
  import Blob from '$lib/components/BackgroundBlob.svelte';
  import GlassCard from '$lib/components/GlassCard.svelte';
  import ScrollReveal from '$lib/components/ScrollReveal.svelte';
  import Star from '$lib/components/Star.svelte';
  import Button from '$lib/components/ui/button/button.svelte';

  let isSceneVisible = $state(false);

  const registrationSteps = [
    {
      Icon: SquarePen,
      title: 'Register',
      description:
        'Go to <a class="text-primary hover:underline" aria-disabled="true" role="link" tabindex="-1">register</a> and choose “Practicum & Job Fair” to begin your registration.'
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

<div class="pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-hidden">
  <!-- Desktop -->
  <Blob
    position="hidden md:block top-[435px] -left-[416px]"
    size="h-[487px] w-[601px]"
    opacity="opacity-100"
    mixBlend="mix-blend-overlay"
    blur="blur-[180px]"
    gradient="#BA52A9, #BA52A9"
  />
  <Blob
    position="hidden md:block top-[-10px] -right-[400px]"
    size="h-[530px] w-[700px]"
    opacity="opacity-100"
    blur="blur-[140px]"
    gradient="#7F52BA, #7F52BA"
  />
  <Blob
    position="hidden md:block top-[701px] left-[868px]"
    size="h-[240px] w-[317px]"
    opacity="opacity-100"
    blur="blur-[180px]"
    gradient="#5268BA, #5268BA"
  />

  <!-- Mobile -->
  <Blob
    position="block md:hidden top-[105px] -left-[269px]"
    size="h-[323px] w-[427px]"
    opacity="opacity-80"
    mixBlend="mix-blend-overlay"
    blur="blur-[145px]"
    gradient="#A152BA, #A152BA"
  />
  <Blob
    position="block md:hidden top-[562px] left-[254px]"
    size="h-[323px] w-[427px]"
    opacity="opacity-80"
    mixBlend="mix-blend-overlay"
    blur="blur-[145px]"
    gradient="#7F52BA, #7F52BA"
  />
  <Blob
    position="block md:hidden top-[1586px] -left-[170px]"
    size="h-[256px] w-[339px]"
    opacity="opacity-80"
    mixBlend="mix-blend-overlay"
    blur="blur-[145px]"
    gradient="#A152BA, #A152BA"
  />
  <Blob
    position="block md:hidden top-[2827px] -left-[170px]"
    size="h-[256px] w-[339px]"
    opacity="opacity-80"
    mixBlend="mix-blend-overlay"
    blur="blur-[145px]"
    gradient="#BA52A9, #BA52A9"
  />
  <Blob
    position="block md:hidden top-[3455px] left-[227px]"
    size="h-[256px] w-[339px]"
    opacity="opacity-80"
    mixBlend="mix-blend-overlay"
    blur="blur-[145px]"
    gradient="#A152BA, #A152BA"
  />
</div>

<section
  class="mt-30 flex max-w-none! flex-col place-content-center place-items-center gap-9 md:mt-35 lg:grid lg:h-screen"
>
  <div
    class="absolute inset-0 -z-10 h-screen w-full [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)] md:block"
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

  <ScrollReveal delay="600ms">
    <Button variant="gradient" size="xl" href={`${page.url.pathname}/register`} disabled>
      Register Now
    </Button>
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
      <div class="mb-4 text-center text-3xl font-semibold text-primary">Overview</div>
      <p
        class="text-justify leading-relaxed text-balance text-foreground/90 lg:text-center lg:text-xl"
      >
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

<section id="archive" class="relative flex scroll-mt-30 flex-col items-center gap-10">
  <Star class="top-40 -left-35 w-60 rotate-230 opacity-40 dark:opacity-80" />
  <Star class="top-100 -left-22 w-25 -rotate-35 opacity-40 blur-[2px] dark:opacity-50" />
  <Star class="bottom-25 -left-20 w-28 rotate-20 opacity-50 dark:opacity-90" />
  <Star class="bottom-45 -left-40 w-50 rotate-12 opacity-50 dark:opacity-90" />
  <Star class="-right-35 bottom-125 w-70 rotate-180 opacity-50 dark:opacity-80" />
  <Star class="-right-22 bottom-100 w-25 rotate-5 opacity-40 blur-[2px] dark:opacity-50" />

  <ScrollReveal delay="150ms">
    <h2 class=" font-semibold">The Archives</h2>
  </ScrollReveal>

  <div
    class="grid-rows-auto grid h-auto w-full grid-cols-8 gap-4 md:h-[130vh] md:grid-cols-15 md:grid-rows-22 md:gap-6"
    style="perspective: 1000px;"
  >
    <ScrollReveal delay="250ms" class="group col-span-8 row-span-3 md:col-span-4 md:row-span-8">
      <div
        class="relative h-full w-full overflow-hidden rounded-3xl bg-white/5 shadow-2xl backdrop-blur-sm transition-all duration-500 ease-out [transform-style:preserve-3d] hover:z-50 hover:scale-105 hover:[transform:rotateX(5deg)_rotateY(-5deg)]"
      >
        <enhanced:img src={archives1} alt="" class="h-full w-full object-cover" />
        <div
          class="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"
        ></div>
      </div>
    </ScrollReveal>

    <ScrollReveal delay="300ms" class="group col-span-4 row-span-2 md:col-span-6 md:row-span-5">
      <div
        class="relative h-full w-full overflow-hidden rounded-3xl bg-white/5 shadow-2xl backdrop-blur-sm transition-all duration-500 ease-out [transform-style:preserve-3d] hover:z-50 hover:scale-105 hover:[transform:rotateX(5deg)_rotateY(5deg)]"
      >
        <enhanced:img src={archives2} alt="" class="h-full w-full object-cover" />
        <div
          class="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"
        ></div>
      </div>
    </ScrollReveal>

    <ScrollReveal delay="350ms" class="group col-span-4 row-span-2 md:col-span-5 md:row-span-11">
      <div
        class="relative h-full w-full overflow-hidden rounded-3xl bg-white/5 shadow-2xl backdrop-blur-sm transition-all duration-500 ease-out [transform-style:preserve-3d] hover:z-50 hover:scale-105 hover:[transform:rotateX(2deg)_rotateY(8deg)]"
      >
        <enhanced:img src={archives3} alt="" class="h-full w-full object-cover" />
        <div
          class="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"
        ></div>
      </div>
    </ScrollReveal>

    <ScrollReveal delay="400ms" class="group col-span-5 row-span-4 md:col-span-6 md:row-span-8">
      <div
        class="relative h-full w-full overflow-hidden rounded-3xl bg-white/5 shadow-2xl backdrop-blur-sm transition-all duration-500 ease-out [transform-style:preserve-3d] hover:z-50 hover:scale-105 hover:[transform:rotateX(-5deg)_rotateY(-5deg)]"
      >
        <enhanced:img src={archives5} alt="" class="h-full w-full object-cover" />
        <div
          class="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"
        ></div>
      </div>
    </ScrollReveal>

    <ScrollReveal delay="450ms" class="group col-span-3 row-span-3 md:col-span-4 md:row-span-5">
      <div
        class="relative h-full w-full overflow-hidden rounded-3xl bg-white/5 shadow-2xl backdrop-blur-sm transition-all duration-500 ease-out [transform-style:preserve-3d] hover:z-50 hover:scale-105 hover:[transform:rotateX(-5deg)_rotateY(8deg)]"
      >
        <enhanced:img src={archives4} alt="" class="h-full w-full object-cover" />
        <div
          class="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"
        ></div>
      </div>
    </ScrollReveal>

    <ScrollReveal delay="500ms" class="group col-span-3 row-span-1 md:col-span-5 md:row-span-8">
      <div
        class="relative h-full w-full overflow-hidden rounded-3xl bg-white/5 shadow-2xl backdrop-blur-sm transition-all duration-500 ease-out [transform-style:preserve-3d] hover:z-50 hover:scale-105 hover:[transform:rotateX(-8deg)_rotateY(5deg)]"
      >
        <enhanced:img src={archives7} alt="" class="h-full w-full object-cover" />
        <div
          class="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"
        ></div>
      </div>
    </ScrollReveal>

    <ScrollReveal delay="550ms" class="group col-span-8 row-span-3 md:col-span-10 md:row-span-6">
      <div
        class="relative h-full w-full overflow-hidden rounded-3xl bg-white/5 shadow-2xl backdrop-blur-sm transition-all duration-500 ease-out [transform-style:preserve-3d] hover:z-50 hover:scale-105 hover:[transform:rotateX(-3deg)_rotateY(-3deg)]"
      >
        <enhanced:img src={archives6} alt="" class="h-full w-full object-cover" />
        <div
          class="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"
        ></div>
      </div>
    </ScrollReveal>
  </div>
</section>

<section id="register" class="relative flex scroll-mt-30 flex-col items-center gap-5">
  <Star class="bottom-10 -left-40 w-28 rotate-12 opacity-50 dark:opacity-90" />
  <Star class="-top-35 -right-40 w-80 rotate-220 opacity-40 dark:opacity-80" />
  <Star class="-top-50 -right-20 w-30 rotate-140 opacity-40 blur-[1px] dark:opacity-60" />
  <Star class="top-10 -right-40 w-23 rotate-165 opacity-40 blur-[2px] dark:opacity-30" />

  <ScrollReveal delay="50ms">
    <h2 class="text-center font-semibold">Register for PF/JF</h2>
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
              <span class="text-xl font-bold">{title}</span>
              <p class="font-lexend text-justify font-light">{@html description}</p>
            </div>
          </ScrollReveal>
        {/each}
      </div>

      <ScrollReveal delay="500ms" class="mx-auto my-12 w-fit">
        <Button variant="gradient" size="xl" disabled>Register</Button>
      </ScrollReveal>
    </div>
  </div>
</section>
