<script lang="ts">
  import { CircleAlert, CircleCheck, ImageIcon, Loader2, Paperclip } from '@lucide/svelte';
  import { fileProxy } from 'sveltekit-superforms';

  import { uploadToCloudinary } from '$lib/cloudinary';
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
  let zipUploadState = $state<'idle' | 'uploading' | 'done' | 'error'>('idle');
  let proofUploadState = $state<'idle' | 'uploading' | 'done' | 'error'>('idle');
  let zipUploadError = $state<string | null>(null);
  let proofUploadError = $state<string | null>(null);

  // Track file metadata separately so we can clear File objects from formData after upload
  let zipFileInfo = $state<{ name: string; size: number } | null>(null);
  let proofFileInfo = $state<{ name: string; size: number } | null>(null);

  $effect(() => {
    const file = $formData.proofOfPayment;
    if (file && file instanceof File && file.type.startsWith('image/')) {
      const objectUrl = URL.createObjectURL(file);
      previewUrl = objectUrl;
      return () => URL.revokeObjectURL(objectUrl);
    }
    // Keep preview if we already uploaded (file cleared from formData)
    if (!file && proofUploadState !== 'done') {
      previewUrl = null;
    }
  });

  function handleZipChange() {
    const file = $formData.requirementsZip;
    if (!file || !(file instanceof File) || file.size === 0) return;

    zipFileInfo = { name: file.name, size: file.size };
    const teamName = $formData.teamName || 'unknown';
    zipUploadState = 'uploading';
    zipUploadError = null;

    uploadToCloudinary(file, teamName, 'requirements')
      .then((url) => {
        $formData.requirementsZipUrl = url;
        $formData.requirementsZip = undefined as any; // Clear File so it's not serialized on submit
        zipUploadState = 'done';
      })
      .catch((err) => {
        zipUploadState = 'error';
        zipUploadError = err.message || 'Upload failed';
        console.error('Requirements upload error:', err);
      });
  }

  function handleProofChange() {
    const file = $formData.proofOfPayment;
    if (!file || !(file instanceof File) || file.size === 0) return;

    proofFileInfo = { name: file.name, size: file.size };
    const teamName = $formData.teamName || 'unknown';
    proofUploadState = 'uploading';
    proofUploadError = null;

    uploadToCloudinary(file, teamName, 'payment')
      .then((url) => {
        $formData.proofOfPaymentUrl = url;
        $formData.proofOfPayment = undefined as any; // Clear File so it's not serialized on submit
        proofUploadState = 'done';
      })
      .catch((err) => {
        proofUploadState = 'error';
        proofUploadError = err.message || 'Upload failed';
        console.error('Proof of payment upload error:', err);
      });
  }
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
      <div class="l-4 grid gap-6">
        <div class="block space-y-2">
          <h3 class="font-medium text-foreground">For each team member:</h3>
          <ul class="list-disc space-y-1 pl-5 text-muted-foreground">
            <li>A valid school ID or any official document serving as proof of enrollment</li>
          </ul>
        </div>
        <div class="space-y-2">
          <h3 class="font-medium text-foreground">For the team coach:</h3>
          <ul class="list-disc space-y-1 pl-5 text-muted-foreground">
            <li>
              Proof that the coach is a bona fide teacher at the same school as the team members
              (e.g., school ID)
            </li>
          </ul>
        </div>

        <div class="space-y-2">
          <h3 class="font-bold text-foreground">Registration fee (Team coach is excluded):</h3>
          <ul class="list-disc space-y-1 pl-5 text-muted-foreground">
            <li><b> 𝗘𝗮𝗿𝗹𝘆 𝗕𝗶𝗿𝗱</b> (Until February 25): 𝗣𝗵𝗽 𝟭𝟰𝟵 / member</li>
            <li><b>𝗥𝗲𝗴𝘂𝗹𝗮𝗿: </b>𝗣𝗵𝗽 𝟭𝟵𝟵 / member</li>
          </ul>
        </div>

        <div class="space-y-2">
          <h3 class="font-medium text-foreground">
            To ensure a smooth verification process, please send the total registration fee for your
            entire team in a single GCash transaction.
          </h3>
          <ul class="list-disc space-y-1 pl-5 text-muted-foreground">
            <li>GCash Number: 09302926834</li>
            <li>GCash Name: ANGELINE CUBELO</li>
            <li>
              <i>After sending the full fee, please upload the proof of payment.</i>
            </li>
          </ul>
        </div>
      </div>
    {:else}
      <p class="mb-4 font-medium text-foreground">
        Compile all valid school ID or any official document serving as proof of enrollment of each
        member into a single <span class="font-mono text-purple-600 dark:text-purple-400">.zip</span
        > file .
      </p>
      <div class="mb-4 space-y-2">
        <p class="font-medium text-foreground">Registration fee:</p>
        <ul class="list-disc space-y-1 pl-5 text-muted-foreground">
          <li><b> 𝗘𝗮𝗿𝗹𝘆 𝗕𝗶𝗿𝗱</b> (Until February 25): 𝗣𝗵𝗽 𝟭𝟰𝟵 / member</li>
          <li><b>𝗥𝗲𝗴𝘂𝗹𝗮𝗿: </b>𝗣𝗵𝗽 𝟭𝟵𝟵 / member</li>
        </ul>
      </div>
      <div class="space-y-2">
        <p class="font-medium text-foreground">
          To ensure a smooth verification process, please send the total registration fee for your
          entire team in a single GCash transaction.
        </p>
        <ul class="list-disc space-y-1 pl-5 text-muted-foreground">
          <li>GCash Number: 09302926834</li>
          <li>GCash Name: ANGELINE CUBELO</li>
          <li>
            <i>After sending the full fee, please upload the proof of payment.</i>
          </li>
        </ul>
      </div>
    {/if}
  </GlassCard>

  <Form.Field {form} name="requirementsZip">
    <Form.Control>
      {#snippet children({ props })}
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-foreground">Requirements</span>
            {#if $errors.requirementsZipUrl && !zipFileInfo}
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
              onchange={handleZipChange}
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
              {#if zipFileInfo}
                <p class="font-medium break-all text-foreground">
                  {zipFileInfo.name}
                </p>
                <p class="text-xs text-muted-foreground">
                  {(zipFileInfo.size / 1024 / 1024).toFixed(2)} MB
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

            {#if zipUploadState === 'uploading'}
              <Loader2 class="size-6 animate-spin text-purple-500" />
            {:else if zipUploadState === 'done' && !$errors.requirementsZip}
              <CircleCheck class="size-6 text-green-500" />
            {:else if zipUploadState === 'error' || $errors.requirementsZip}
              <CircleAlert class="size-6 text-red-500" />
            {:else if zipFileInfo && !$errors.requirementsZip}
              <CircleCheck class="size-6 text-green-500" />
            {/if}
          </label>

          {#if zipUploadState === 'uploading'}
            <p class="ml-1 text-xs font-medium text-purple-500">Uploading...</p>
          {:else if zipUploadState === 'error'}
            <p class="ml-1 text-xs font-medium text-red-500">
              {zipUploadError || 'Upload failed. Please try again.'}
            </p>
          {:else if $errors.requirementsZip && zipFileInfo}
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
            {#if $errors.proofOfPaymentUrl && !proofFileInfo}
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
              onchange={handleProofChange}
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
                {#if proofFileInfo}
                  <p class="font-medium break-all text-foreground">
                    {proofFileInfo.name}
                  </p>
                  <p class="text-xs text-muted-foreground">
                    {(proofFileInfo.size / 1024 / 1024).toFixed(2)} MB
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

              {#if proofUploadState === 'uploading'}
                <Loader2 class="size-6 animate-spin text-purple-500" />
              {:else if proofUploadState === 'done' && !$errors.proofOfPayment}
                <CircleCheck class="size-6 text-green-500" />
              {:else if proofUploadState === 'error' || $errors.proofOfPayment}
                <CircleAlert class="size-6 text-red-500" />
              {:else if proofFileInfo && !$errors.proofOfPayment}
                <CircleCheck class="size-6 text-green-500" />
              {/if}
            </div>

            {#if previewUrl}
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

          {#if proofUploadState === 'uploading'}
            <p class="ml-1 text-xs font-medium text-purple-500">Uploading...</p>
          {:else if proofUploadState === 'error'}
            <p class="ml-1 text-xs font-medium text-red-500">
              {proofUploadError || 'Upload failed. Please try again.'}
            </p>
          {:else if $errors.proofOfPayment && $formData.proofOfPayment}
            <p class="ml-1 text-xs font-medium text-red-500">
              {$errors.proofOfPayment}
            </p>
          {/if}
        </div>
      {/snippet}
    </Form.Control>
  </Form.Field>
</div>
