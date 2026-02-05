<script lang="ts">
  import { page } from '$app/state';
  import { FormProvider, RegistrationController } from '$lib/components/form/core';
  import { EVENT_REGISTRY } from '$lib/components/form/core/config';
  import SuccessState from '$lib/components/form/SuccessState.svelte';
  import Star from '$lib/components/Star.svelte';

  let { data } = $props();

  const eventId = $derived(page.params.eventId ?? '');

  const config = $derived(EVENT_REGISTRY[eventId]);

  let controller = $derived.by(() => {
    if (!config || !eventId) return null;

    return new RegistrationController({
      getForm: () => data.form,
      schema: config.schema,
      storageKey: eventId,
      stepItems: config.steps
    });
  });
</script>

<div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none">
  <Star class="absolute -top-10 -right-10 w-56 -rotate-12 opacity-15 blur-[2px] dark:opacity-30" />
  <Star class="absolute top-24 right-20 w-16 rotate-45 opacity-25 dark:opacity-60" />
  <Star class="absolute top-12 left-1/4 w-8 -rotate-45 opacity-15 blur-[1px] dark:opacity-40" />
  <Star class="absolute top-32 left-10 w-14 rotate-12 opacity-10 dark:opacity-30" />
  <Star class="absolute bottom-20 -left-12 w-40 rotate-12 opacity-20 blur-[1px] dark:opacity-50" />
  <Star class="absolute bottom-48 left-12 w-20 -rotate-90 opacity-30 dark:opacity-70" />
  <Star class="absolute bottom-10 left-48 w-10 rotate-45 opacity-20 dark:opacity-40" />
  <Star class="absolute right-10 bottom-1/3 w-12 -rotate-12 opacity-15 blur-[2px]" />
  <Star class="absolute right-32 bottom-12 w-24 rotate-180 opacity-10 dark:opacity-25" />
  <Star class="absolute top-1/2 left-20 w-6 rotate-12 opacity-10" />
  <Star class="absolute top-2/3 right-1/4 w-8 -rotate-45 opacity-15 blur-[1px]" />
</div>

{#key eventId}
  {#if controller && config}
    <FormProvider {controller} Skeleton={config.skeleton}>
      {#snippet children({ step })}
        {@const activeItem = config.steps[step - 1]}
        <activeItem.component {...activeItem.props} />
      {/snippet}

      {#snippet success()}
        <SuccessState currentEventId={eventId} />
      {/snippet}
    </FormProvider>
  {/if}
{/key}
