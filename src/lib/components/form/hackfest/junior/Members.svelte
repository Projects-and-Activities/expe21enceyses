<script lang="ts">
  import { PlusIcon, Trash2 } from '@lucide/svelte';
  import { onMount } from 'svelte';

  import { useFormContext } from '$lib/components/form/core';
  import Button from '$lib/components/ui/button/button.svelte';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import * as Select from '$lib/components/ui/select';
  import type { JuniorHackfestRegistration } from '$lib/types/hackfest';
  const form = useFormContext<JuniorHackfestRegistration>();
  const { form: formData } = form;

  const YEAR_LEVELS = ['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];

  onMount(() => {
    if (!$formData.members || $formData.members.length === 0) {
      $formData.members = Array.from({ length: 3 }, () => ({
        name: '',
        email: '',
        gradeLevel: '',
        facebookLink: ''
      }));
    }
  });

  function addMember() {
    if ($formData.members.length < 4) {
      $formData.members = [
        ...$formData.members,
        {
          name: '',
          email: '',
          gradeLevel: '',
          facebookLink: ''
        }
      ];
    }
  }

  function removeMember(index: number) {
    if ($formData.members.length > 3) {
      $formData.members = $formData.members.filter((_, i) => i !== index);
    }
  }
</script>

<div class="space-y-8">
  <div class="text-center">
    <h2 class="text-2xl font-bold tracking-tight text-foreground">Team Members</h2>
    <p class="text-muted-foreground">
      Teams must have at least 3 members. A 4th member is optional.
    </p>
  </div>

  <div class="space-y-6">
    {#each $formData.members, i (i)}
      <div
        class="relative rounded-xl border border-border bg-white/50 p-6 transition-all
               hover:border-purple-500/50 dark:border-zinc-800 dark:bg-zinc-900/20"
      >
        <div class="mb-6 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div
              class="flex size-8 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-600 dark:bg-purple-600/20 dark:text-purple-400"
            >
              {i + 1}
            </div>
            <h3 class="font-medium text-foreground">Member {i + 1}</h3>
          </div>

          {#if i === 3}
            <Button
              variant="ghost"
              size="sm"
              class="h-8 text-muted-foreground hover:bg-red-500/10 hover:text-red-500"
              onclick={() => removeMember(i)}
            >
              <Trash2 class="mr-2 size-4" />
              Remove
            </Button>
          {/if}
        </div>

        <div class="space-y-4">
          <div class="flex gap-4">
            <Form.Field class="flex-1" {form} name="members[{i}].name">
              <Form.Control>
                {#snippet children({ props })}
                  <Form.Label>Full Name</Form.Label>
                  <Input
                    {...props}
                    bind:value={$formData.members[i].name}
                    placeholder="e.g. Juan Dela Cruz"
                    class="bg-background dark:bg-zinc-950/50"
                  />
                {/snippet}
              </Form.Control>
              <Form.FieldErrors class="text-red-500" />
            </Form.Field>

            <Form.Field {form} name="members[{i}].gradeLevel">
              <Form.Control>
                {#snippet children({ props })}
                  <Form.Label>Grade Level</Form.Label>
                  <Select.Root
                    type="single"
                    bind:value={$formData.members[i].gradeLevel}
                    name={props.name}
                  >
                    <Select.Trigger {...props} class="w-40 bg-background dark:bg-zinc-950/50">
                      {$formData.members[i].gradeLevel
                        ? $formData.members[i].gradeLevel
                        : 'Select level'}
                    </Select.Trigger>
                    <Select.Content>
                      {#each YEAR_LEVELS as level (level)}
                        <Select.Item value={level} label={level} />
                      {/each}
                    </Select.Content>
                  </Select.Root>
                {/snippet}
              </Form.Control>
              <Form.FieldErrors class="text-red-500" />
            </Form.Field>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <Form.Field {form} name="members[{i}].email">
              <Form.Control>
                {#snippet children({ props })}
                  <Form.Label>Email Address</Form.Label>
                  <Input
                    {...props}
                    type="email"
                    bind:value={$formData.members[i].email}
                    placeholder="e.g. info@yses.org"
                    class="bg-background dark:bg-zinc-950/50"
                  />
                {/snippet}
              </Form.Control>
              <Form.FieldErrors class="text-red-500" />
            </Form.Field>

            <Form.Field {form} name="members[{i}].facebookLink">
              <Form.Control>
                {#snippet children({ props })}
                  <Form.Label>Facebook Profile Link</Form.Label>
                  <Input
                    {...props}
                    bind:value={$formData.members[i].facebookLink}
                    placeholder="e.g. facebook.com/juan.delacruz"
                    class="bg-background dark:bg-zinc-950/50"
                  />
                {/snippet}
              </Form.Control>
              <Form.FieldErrors class="text-red-500" />
            </Form.Field>
          </div>
        </div>
      </div>
    {/each}
  </div>

  {#if $formData.members.length < 4}
    <div class="flex justify-center">
      <Button
        variant="outline"
        class="h-auto w-full border-dashed border-zinc-300 py-6 text-muted-foreground hover:border-purple-500 hover:text-purple-500 dark:border-zinc-700"
        onclick={addMember}
      >
        <PlusIcon class="mr-2 size-5" />
        Add 4th Member
      </Button>
    </div>
  {/if}
</div>
