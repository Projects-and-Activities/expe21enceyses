<script lang="ts">
  import ScrollReveal from '$lib/components/ScrollReveal.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import ChevronsDown from '@lucide/svelte/icons/chevrons-down';
  import microphone from '$lib/assets/ctalks.png';

  let { event_title, tagline, register_route } = $props();
  const titleParts = $derived(event_title.split(':'));
</script>

<section
  class="relative mt-50 flex flex-col place-content-center place-items-center gap-2 lg:mt-20 lg:h-screen lg:gap-9"
>
  <h1
    class="relative z-10 grid place-content-center text-center font-[Lexend] font-semibold tracking-normal *:leading-12 xs:*:leading-18"
  >
    <ScrollReveal delay="300ms">
      <div class="dark text-[28px] lg:text-5xl">
        {titleParts[0]}{titleParts[1] ? ':' : ''}
      </div>
    </ScrollReveal>

    <ScrollReveal delay="400ms" class="mx-auto">
      <div class="bold text-[40px] lg:text-7xl">
        {titleParts[1]?.trim() || ''}
      </div>
    </ScrollReveal>
  </h1>

  <ScrollReveal delay="500ms">
    <div class="relative z-10 px-4 text-center text-[14px] lg:px-0 lg:text-xl">
      {tagline}
    </div>
  </ScrollReveal>

  <div
    class="relative z-0 mt-6 flex justify-center [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)] lg:pointer-events-none lg:absolute lg:inset-0 lg:-z-10 lg:mt-0"
  >
    <ScrollReveal>
      <img
        src={microphone}
        alt="ctalks icon"
        class="h-[214px] w-[214px] object-cover object-center opacity-40 lg:h-[522px] lg:w-[522px]"
      />
    </ScrollReveal>
  </div>

  <ScrollReveal delay="600ms">
    <div
      class="relative z-10 ml-2 rounded-[3.75rem] p-[0.135rem]"
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
      <ChevronsDown size={30} class="text-primary/60 hover:text-primary" />
    </button>
  </ScrollReveal>
</section>
