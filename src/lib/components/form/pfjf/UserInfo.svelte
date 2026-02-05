<script lang="ts">
  import { useFormContext } from '$lib/components/form/core';
  import { Button } from '$lib/components/ui/button';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
  import type { PfjfRegistration } from '$lib/types/pfjf';

  const form = useFormContext<PfjfRegistration>();
  const { form: formData } = form;
</script>

<div class="space-y-6">
  <div class="grid grid-cols-2 gap-4">
    <Form.Field {form} name="firstName">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label>Name</Form.Label>
          <Input {...props} bind:value={$formData.firstName} placeholder="First Name" />
        {/snippet}
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="lastName" class="mt-[21.8px]">
      <Form.Control>
        {#snippet children({ props })}
          <Input {...props} bind:value={$formData.lastName} placeholder="Last Name" />
        {/snippet}
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
  </div>
  <Form.Field {form} name="email">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Email</Form.Label>
        <Input {...props} bind:value={$formData.email} placeholder="e.g. info@yses.org" />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="purposeOfRegistration">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Purpose of Registration?</Form.Label>
        <RadioGroup.Root
          {...props}
          bind:value={$formData.purposeOfRegistration}
          class="flex flex-col space-y-2"
        >
          <RadioGroup.Item value="internship" id="r1" class="sr-only" />
          <RadioGroup.Item value="jobOpportunity" id="r2" class="sr-only" />

          <div class="flex w-80 overflow-hidden rounded-md border border-input">
            <Button
              type="button"
              onclick={() => ($formData.purposeOfRegistration = 'internship')}
              class={[
                'flex-1 rounded-none shadow-none transition-colors',
                $formData.purposeOfRegistration === 'internship'
                  ? 'bg-primary text-white hover:bg-primary'
                  : 'bg-white text-black  hover:bg-primary'
              ]}
            >
              Internship
            </Button>

            <Button
              type="button"
              onclick={() => ($formData.purposeOfRegistration = 'jobOpportunity')}
              class={[
                'flex-1 rounded-none shadow-none transition-colors',
                $formData.purposeOfRegistration === 'jobOpportunity'
                  ? 'bg-primary text-white hover:bg-primary'
                  : 'bg-white text-black hover:bg-primary'
              ]}
            >
              Job Opportunity
            </Button>
          </div>
        </RadioGroup.Root>
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
</div>
