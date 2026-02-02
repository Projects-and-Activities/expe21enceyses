<script lang="ts">
  /**
   * THE FORM PROVIDER
   * No worries, pinagawa ko lang comments sa AI kasi tinatamad na ako
   * pero ako gumawa nitong abomination na to
   *
   * Role: The Visual Wrapper.
   * It connects the abstract Controller to the DOM.
   * It handles:
   * 1. Rendering the correct step component
   * 2. Managing navigation (Back/Next)
   * 3. Auto-saving drafts to LocalStorage
   */
  import { onMount, untrack, type Component, type Snippet } from 'svelte';

  import { setFormContext } from './context.ts';
  import type { RegistrationController } from './controller.svelte';

  import Stepper from '$lib/components/form/Stepper.svelte';
  import GlassCard from '$lib/components/GlassCard.svelte';
  import { Button } from '$lib/components/ui/button';

  type Props = {
    // The Brain (Single source of truth)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    controller: RegistrationController<any>;

    // Visual Components
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Skeleton?: Component<any>;
    children: Snippet<[{ step: number }]>; // Render prop for the active step
    success?: Snippet; // Render prop for the success screen
  };

  let { controller, Skeleton, children, success }: Props = $props();

  // 1. DEPENDENCY INJECTION
  // Pass the form instance down to all children inputs via Context.
  // This avoids prop-drilling 'errors' and 'constraints' through every component.
  setFormContext(untrack(() => controller.form));
  // Extract methods for local use
  const { submit, form: formData, validate, submitting, enhance } = untrack(() => controller.form);

  // 2. NAVIGATION LOGIC
  async function nextStep() {
    if (controller.step === controller.steps.length) {
      submit();
      return;
    }

    // Look up which fields need to be valid for the CURRENT step
    const fields = controller.config[controller.step];

    if (!fields) {
      controller.step++;
      return;
    }

    // Trigger validation ONLY for those specific fields
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const results = await Promise.all(fields.map((f: any) => validate(f)));

    // If all fields pass, advance.
    if (results.every((r) => !r)) {
      controller.step++;
      scrollToTop();
    }
  }

  function prevStep() {
    if (controller.step > 1) {
      controller.step--;
      scrollToTop();
    }
  }

  // 3. STORAGE SANITIZATION
  // LocalStorage crashes on binary objects (Files). We strip them out.
  function cleanForStorage(data: unknown): unknown {
    if (data instanceof File) return undefined;
    if (Array.isArray(data)) return data.map(cleanForStorage);
    if (typeof data === 'object' && data !== null) {
      return Object.fromEntries(Object.entries(data).map(([k, v]) => [k, cleanForStorage(v)]));
    }
    return data;
  }

  function scrollToTop() {
    const el = document.getElementById('stepper-top');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // 4. HYDRATION (Load)
  onMount(() => {
    const saved = localStorage.getItem(controller.storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.form) {
          // Merge saved draft with current form structure
          $formData = { ...$formData, ...parsed.form };
          // Restore user's last position
          if (typeof parsed.step === 'number') controller.step = parsed.step;
        }
      } catch (e) {
        console.error('Failed to load draft', e);
      }
    }
    controller.loaded = true;
  });

  // 5. PERSISTENCE (Save)
  $effect(() => {
    // STOP GAP: The "Zombie Effect" Fix.
    // If the form is submitted, immediately stop saving and clear storage.
    // This prevents the success state changes from accidentally re-saving the form.
    if (controller.submitted) {
      localStorage.removeItem(controller.storageKey);
      return;
    }

    // Don't save empty state before we've finished loading
    if (!controller.loaded) return;

    const formState = cleanForStorage({ ...$formData });
    localStorage.setItem(
      controller.storageKey,
      JSON.stringify({ form: formState, step: controller.step })
    );
  });
</script>

<svelte:window
  on:keydown={(e) => {
    if (e.key === 'Enter') nextStep();
  }}
/>

<div id="stepper-top" class="scroll-mt-20"></div>

{#if controller.submitted && success}
  {@render success()}
{:else}
  {#if controller.steps.length > 1}
    <Stepper steps={controller.steps} currentStep={controller.step} loading={!controller.loaded} />
  {/if}

  {#if !controller.loaded}
    {#if Skeleton}
      <Skeleton />
    {:else}
      <div class="animate-pulse rounded-xl bg-zinc-900/10 p-8 text-center text-zinc-500">
        Loading form...
      </div>
    {/if}
  {:else}
    <GlassCard class="p-6">
      <form method="POST" enctype="multipart/form-data" use:enhance class="space-y-8">
        {#key controller.step}
          <div class="animate-in duration-500 fade-in slide-in-from-right-4">
            {@render children({ step: controller.step })}
          </div>
        {/key}

        <div class="flex items-center justify-between pt-4">
          <div
            class="transition-opacity duration-200 {controller.step === 1
              ? 'pointer-events-none opacity-0'
              : 'opacity-100'}"
          >
            <Button type="button" variant="outline" onclick={prevStep}>Back</Button>
          </div>

          {#if controller.step < controller.steps.length}
            <Button type="button" onclick={nextStep}>Next</Button>
          {:else}
            <Button type="submit" disabled={$submitting} class="bg-purple-600 hover:bg-purple-700">
              {$submitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          {/if}
        </div>
      </form>
    </GlassCard>
  {/if}
{/if}
