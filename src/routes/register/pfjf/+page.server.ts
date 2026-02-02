import type { Actions } from '@sveltejs/kit';
import { message, superValidate, fail } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';

import { pfjfRegistrationSchema } from '$lib/types/pfjf';

export const load = async () => {
  const form = await superValidate(zod4(pfjfRegistrationSchema));
  return {
    form
  };
};

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, zod4(pfjfRegistrationSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    console.log(form);
    // TODO: Call to API

    return message(form, 'Registration successful!');
  }
};
