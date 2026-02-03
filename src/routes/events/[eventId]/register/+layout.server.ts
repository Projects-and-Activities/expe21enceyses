import { error } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

import { EVENT_REGISTRY } from '$lib/components/form/core/config';

export const load: PageServerLoad = async ({ params }: { params: { eventId: string } }) => {
  const eventId = params.eventId;
  const config = EVENT_REGISTRY[eventId];

  if (!config) {
    error(404, {
      message: `Event registration '${eventId}' not found.`
    });
  }

  return {
    eventMeta: config.meta
  };
};
