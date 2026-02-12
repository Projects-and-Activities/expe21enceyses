<script lang="ts">
  import { LiquidGlass } from 'liquid-glass-svelte';

  import ScrollReveal from '$lib/components/ScrollReveal.svelte';
  import Star from '$lib/components/Star.svelte';

  let { speakers, isDark, GLASS_OPTIONS, BORDER_GRADIENT } = $props();
</script>

<section class="relative mx-auto mt-20 w-full items-center px-6 py-12">
  <!-- Decorative stars -->
  <Star class="-right-50 -bottom-10 w-40 -rotate-1 opacity-20 dark:opacity-80" />
  <Star class="top-0 -right-50 w-80 rotate-43 opacity-15 dark:opacity-70" />
  <Star
    class="-right-10 bottom-100 w-24 rotate-250 opacity-20 lg:-right-25 lg:bottom-44 dark:opacity-70"
  />
  <Star class="top-10 -left-40 w-70 opacity-20 dark:opacity-80" />
  <Star
    class="top-140 -left-0 w-20 rotate-250 opacity-20 lg:bottom-35 lg:-left-40 lg:w-30 lg:rotate-210 dark:opacity-70"
  />
  <Star class="-bottom-20 -left-24 w-50 rotate-50 opacity-20 dark:opacity-70" />

  <ScrollReveal>
    <!-- Header -->
    <div class="mb-7 text-center">
      <h2 class="text-3xl leading-relaxed font-normal lg:text-4xl">
        <span class="font-semibold">Coming Soon</span>
      </h2>
      <p class=" px-5 text-sm leading-relaxed italic md:text-sm lg:text-lg">
        Insights from professionals working at the forefront of the tech industry.
      </p>
    </div></ScrollReveal
  >
  <div class=" flex min-w-[322px] justify-center lg:mx-0">
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
          {#each speakers as speaker (speaker.name)}
            <div class="group relative overflow-hidden">
              <enhanced:img
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
