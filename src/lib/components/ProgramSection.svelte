<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import ScrollReveal from './ScrollReveal.svelte';
  import Button from './ui/button/button.svelte';

  import { goto } from '$app/navigation';
  import { cn } from '$lib/utils';

  type Props = {
    id: string;
    title: string;
    subtitle: string;
    class?: string;
  } & HTMLAttributes<HTMLElement>;

  let { id, title, subtitle, class: className, children, ...rest }: Props = $props();
</script>

<section
  class={cn('sticky  flex  flex-col justify-between  overflow-y-clip p-8', className)}
  {...rest}
>
  <ScrollReveal delay="200ms">
    <p class="hidden text-2xl md:block">{subtitle}</p>
  </ScrollReveal>

  <div class="grid flex-1 place-content-center">
    {@render children?.()}
  </div>

  <div
    class="flex w-full flex-col place-items-center gap-y-8 pt-12 text-center md:flex-row md:place-items-end md:justify-between md:text-left"
  >
    <div>
      <ScrollReveal class="hidden text-4xl font-extralight tracking-tighter md:block">
        EXPE21ENCE YSES:
      </ScrollReveal>
      <ScrollReveal delay="400ms">
        <h3 class="text-3xl xs:text-5xl md:text-6xl">{title}</h3>
      </ScrollReveal>
      <ScrollReveal delay="200ms">
        <p class="not-md:text-md mt-4 text-balance md:hidden">{subtitle}</p>
      </ScrollReveal>
    </div>

    <Button
      href={`events/${id}`}
      variant="gradient"
      size="xl"
      class="rounded-4xl! px-16 py-8 text-base">Explore</Button
    >
  </div>
</section>
