<script lang="ts">
	import { useFormContext } from '$lib/components/form/core/';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import type { SeniorHackfestRegistrationSchema } from '$lib/types/hackfest';

	const form = useFormContext<SeniorHackfestRegistrationSchema>();
	const { form: formData } = form;
</script>

<div class="space-y-6">
	<div class="text-center">
		<h2 class="text-2xl font-bold tracking-tight">About the Team</h2>
		<p class="dark:text-zinc-400">What should we call your group?</p>
	</div>

	<Form.Field {form} name="teamName">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label class="dark:text-zinc-300">Team Name</Form.Label>
				<Input
					{...props}
					bind:value={$formData.teamName}
					placeholder="e.g. Zhiperus"
					class="focus:border-purple-500 focus:ring-purple-500/20 dark:border-zinc-700 dark:bg-zinc-900/50 dark:placeholder:text-zinc-600"
				/>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors class="text-red-400" />
	</Form.Field>
</div>
