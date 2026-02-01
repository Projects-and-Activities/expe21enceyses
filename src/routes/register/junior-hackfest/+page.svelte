<script lang="ts">
	import { FormProvider, RegistrationController, type StepItem } from '$lib/components/form/core';
	import ContactDetails from '$lib/components/form/hackfest/ContactDetails.svelte';
	import HackfestSkeleton from '$lib/components/form/hackfest/HackfestSkeleton.svelte';
	import TeamInfo from '$lib/components/form/hackfest/junior/TeamInfo.svelte';
	import Requirements from '$lib/components/form/hackfest/Requirements.svelte';
	import SuccessState from '$lib/components/form/SuccessState.svelte';
	import Star from '$lib/components/Star.svelte';
	import {
		juniorHackfestRegistrationSchema,
		type JuniorHackfestRegistrationSchema
	} from '$lib/types/hackfest';

	let { data } = $props();

	const stepItems: StepItem<JuniorHackfestRegistrationSchema>[] = [
		{
			label: 'Team Info',
			component: TeamInfo,
			keys: ['teamName', 'adviserName', 'schoolName', 'coachFirstName', 'coachLastName']
		},
		{
			label: 'Contact',
			component: ContactDetails,
			keys: ['contactNumber', 'email']
		},
		{
			label: 'Requirements',
			component: Requirements,
			keys: [],
			props: { variant: 'junior' }
		}
	];

	const controller = new RegistrationController({
		getForm: () => data.form,
		schema: juniorHackfestRegistrationSchema,
		storageKey: 'junior-hackfest',
		stepItems
	});
</script>

<div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none">
	<Star class="absolute top-20 left-10 w-24 -rotate-12 opacity-30 dark:opacity-60" />
	<Star class="absolute top-40 left-32 w-12 rotate-45 opacity-20 blur-[1px] dark:opacity-40" />
	<Star class="absolute -top-12 -right-12 w-64 rotate-12 opacity-10 blur-[3px] dark:opacity-20" />
	<Star class="absolute top-1/4 right-12 w-16 -rotate-45 opacity-20 blur-[2px] dark:opacity-50" />
	<Star class="absolute top-10 right-1/3 w-8 rotate-45 opacity-20 dark:opacity-40" />
	<Star class="absolute bottom-10 left-32 w-32 -rotate-12 opacity-40 dark:opacity-70" />
	<Star
		class="absolute bottom-32 -left-10 w-40 rotate-90 opacity-15 blur-[2px] dark:opacity-30"
	/>
	<Star class="absolute right-20 bottom-20 w-20 rotate-12 opacity-25 dark:opacity-50" />
	<Star class="absolute right-8 bottom-1/3 w-10 -rotate-12 opacity-15 blur-[1px]" />
	<Star class="absolute top-1/2 left-10 w-6 rotate-45 opacity-10 dark:opacity-30" />
	<Star class="absolute bottom-1/4 left-1/4 w-5 -rotate-12 opacity-10 blur-[1px]" />
</div>

<FormProvider {controller} Skeleton={HackfestSkeleton}>
	{#snippet children({ step })}
		{@const activeItem = stepItems[step - 1]}
		<activeItem.component {...activeItem.props} />
	{/snippet}

	{#snippet success()}
		<SuccessState currentEventId="junior-hackfest" />
	{/snippet}
</FormProvider>
