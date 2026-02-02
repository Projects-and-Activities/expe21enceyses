<script lang="ts">
  import { useFormContext } from '$lib/components/form/core';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import type { JuniorHackfestRegistration } from '$lib/types/hackfest';

  const form = useFormContext<JuniorHackfestRegistration>();
  const { form: formData } = form;
</script>

<div class="space-y-6">
  <h2 class="text-2xl font-bold">About the Team</h2>

  <Form.Field {form} name="teamName">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Team Name</Form.Label>
        <Input {...props} bind:value={$formData.teamName} placeholder="e.g., Zhiperus" />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="adviserName">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Coach Name</Form.Label>
        <Input
          {...props}
          bind:value={$formData.adviserName}
          placeholder="Full name of your coach"
        />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="schoolName">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>School Name</Form.Label>
        <Input
          {...props}
          bind:value={$formData.schoolName}
          placeholder="e.g., University of the Philippines Los Baños"
        />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <div class="grid grid-cols-2 gap-4">
    <Form.Field {form} name="coachFirstName">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label>Team Coach</Form.Label>
          <Input {...props} bind:value={$formData.coachFirstName} placeholder="First Name" />
        {/snippet}
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="coachLastName" class="mt-[21.8px]">
      <Form.Control>
        {#snippet children({ props })}
          <Input {...props} bind:value={$formData.coachLastName} placeholder="Last Name" />
        {/snippet}
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
  </div>
</div>
