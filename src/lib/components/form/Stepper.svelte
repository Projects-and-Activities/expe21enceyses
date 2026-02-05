<script lang="ts">
  import { Check } from '@lucide/svelte';

  let {
    steps,
    currentStep,
    loading = false
  } = $props<{
    steps: { label: string; value: number }[];
    currentStep: number;
    loading?: boolean;
  }>();
</script>

<div id="stepper" class="relative mx-auto mb-12 w-full max-w-2xl scroll-mt-20 px-6">
  <div class="absolute top-1/2 left-0 -z-10 w-full -translate-y-1/2 px-11">
    <div class="relative h-0.5 w-full bg-zinc-200 dark:bg-zinc-800">
      <div
        class="absolute top-0 left-0 h-full bg-purple-600 transition-all duration-500 ease-in-out"
        style="width: {loading ? 0 : ((currentStep - 1) / (steps.length - 1)) * 100}%"
      ></div>
    </div>
  </div>

  <div class="flex w-full justify-between">
    {#each steps as step (step.value)}
      {@const isCompleted = !loading && currentStep > step.value}
      {@const isActive = !loading && currentStep === step.value}

      <div class="flex flex-col items-center gap-2">
        <div
          class="relative flex size-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300
                    {loading
            ? 'animate-pulse border-zinc-200 bg-zinc-100 text-transparent dark:border-zinc-800 dark:bg-zinc-900' /* Loading State */
            : isActive
              ? 'border-purple-500 bg-white text-purple-600 shadow-[0_0_15px_rgba(168,85,247,0.3)] dark:bg-zinc-950 dark:text-purple-400 dark:shadow-[0_0_15px_rgba(168,85,247,0.5)]'
              : isCompleted
                ? 'border-purple-600 bg-purple-600 text-white'
                : 'border-zinc-300 bg-zinc-100 text-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-500'}"
        >
          {#if isCompleted}
            <Check class="size-5 animate-in duration-300 zoom-in" />
          {:else}
            <span>{step.value}</span>
          {/if}

          {#if isActive}
            <div
              class="absolute inset-0 -z-10 animate-ping rounded-full bg-purple-500/30 duration-1000"
            ></div>
          {/if}
        </div>

        <div class="absolute -bottom-8">
          {#if loading}
            <div class="h-3 w-16 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800"></div>
          {:else}
            <span
              class="text-xs font-medium whitespace-nowrap transition-colors duration-300
                            {isActive
                ? 'text-purple-600 dark:text-purple-400'
                : 'text-zinc-500 dark:text-zinc-500'}"
            >
              {step.label}
            </span>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>
