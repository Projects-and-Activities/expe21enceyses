import { z } from 'zod';

import { emailSchema } from './common';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_ZIP_TYPES = [
  'application/zip',
  'application/x-zip-compressed',
  'application/octet-stream'
];
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];

const facebookLinkSchema = z
  .string({ error: 'Facebook link is required' })
  .min(2, 'Facebook link is required');

const schoolNameSchema = z
  .string({ error: 'School name is required' })
  .min(2, 'School name is required');

const mobileNumberSchema = z
  .string()
  .regex(/^09\d{9}$/, 'Must be a valid PH mobile number (e.g., 09123456789)');

const zipFileSchema = z
  .instanceof(File, { message: 'Requirements .zip file is required' })
  .refine((file) => file.size <= MAX_FILE_SIZE, 'Max file size is 5MB')
  .refine(
    (file) => ACCEPTED_ZIP_TYPES.includes(file.type) || file.name.endsWith('.zip'),
    'Only .zip files are accepted'
  );

const proofFileSchema = z
  .instanceof(File, { message: 'Proof of payment is required' })
  .refine((file) => file.size <= MAX_FILE_SIZE, 'Max file size is 5MB')
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    'Only .jpg, .png, or .pdf files are accepted'
  );

export const juniorMemberSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: emailSchema,
  gradeLevel: z.string().min(1, 'Grade level is required'),
  facebookLink: facebookLinkSchema
});

export const seniorMemberSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  schoolName: schoolNameSchema,
  email: emailSchema,
  universityLevel: z.string().min(1, 'Year level is required'),
  facebookLink: facebookLinkSchema
});

const commonHackfestSchema = z.object({
  teamName: z.string().min(2, 'Team name is required'),
  contactNumber: mobileNumberSchema,
  email: emailSchema,
  requirementsZip: zipFileSchema.optional(),
  proofOfPayment: proofFileSchema.optional(),
  requirementsZipUrl: z.string().url('Requirements must be uploaded').default(''),
  proofOfPaymentUrl: z.string().url('Proof of payment must be uploaded').default('')
});

const coachDetailsSchema = z.object({
  coachFirstName: z.string().min(2, 'Coach first name is required'),
  coachLastName: z.string().min(2, 'Coach last name is required'),
  coachFacebookLink: facebookLinkSchema
});

export const juniorHackfestRegistrationSchema = commonHackfestSchema.extend({
  schoolName: schoolNameSchema,
  ...coachDetailsSchema.shape,
  members: z
    .array(juniorMemberSchema)
    .min(3, 'A minimum of 3 members is required.')
    .max(4, 'A maximum of 4 members is allowed.'),
  bracket: z.literal('junior')
});

export const seniorHackfestRegistrationSchema = commonHackfestSchema.extend({
  members: z
    .array(seniorMemberSchema)
    .min(3, 'A minimum of 3 members is required.')
    .max(4, 'A maximum of 4 members is allowed.'),
  bracket: z.literal('senior')
});

export type JuniorHackfestRegistration = z.infer<typeof juniorHackfestRegistrationSchema>;
export type SeniorHackfestRegistration = z.infer<typeof seniorHackfestRegistrationSchema>;
export type SeniorMember = z.infer<typeof seniorMemberSchema>;

export type AnyHackfestRegistration = JuniorHackfestRegistration | SeniorHackfestRegistration;
