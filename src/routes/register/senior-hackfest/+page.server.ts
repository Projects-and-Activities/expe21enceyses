import type { Actions } from '@sveltejs/kit';
import { message, superValidate, fail } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';

import { seniorHackfestRegistrationSchema } from '$lib/types/hackfest';

export const load = async () => {
  const form = await superValidate(zod4(seniorHackfestRegistrationSchema));
  return {
    form
  };
};

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, zod4(seniorHackfestRegistrationSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    console.log(form);
    form.data.members.forEach((member) => console.log(member));
    // TODO: Call to API

    return message(form, 'Registration successful!');
  }
};
