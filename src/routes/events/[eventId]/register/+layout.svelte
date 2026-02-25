<script lang="ts">
  import { page } from '$app/state';
  import TooltipProvider from '$lib/components/ui/tooltip/tooltip-provider.svelte';

  const meta = $derived(
    page.data.eventMeta || {
      title: 'Event Registration',
      date: '',
      description: ''
    }
  );

  let { children } = $props();
</script>

<main class="my-20 flex w-full items-center justify-center px-4 lg:py-12">
  <div class="pointer-events-none fixed inset-0 -z-10 h-screen overflow-hidden">
    <div
      class="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-purple-400/20 mix-blend-multiply blur-[120px]"
    ></div>
    <div
      class="absolute -right-[10%] -bottom-[10%] h-[40%] w-[40%] rounded-full bg-purple-400/20 mix-blend-multiply blur-[120px]"
    ></div>
    <div
      class="absolute top-1/2 left-1/2 h-[50%] w-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-400/10 blur-[100px]"
    ></div>
  </div>

  <div class="mx-auto max-w-2xl flex-1">
    <div class="mb-10 space-y-3 text-center">
      <h1 class="text-4xl font-bold tracking-tight">
        {meta.title}
      </h1>

      {#if meta.date}
        <div class="font-mono text-lg font-medium dark:text-zinc-500">
          &lt;{meta.date}&gt;
        </div>
      {/if}

      {#if meta.description}
        <p class="mx-auto max-w-md leading-relaxed dark:text-zinc-400">
          {meta.description}
        </p>
      {/if}
    </div>

    <div>
      <TooltipProvider>
        {@render children()}
      </TooltipProvider>
    </div>
  </div>
</main>
