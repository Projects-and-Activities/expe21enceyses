import { error, fail, type Actions } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';

import type { PageServerLoad } from './$types';

import { EVENT_REGISTRY } from '$lib/components/form/core/config';

const EVENT_IDS = {
  JUNIOR_HACKFEST: 'junior-hackfest',
  SENIOR_HACKFEST: 'senior-hackfest',
  PFJF: 'pfjf',
  COMPANY_TALKS: 'company-talks',
} as const;

export const load: PageServerLoad = async ({ params }: { params: { eventId: string } }) => {
  const eventId = params.eventId;
  const config = EVENT_REGISTRY[eventId];

  const form = await superValidate(zod4(config.schema));

  return {
    form,
    eventMeta: config.meta
  };
};

export const actions: Actions = {
  default: async ({ request, params }) => {
    const eventId = params.eventId as string;
    const config = EVENT_REGISTRY[eventId];

    if (!config) {
      error(404, 'Event not found');
    }

    const form = await superValidate(request, zod4(config.schema));

    if (!form.valid) {
      return fail(400, { form });
    }

    try {
      // Change nalang siguro yung api call if ano ang bet
      await config.submit(form.data);

      return message(form, 'Registration successful!');
    } catch (e) {
      console.error(`Submission failed for ${eventId}:`, e);
      return message(form, 'Something went wrong during submission. Please try again.', {
        status: 500
      });
    }
  }
};
