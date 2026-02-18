<script lang="ts">
  import { viewport } from '$lib/actions/viewport';
  import CompanyTalksRegisterScene from '$lib/components/3d-ascii/sections/CompanyTalksRegisterScene.svelte';
  import ScrollReveal from '$lib/components/ScrollReveal.svelte';
  import Star from '$lib/components/Star.svelte';
  import Button from '$lib/components/ui/button/button.svelte';

  let { registrationSteps } = $props();
  let isSceneVisible = $state(false);
</script>

<section
  id="register"
  class="relative mt-20 mb-10 flex w-full max-w-[1184px] scroll-mt-30 flex-col items-center"
>
  <Star
    class="absolute -right-3 -bottom-1 w-8 rotate-250 opacity-50 lg:-right-40 lg:bottom-20 lg:w-28 lg:rotate-12 dark:opacity-90"
  />
  <Star
    class="absolute -right-10 bottom-13 w-10 rotate-250 opacity-35 lg:-right-14 lg:bottom-10 lg:w-15 lg:-rotate-0 dark:opacity-70"
  />
  <Star class="absolute bottom-40 -left-40 w-28 rotate-0 opacity-50 dark:opacity-90" />
  <Star
    class="absolute bottom-5 left-2 w-15 rotate-250 opacity-35 lg:bottom-30 lg:-left-14 lg:-rotate-0 dark:opacity-70"
  />

  <ScrollReveal>
    <div class="mb-10 text-center">
      <h2 class="text-2xl leading-relaxed font-semibold lg:text-4xl">Register for Company Talks</h2>
      <p class="mt-1 px-4 text-center text-sm leading-relaxed italic lg:mt-2 lg:text-lg">
        Take your first step toward learning from industry professionals and gaining real-world
        insights
      </p>
    </div>
  </ScrollReveal>

  <div
    class="mx-auto grid h-auto w-full max-w-[1184px] grid-cols-1 gap-8 md:grid-cols-[1fr_1fr] lg:h-[540px] lg:gap-12"
  >
    <div
      class="order-1 flex h-[240px] w-full items-center justify-center md:mt-5 md:h-full md:w-full lg:h-[499px]"
      use:viewport={{
        onEnter: () => (isSceneVisible = true),
        threshold: 0.2
      }}
    >
      {#if isSceneVisible}
        <ScrollReveal delay="200ms" class="h-full w-full">
          <CompanyTalksRegisterScene />
        </ScrollReveal>
      {/if}
    </div>

    <div class="order-2 flex flex-col px-3 text-center md:p-0 md:px-0 lg:px-0">
      <div class="grid grid-cols-[auto_1fr] gap-x-8 gap-y-8 text-justify">
        {#each registrationSteps as step, i (step.title)}
          {@const { Icon, title, description } = step}

          <ScrollReveal delay={`${300 + i * 50}ms`} class="place-self-center">
            <Icon class="size-12 text-primary" />
          </ScrollReveal>

          <ScrollReveal delay={`${300 + i * 50}ms`}>
            <div class="flex flex-col gap-2">
              <span class="text-xl font-bold">{title}</span>

              <p class="text-justify leading-relaxed">
                {@html description}
              </p>
            </div>
          </ScrollReveal>
        {/each}
      </div>

      <ScrollReveal delay="600ms" class="mx-auto my-12 w-fit">
        <Button href="company-talks/register" variant="gradient" size="xl">
          <span class="relative z-10">Register</span>
        </Button>
      </ScrollReveal>
    </div>
  </div>
</section>
