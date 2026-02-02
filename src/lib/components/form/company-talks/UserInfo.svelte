<script lang="ts">
  import { useFormContext } from '$lib/components/form/core';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import type { CompanyTalksRegistration } from '$lib/types/company-talks';

  const form = useFormContext<CompanyTalksRegistration>();
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
</div>
