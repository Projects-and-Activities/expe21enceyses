<script lang="ts">
  import Star from '$lib/components/Star.svelte';
  import { LiquidGlass } from 'liquid-glass-svelte';

  let { isDark, GLASS_OPTIONS, BORDER_GRADIENT, overview_description, event_title } = $props();
</script>

<!-- ===================== OVERVIEW SECTION ===================== -->
<section
  id="overview"
  class=" relative mt-30 flex scroll-mt-36 flex-col gap-4 text-center md:scroll-mt-64 lg:mt-10"
>
  <Star
    class="bottom-36 -left-30 h-[261px] w-[255px] rotate-44 opacity-40 blur-[1px] dark:opacity-70"
  />
  <Star class="bottom-30 -left-35 w-18 rotate-250 opacity-20 blur-[1px] dark:opacity-40" />
  <Star class="-bottom-30 -left-40 w-50 rotate-10 opacity-40 dark:opacity-80" />
  <Star class="top-80 left-5 w-20 rotate-250 opacity-40 blur-[1px] dark:opacity-60" />
  <Star class="-top-26 -right-45 w-45 rotate-40 opacity-50 dark:opacity-60" />
  <Star class="top-14 -right-27 w-20 rotate-250 opacity-20 blur-[1px] dark:opacity-40" />
  <Star class="top-27 -right-45 w-80 rotate-44 opacity-40 dark:opacity-80" />

  <div
    class=" mx-5 max-w-[1216px] rounded-[1.5625rem] shadow-xl lg:mx-0"
    style={`background: ${BORDER_GRADIENT}`}
  >
    <LiquidGlass
      class="relative block h-full w-full !overflow-visible rounded-[1.5rem] p-8 hover:border-purple-500/50 lg:p-12 "
      options={GLASS_OPTIONS}
      style={`border: 1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(150,150,150,0.5)'};`}
    >
      <h2 class="text:text-2xl mb-4 font-semibold text-primary lg:text-3xl">Overview</h2>
      <p class="text-justify leading-relaxed lg:mt-3 lg:text-center lg:text-xl">
        <strong>{event_title}</strong>
        {overview_description}
      </p>
    </LiquidGlass>
  </div>
</section>
