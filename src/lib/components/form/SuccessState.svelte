<script lang="ts">
  import { ArrowLeft, Briefcase, CircleCheck, Code, Mic } from '@lucide/svelte';
  import { onMount } from 'svelte';

  import Star from '../Star.svelte';

  import { goto } from '$app/navigation';
  import GlassCard from '$lib/components/GlassCard.svelte';
  import { Button } from '$lib/components/ui/button';

  // Replace nalang icon with the actual asset
  const ALL_EVENTS = [
    { id: 'pfjf', title: 'PF/JF', icon: Briefcase, link: '/events/pfjf/register' },
    {
      id: 'company-talks',
      title: 'Company Talks',
      icon: Mic,
      link: '/events/company-talks/register'
    }
  ] as const;

  let { currentEventId } = $props<{ currentEventId: string }>();

  let showHackfestCard = $derived(!currentEventId.includes('hackfest'));
  let otherEvents = $derived(ALL_EVENTS.filter((e) => e.id !== currentEventId));

  let stars = $state<{ id: number; x: number; y: number; scale: number; rotation: number }[]>([]);

  onMount(() => {
    stars = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: 0.5 + Math.random() * 1.5,
      rotation: Math.random() * 360
    }));
  });
</script>

<div class="flex animate-in flex-col items-center gap-8 pb-10 duration-500 zoom-in-95 fade-in">
  <div class="pointer-events-none absolute inset-0 -z-10 h-full overflow-hidden" aria-hidden="true">
    {#each stars as s (s.id)}
      <div
        class="absolute transition-opacity duration-1000"
        style:left="{s.x}%"
        style:top="{s.y}%"
        style:transform="rotate({s.rotation}deg) scale({s.scale})"
      >
        <Star class="w-12 opacity-30 blur-[1px] dark:opacity-60" />
      </div>
    {/each}
  </div>

  <div
    class="flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-6 py-2 text-green-600 shadow-[0_0_15px_rgba(74,222,128,0.1)] backdrop-blur-sm dark:text-green-400"
  >
    <CircleCheck class="size-5" />
    <span class="font-semibold tracking-wide">Registration Submitted!</span>
  </div>

  <Button
    variant="outline"
    size="lg"
    class="group w-full max-w-sm border-purple-200 bg-purple-50 text-purple-900 hover:border-purple-300 hover:bg-purple-100 hover:text-purple-950 dark:border-purple-500/30 dark:bg-purple-500/10 dark:text-zinc-50 dark:hover:border-purple-500/50 dark:hover:bg-purple-500/20 dark:hover:text-purple-300"
    onclick={() => goto('/')}
  >
    <ArrowLeft class="mr-2 size-4 transition-transform group-hover:-translate-x-1" />
    Return to Home
  </Button>

  <div class="mt-8 w-full space-y-6">
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t border-zinc-200 dark:border-zinc-800"></span>
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="bg-white px-2 text-zinc-500 dark:bg-zinc-950">
          Secure your slot to our other events here
        </span>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {#if showHackfestCard}
        <GlassCard
          class="group relative flex flex-col items-center gap-6 border border-zinc-200 bg-white/50 p-8 transition-all hover:border-purple-500/30 hover:bg-purple-50/50 dark:border-white/5 dark:bg-transparent dark:hover:bg-zinc-900/60"
        >
          <div class="relative">
            <div
              class="absolute inset-0 -z-10 animate-pulse bg-purple-500/20 blur-xl transition-all group-hover:bg-purple-500/30"
            ></div>
            <Code
              class="size-12 text-zinc-400 transition-colors group-hover:text-purple-600 dark:text-zinc-300 dark:group-hover:text-purple-300"
            />
          </div>

          <span
            class="text-lg font-bold tracking-tight text-zinc-900 group-hover:text-purple-700 dark:text-white dark:group-hover:text-purple-200"
          >
            Hackfest
          </span>

          <div class="grid w-full grid-cols-2 gap-2">
            <Button
              class="w-full bg-purple-600 text-white shadow-lg shadow-purple-900/10 hover:bg-purple-700 dark:bg-purple-600/80 dark:shadow-purple-900/20 dark:hover:bg-purple-600"
              onclick={() => goto('/events/junior-hackfest/register')}
            >
              Junior
            </Button>
            <Button
              variant="outline"
              class="w-full border-purple-200 text-purple-900 hover:bg-purple-50 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
              onclick={() => goto('/events/senior-hackfest/register')}
            >
              Senior
            </Button>
          </div>
        </GlassCard>
      {/if}

      {#each otherEvents as event (event.id)}
        <GlassCard
          class="group relative flex flex-col items-center gap-6 border border-zinc-200 bg-white/50 p-8 transition-all hover:border-purple-500/30 hover:bg-purple-50/50 dark:border-white/5 dark:bg-transparent dark:hover:bg-zinc-900/60"
        >
          <div class="relative">
            <div
              class="absolute inset-0 -z-10 animate-pulse bg-purple-500/20 blur-xl transition-all group-hover:bg-purple-500/30"
            ></div>
            <event.icon
              class="size-12 text-zinc-400 transition-colors group-hover:text-purple-600 dark:text-zinc-300 dark:group-hover:text-purple-300"
            />
          </div>

          <span
            class="text-lg font-bold tracking-tight text-zinc-900 group-hover:text-purple-700 dark:text-white dark:group-hover:text-purple-200"
          >
            {event.title}
          </span>

          <Button
            class="w-full bg-purple-600 text-white shadow-lg shadow-purple-900/10 hover:bg-purple-700 dark:bg-purple-600/80 dark:shadow-purple-900/20 dark:hover:bg-purple-600"
            onclick={() => goto(event.link)}
          >
            Register <span class="ml-1 opacity-70">→</span>
          </Button>
        </GlassCard>
      {/each}
    </div>
  </div>
</div>
