<script lang="ts">
	import { onMount } from 'svelte';

	import { useFormContext } from '$lib/components/form/core';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select';
	import type { SeniorHackfestRegistrationSchema } from '$lib/types/hackfest';

	const form = useFormContext<SeniorHackfestRegistrationSchema>();
	const { form: formData } = form;

	onMount(() => {
		if (!$formData.members || $formData.members.length === 0) {
			$formData.members = Array(4).fill({ name: '', email: '', universityLevel: '' });
		}
	});

	const YEAR_LEVELS = ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year+'];
</script>

<div class="space-y-8">
	<div class="text-center">
		<h2 class="text-2xl font-bold tracking-tight text-foreground">Team Members</h2>
		<p class="text-muted-foreground">Fill in the details for all 4 members</p>
	</div>

	{#each $formData.members, i (i)}
		<div
			class="rounded-xl border border-border bg-white/50
            p-5 transition-all hover:border-purple-500/50
            dark:border-zinc-800 dark:bg-zinc-900/20 dark:hover:border-purple-500/30"
		>
			<div class="mb-4 flex items-center gap-3">
				<div
					class="flex size-6 items-center justify-center rounded-full bg-purple-100 text-xs
                    font-bold text-purple-600
                    dark:bg-purple-600/20 dark:text-purple-400"
				>
					{i + 1}
				</div>
				<h3 class="font-medium text-foreground dark:text-zinc-200">Member {i + 1}</h3>
			</div>

			<div class="space-y-4">
				<Form.Field {form} name="members[{i}].name">
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
					<Form.FieldErrors class="text-red-500 dark:text-red-400" />
				</Form.Field>

				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<Form.Field {form} name="members[{i}].universityLevel">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Year Level</Form.Label>
								<Select.Root
									type="single"
									bind:value={$formData.members[i].universityLevel}
									name={props.name}
								>
									<Select.Trigger
										{...props}
										class="bg-background dark:bg-zinc-950/50"
									>
										{$formData.members[i].universityLevel
											? $formData.members[i].universityLevel
											: 'Select year level'}
									</Select.Trigger>
									<Select.Content>
										{#each YEAR_LEVELS as level (level)}
											<Select.Item value={level} label={level} />
										{/each}
									</Select.Content>
								</Select.Root>
								<input
									hidden
									name={props.name}
									value={$formData.members[i].universityLevel}
								/>
							{/snippet}
						</Form.Control>
						<Form.FieldErrors class="text-red-500 dark:text-red-400" />
					</Form.Field>

					<Form.Field {form} name="members[{i}].email">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Email Address</Form.Label>
								<Input
									{...props}
									type="email"
									bind:value={$formData.members[i].email}
									placeholder="e.g. juan@university.edu.ph"
									class="bg-background dark:bg-zinc-950/50"
								/>
							{/snippet}
						</Form.Control>
						<Form.FieldErrors class="text-red-500 dark:text-red-400" />
					</Form.Field>
				</div>
			</div>
		</div>
	{/each}
</div>
