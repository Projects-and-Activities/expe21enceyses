import { z } from 'zod';

import { emailSchema } from './common';

export const companyTalksRegistrationSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: emailSchema
});

export type CompanyTalksRegistration = z.infer<typeof companyTalksRegistrationSchema>;
