import { error, fail, type Actions } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import { EVENT_REGISTRY } from '$lib/components/form/core/config';
import { submitRegistration } from '$lib/server/registration.api';
import type { RegistrationData } from '$lib/types/registration.types';

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
      throw error(404, 'Event not found');
    }

    const form = await superValidate(request, zod4(config.schema));

    if (!form.valid) {
      return fail(400, { form });
    }

    try {
      await submitRegistration(eventId, form.data as RegistrationData);

      return message(form, 'Registration successful!');
    } catch (e) {
      console.error(`Submission failed for ${eventId}:`, e);
      return message(form, 'Something went wrong during submission. Please try again.', {
        status: 500
      });
    }
  }
};
