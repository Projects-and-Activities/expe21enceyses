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

type members = {
  name: string;
  email: string;
  gradeLevel?: string;
  schoolName?: string;
  facebookLink?: string;
}

type HackfestRegistration = {
  teamName: string;
  email: string;
  contactNumber: string;
  schoolName?: string;
  coachName?: string;
  coachFacebookLink?: string;
  members: members[];
  requirementsZip: File;
  proofOfPayment: File;
  bracket: 'junior' | 'senior';
};

export type RegistrationData = CompanyTalksRegistration | PFJFRegistration | HackfestRegistration;