<script lang="ts">
  import { useFormContext } from '$lib/components/form/core';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import type { AnyHackfestRegistration } from '$lib/types/hackfest';

  const form = useFormContext<AnyHackfestRegistration>();
  const { form: formData } = form;
</script>

<div class="space-y-6">
  <div>
    <div class="text-2xl font-bold">Contact Details</div>
    <p class="text-sm text-muted-foreground">
      Please provide the contact information for the team leader.
    </p>
  </div>

  <Form.Field {form} name="contactNumber">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Contact Number</Form.Label>
        <Input
          {...props}
          maxlength={11}
          bind:value={$formData.contactNumber}
          placeholder="09XXXXXXXXX"
        />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

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
