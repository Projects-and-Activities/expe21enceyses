export const EVENT_IDS = {
  JUNIOR_HACKFEST: 'junior-hackfest',
  SENIOR_HACKFEST: 'senior-hackfest',
  PFJF: 'pfjf',
  COMPANY_TALKS: 'company-talks',
} as const;

type CompanyTalksRegistration = {
  firstName: string;
  lastName: string;
  email: string;
};

type PFJFRegistration = {
  firstName: string;
  lastName: string;
  email: string;
  purposeOfRegistration: 'internship' | 'jobOpportunity';
};

export type RegistrationData = CompanyTalksRegistration | PFJFRegistration;