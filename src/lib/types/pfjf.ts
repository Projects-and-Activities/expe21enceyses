import { z } from 'zod';

import { emailSchema } from './common';

export const pfjfRegistrationSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: emailSchema,
  purposeOfRegistration: z.enum(['internship', 'jobOpportunity'])
});

export type PfjfRegistration = z.infer<typeof pfjfRegistrationSchema>;
