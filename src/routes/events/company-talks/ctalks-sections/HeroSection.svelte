<script lang="ts">
  import ScrollReveal from '$lib/components/ScrollReveal.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import ChevronsDown from '@lucide/svelte/icons/chevrons-down';
  import microphone from '$lib/assets/ctalks.png';
  import CompanyTalksScene from '$lib/components/3d-ascii/sections/CompanyTalksScene.svelte';

  let { event_title, tagline, register_route } = $props();
  const titleParts = $derived(event_title.split(':'));
</script>

<div
  class="absolute inset-0 -z-10 hidden h-screen w-full [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)] lg:block"
>
  <CompanyTalksScene />
</div>

<section
  class="relative mt-50 flex flex-col place-content-center place-items-center gap-2 lg:mt-27 lg:h-screen lg:gap-9"
>
  <h1
    class="relative z-10 grid place-content-center text-center font-[Lexend] font-semibold tracking-normal *:leading-12 xs:*:leading-18"
  >
    <ScrollReveal delay="1500ms">
      <div class="dark text-[28px] lg:text-5xl">
        {titleParts[0]}{titleParts[1] ? ':' : ''}
      </div>
    </ScrollReveal>

    <ScrollReveal delay="1800ms" class="mx-auto">
      <div class="bold text-[40px] lg:text-7xl">
        {titleParts[1]?.trim() || ''}
      </div>
    </ScrollReveal>
  </h1>

  <ScrollReveal delay="1900ms">
    <div class="relative z-10 px-4 text-center text-[14px] lg:px-0 lg:text-xl">
      {tagline}
    </div>
  </ScrollReveal>
  <div
    class="absolute inset-0 -z-10 h-screen w-full [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)] lg:hidden"
  >
    <CompanyTalksScene />
  </div>
  <ScrollReveal delay="3000ms">
    <div
      class="relative z-10 mt-70 place-items-center rounded-[3.75rem] p-[0.135rem] lg:mt-0"
      style="background: linear-gradient(180deg, var(--muted-foreground) 0%, var(--background) 60%, var(--muted-foreground) 100%);"
    >
      <a href={register_route} class="block rounded-[3.75rem]">
        <Button
          variant="gradient"
          size="xl"
          class="register-btn relative isolate !h-10 overflow-hidden !bg-transparent !px-6 !text-sm shadow-[0px_5px_20px_rgba(0,0,0,0.3),inset_0px_1px_0px_rgba(255,255,255,0.6)] md:!h-14 md:!px-10 md:!text-lg"
        >
          <span class="relative z-10 md:hidden">Learn More</span>
          <span class="relative z-10 hidden md:inline">Register Now</span>
        </Button>
      </a>
    </div>
  </ScrollReveal>

  <ScrollReveal delay="650ms">
    <button
      onclick={() => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })}
      class="relative z-10 mt-20 hidden animate-bounce cursor-pointer transition-transform hover:translate-y-1 lg:flex"
      aria-label="Scroll to next section"
    >
      <ChevronsDown size={30} class=" hover:text-primary" />
    </button>
  </ScrollReveal>
</section>
