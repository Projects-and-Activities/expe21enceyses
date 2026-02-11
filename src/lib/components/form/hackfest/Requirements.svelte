<script lang="ts">
  import { CircleAlert, CircleCheck, ImageIcon, Paperclip } from '@lucide/svelte';
  import { fileProxy } from 'sveltekit-superforms';

  import { useFormContext } from '$lib/components/form/core';
  import GlassCard from '$lib/components/GlassCard.svelte';
  import * as Form from '$lib/components/ui/form';
  import type { AnyHackfestRegistration } from '$lib/types/hackfest';

  let { variant = 'junior' } = $props<{ variant?: 'junior' | 'senior' }>();

  const form = useFormContext<AnyHackfestRegistration>();
  const { form: formData, errors } = form;

  const zipFile = fileProxy(form, 'requirementsZip');
  const proofFile = fileProxy(form, 'proofOfPayment');

  let previewUrl = $state<string | null>(null);

  $effect(() => {
    const file = $formData.proofOfPayment;
    if (file && file instanceof File && file.type.startsWith('image/')) {
      const objectUrl = URL.createObjectURL(file);
      previewUrl = objectUrl;
      return () => URL.revokeObjectURL(objectUrl);
    }
    previewUrl = null;
  });
</script>

<div class="animate-in space-y-8 duration-500 fade-in slide-in-from-right-4">
  <div class="text-2xl font-bold tracking-tight text-foreground">Requirements Upload</div>

  <GlassCard
    class="rounded-lg border border-border p-6 text-sm backdrop-blur-sm dark:bg-zinc-900/50"
  >
    {#if variant === 'junior'}
      <p class="mb-4 font-medium text-foreground">
        Compile the following requirements into a single <span
          class="font-mono text-purple-600 dark:text-purple-400">.zip</span
        > file and upload them:
      </p>
      <div class="grid gap-6">
        <div class="block space-y-2">
          <h3 class="font-bold text-foreground">For each team member:</h3>
          <ul class="list-disc space-y-1 pl-5 text-muted-foreground">
            <li>A valid school ID or any official document serving as proof of enrollment</li>
          </ul>
        </div>
        <div class="space-y-2">
          <h3 class="font-bold text-foreground">For the team coach:</h3>
          <ul class="list-disc space-y-1 pl-5 text-muted-foreground">
            <li>
              Proof that the coach is a bona fide teacher at the same school as the team members
              (e.g., school ID)
            </li>
          </ul>
        </div>
      </div>
    {:else}
      <p class="font-medium text-foreground">
        Compile all required documents (ID, proof of enrollment, etc.) of each member into a single <span
          class="font-mono text-purple-600 dark:text-purple-400">.zip</span
        > file for the entire team.
      </p>
    {/if}
  </GlassCard>

  <Form.Field {form} name="requirementsZip">
    <Form.Control>
      {#snippet children({ props })}
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-foreground">Requirements</span>
            {#if $errors.requirementsZip && !$formData.requirementsZip}
              <span class="animate-pulse text-xs font-medium text-red-500">Required *</span>
            {/if}
          </div>

          <label
            class="group relative flex cursor-pointer items-center gap-4 rounded-xl border border-dashed p-4 transition-all duration-300
						{$errors.requirementsZip
              ? 'border-red-500/50 bg-red-500/5'
              : 'border-input bg-background hover:border-purple-500 hover:bg-muted/50 dark:border-zinc-700 dark:hover:border-purple-500/50 dark:hover:bg-zinc-800/50'}"
          >
            <input
              bind:files={$zipFile}
              {...props}
              type="file"
              accept=".zip,application/zip"
              class="hidden"
            />

            <div
              class="flex size-12 shrink-0 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-purple-100 dark:bg-zinc-800 dark:group-hover:bg-zinc-700"
            >
              <Paperclip
                class="size-5 text-muted-foreground transition-colors group-hover:text-purple-600 dark:group-hover:text-purple-400"
              />
            </div>

            <div class="flex-1">
              {#if $formData.requirementsZip}
                <p class="font-medium break-all text-foreground">
                  {$formData.requirementsZip.name}
                </p>
                <p class="text-xs text-muted-foreground">
                  {($formData.requirementsZip.size / 1024 / 1024).toFixed(2)} MB
                </p>
              {:else}
                <p
                  class="text-sm text-muted-foreground transition-colors group-hover:text-foreground"
                >
                  Click to upload <span class="font-mono text-purple-600 dark:text-purple-400"
                    >.zip</span
                  > file
                </p>
              {/if}
            </div>

            {#if $formData.requirementsZip && !$errors.requirementsZip}
              <CircleCheck class="size-6 text-green-500" />
            {:else if $errors.requirementsZip}
              <CircleAlert class="size-6 text-red-500" />
            {/if}
          </label>

          {#if $errors.requirementsZip && $formData.requirementsZip}
            <p class="ml-1 text-xs font-medium text-red-500">
              {$errors.requirementsZip}
            </p>
          {/if}
        </div>
      {/snippet}
    </Form.Control>
  </Form.Field>

  <Form.Field {form} name="proofOfPayment">
    <Form.Control>
      {#snippet children({ props })}
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-foreground">Proof of Payment</span>
            {#if $errors.proofOfPayment && !$formData.proofOfPayment}
              <span class="animate-pulse text-xs font-medium text-red-500">Required *</span>
            {/if}
          </div>

          <label
            class="group relative flex cursor-pointer flex-col gap-4 rounded-xl border border-dashed p-4 transition-all duration-300
						{$errors.proofOfPayment
              ? 'border-red-500/50 bg-red-500/5'
              : 'border-input bg-background hover:border-purple-500 hover:bg-muted/50 dark:border-zinc-700 dark:hover:border-purple-500/50 dark:hover:bg-zinc-800/50'}"
          >
            <input
              bind:files={$proofFile}
              {...props}
              type="file"
              accept="image/*,application/pdf"
              class="hidden"
            />

            <div class="flex items-center gap-4">
              <div
                class="flex size-12 shrink-0 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-purple-100 dark:bg-zinc-800 dark:group-hover:bg-zinc-700"
              >
                <ImageIcon
                  class="size-5 text-muted-foreground transition-colors group-hover:text-purple-600 dark:group-hover:text-purple-400"
                />
              </div>

              <div class="flex-1">
                {#if $formData.proofOfPayment}
                  <p class="font-medium break-all text-foreground">
                    {$formData.proofOfPayment.name}
                  </p>
                  <p class="text-xs text-muted-foreground">
                    {($formData.proofOfPayment.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                {:else}
                  <p
                    class="text-sm text-muted-foreground transition-colors group-hover:text-foreground"
                  >
                    Click to upload <span class="font-mono text-purple-600 dark:text-purple-400"
                      >Image</span
                    >
                  </p>
                {/if}
              </div>

              {#if $formData.proofOfPayment && !$errors.proofOfPayment}
                <CircleCheck class="size-6 text-green-500" />
              {:else if $errors.proofOfPayment}
                <CircleAlert class="size-6 text-red-500" />
              {/if}
            </div>

            {#if $formData.proofOfPayment && previewUrl}
              <div
                class="relative mt-2 aspect-video w-full overflow-hidden rounded-lg border border-border bg-black/5 dark:bg-black/50"
              >
                <img
                  src={previewUrl}
                  alt="Proof of Payment Preview"
                  class="h-full w-full object-contain"
                />
              </div>
            {/if}
          </label>
        </div>
      {/snippet}
    </Form.Control>
  </Form.Field>
</div>
