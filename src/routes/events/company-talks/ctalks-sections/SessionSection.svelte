<script lang="ts">
  import { onMount } from 'svelte';
  import Star from '$lib/components/Star.svelte';
  import ScrollReveal from '$lib/components/ScrollReveal.svelte';
  import { LiquidGlass } from 'liquid-glass-svelte';

  let { keyDetails, sessionPreview, isDark, GLASS_OPTIONS, BORDER_GRADIENT } = $props();

  let isSceneVisible = $state(false);
  let activeSessionIndex = $state(0);
  let sessionContainer: HTMLDivElement | undefined = $state();

  onMount(() => {
    isSceneVisible = true;
  });

  function handleSessionScroll() {
    if (!sessionContainer) return;

    const scrollLeft = sessionContainer.scrollLeft;
    // Use the actual width of the container/item instead of a hardcoded number
    const itemWidth = sessionContainer.offsetWidth;

    activeSessionIndex = Math.round(scrollLeft / itemWidth);
  }
</script>

<!-- ===================== INSIDE THE SESSIONS ===================== -->
<section
  class="relative mt-30 flex scroll-mt-20 flex-col items-center gap-4 text-center md:scroll-mt-64 lg:mt-60"
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
      src={sessionPreview}
      alt="Session preview"
      class=" max-h-[294px] max-w-[267px] rounded-xl border border-white/30
         shadow-2xl ring-1 ring-white/10 backdrop-blur-sm ring-inset"
    />

    <div class="overflow-hidde relative mr-8 w-full">
      <div
        bind:this={sessionContainer}
        onscroll={handleSessionScroll}
        class="scrollbar-hide flex w-full touch-pan-x snap-x snap-mandatory overflow-x-auto pb-6"
        style="scrollbar-width: none; -ms-overflow-style: none;"
      >
        {#each keyDetails as detail, i}
          <div
            class="flex w-full shrink-0 snap-center snap-always justify-center transition-all duration-700 ease-in-out
  {i === activeSessionIndex ? 'scale-100 opacity-100' : 'scale-90 opacity-30'}"
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
        <h2 class="text-4xl leading-relaxed font-normal">
          <span class="font-semibold">Inside</span> the
          <span class="font-semibold italic">Sessions</span>
        </h2>
        <p class="text-xl leading-relaxed italic">Where theory meets practice.</p>
      </ScrollReveal>

      <!-- CENTER IMAGE -->
      <img
        src={sessionPreview}
        alt="Session preview"
        class="h-[294px] w-[257px] rounded-[1.5625rem] border border-white/30 shadow-2xl
         ring-1 ring-white/10 backdrop-blur-sm ring-inset lg:h-[467px] lg:w-[425px]"
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
