<script lang="ts">
  import { LiquidGlass } from 'liquid-glass-svelte';

  import ScrollReveal from '$lib/components/ScrollReveal.svelte';
  import Star from '$lib/components/Star.svelte';

  let { keyDetails, sessionPreview, isDark, GLASS_OPTIONS, BORDER_GRADIENT } = $props();
  const CARD_WIDTH = 317;
  const SLIDE_GAP = 30;
  const SLIDE_WIDTH = CARD_WIDTH + SLIDE_GAP;

  let activeSessionIndex = $state(0);
  let sessionContainer: HTMLDivElement | undefined = $state();

  function handleSessionScroll() {
    if (!sessionContainer) return;
    activeSessionIndex = Math.round(sessionContainer.scrollLeft / SLIDE_WIDTH);
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
  <Star class="top-77 left-40 w-53 rotate-30 opacity-30 lg:-left-55 dark:opacity-80" />
  <Star class="bottom-10 left-50 w-17 rotate-25 opacity-40 dark:opacity-60" />
  <Star class="top-105 left-59 w-20 rotate-45 opacity-15 dark:opacity-60" />
  <Star class="bottom-65 left-87 w-13 rotate-250 opacity-40 dark:opacity-80" />
  <Star class="bottom-55 -left-40 w-17 rotate-250 opacity-40 dark:opacity-80" />
  <!-- ================= MOBILE VIEW ================= -->
  <div class="flex w-full flex-col items-center gap-8 lg:hidden">
    <ScrollReveal>
      <h2 class="text-4xl leading-relaxed font-normal">
        <span class="font-semibold">Inside</span> the
        <span class="font-semibold italic">Sessions</span>
      </h2>
      <p class="leaning-relaxed mt-2 text-sm italic">Where theory meets practice.</p>
    </ScrollReveal>

    <enhanced:img
      style={`background: ${BORDER_GRADIENT}`}
      src={sessionPreview}
      alt="Session preview"
      class="mt-5 mb-5 h-[294px] w-[267px] rounded-xl border border-white/30 object-cover
           shadow-2xl ring-1 ring-white/10 backdrop-blur-sm ring-inset"
    />

    <!-- MOBILE CAROUSEL -->
    <div class="relative w-full overflow-hidden">
      <div
        bind:this={sessionContainer}
        onscroll={handleSessionScroll}
        class="scrollbar-hide flex touch-pan-x snap-x snap-mandatory overflow-x-auto overscroll-x-contain mask-x-from-10% pb-6"
        style="
        scrollbar-width: none;
        -ms-overflow-style: none;
        scroll-behavior: smooth;
        padding-inline: calc(50% - {CARD_WIDTH / 2}px);
      "
      >
        {#each keyDetails as detail, i (i)}
          <div
            class="shrink-0 snap-center transition-all duration-500 ease-out
          {i === activeSessionIndex ? 'scale-100 opacity-100' : 'scale-90 opacity-40'}"
            style="width: {SLIDE_WIDTH}px"
          >
            <div class="mx-auto w-[317px] rounded-[28px]">
              {@render detailCard(detail)}
            </div>
          </div>
        {/each}
      </div>

      <!-- DOTS -->
      <div class="mt-4 flex justify-center gap-1">
        {#each keyDetails as _, i (i)}
          <button
            onclick={() => {
              if (!sessionContainer) return;
              sessionContainer.scrollTo({
                left: i * SLIDE_WIDTH,
                behavior: 'smooth'
              });
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
  <!-- ================= DESKTOP VIEW ================= -->
  <div class="hidden grid-cols-1 gap-16 lg:grid lg:grid-cols-[1fr_1fr_1fr]">
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
    <div class="flex flex-col items-center lg:gap-15">
      <ScrollReveal class="mb-15">
        <h2 class="leading-relaxed font-normal text-nowrap">
          <span class="font-semibold">Inside</span> the
          <span class="font-semibold italic">Sessions</span>
        </h2>
        <p class="text-xl leading-relaxed italic">Where theory meets practice.</p>
      </ScrollReveal>

      <enhanced:img
        src={sessionPreview}
        alt="Session preview"
        class="h-[294px] w-[257px] rounded-[1.5625rem] border border-white/30 object-cover shadow-2xl
             ring-1 ring-white/10 backdrop-blur-sm ring-inset lg:h-[467px] lg:w-[425px]"
      />

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
    class="relative h-[252px] w-[317px] !overflow-visible rounded-[48px]  pt-10 pb-6
	       text-center shadow-lg "
    options={GLASS_OPTIONS}
    style={`border: 1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(150,150,150,0.5)'};`}
  >
    <detail.icon class="mx-auto mb-6 h-24 w-24 stroke-[0.8px] text-primary" />
    <p
      class="mx-auto max-w-[260px] text-sm leading-relaxed
		       "
    >
      {detail.description}
    </p>
  </LiquidGlass>
{/snippet}
