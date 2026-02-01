import { z } from 'zod';

// pabago nalang max file size if need be
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_ZIP_TYPES = ['application/zip', 'application/x-zip-compressed'];
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];

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

export const seniorMemberSchema = z.object({
	name: z.string().min(2, 'Name is required'),
	email: z.email('Please enter a valid email address'),
	universityLevel: z.string().min(1, 'University level is required')
});

const commonHackfestSchema = z.object({
	teamName: z.string().min(2, 'Team name is required'),
	contactNumber: mobileNumberSchema,
	email: z.email('Please enter a valid email address'),
	requirementsZip: zipFileSchema,
	proofOfPayment: proofFileSchema
});

export const juniorHackfestRegistrationSchema = commonHackfestSchema.extend({
	adviserName: z.string().min(2, 'Coach name is required'),
	schoolName: z.string().min(2, 'School name is required'),
	coachFirstName: z.string().min(2, 'Coach first name is required'),
	coachLastName: z.string().min(2, 'Coach last name is required')
});

export const seniorHackfestRegistrationSchema = commonHackfestSchema.extend({
	members: z.array(seniorMemberSchema).min(1, 'At least one member is required')
});

export type JuniorHackfestRegistrationSchema = z.infer<typeof juniorHackfestRegistrationSchema>;
export type SeniorHackfestRegistrationSchema = z.infer<typeof seniorHackfestRegistrationSchema>;
export type SeniorMemberSchema = z.infer<typeof seniorMemberSchema>;

export type AnyHackfestRegistrationSchema =
	| JuniorHackfestRegistrationSchema
	| SeniorHackfestRegistrationSchema;
