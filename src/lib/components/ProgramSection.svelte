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

<section class={cn('sticky  flex  flex-col justify-between  p-8', className)} {...rest}>
  <ScrollReveal delay="200ms">
    <p class="hidden text-2xl md:block">{subtitle}</p>
  </ScrollReveal>

  <div class="grid flex-1 place-content-center">
    {@render children?.()}
  </div>

  <div
    class="flex w-full flex-col place-items-center gap-y-8 text-center md:flex-row md:place-items-end md:justify-between md:text-left"
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
    <div
      class="z-50 mt-2 ml-2 rounded-[3.75rem] p-[0.135rem]"
      style="background: linear-gradient(180deg, var(--muted-foreground) 0%, var(--background) 60%, var(--muted-foreground) 100%);"
    >
      <Button
        variant="gradient"
        size="xl"
        class="register-btn relative isolate overflow-hidden bg-transparent! shadow-[0px_5px_20px_rgba(0,0,0,0.3),inset_0px_1px_0px_rgba(255,255,255,0.6)]"
        onclick={() => goto(`/events/${id}`)}
      >
        <span class="relative z-10">Explore</span>
      </Button>
    </div>
  </div>
</section>
