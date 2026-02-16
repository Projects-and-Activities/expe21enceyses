import type { ZodObject } from 'zod';

import type { StepItem } from './controller.svelte';

import CompanyUserInfo from '$lib/components/form/company-talks/UserInfo.svelte';
import ContactDetails from '$lib/components/form/hackfest/ContactDetails.svelte';
import HackfestSkeleton from '$lib/components/form/hackfest/HackfestSkeleton.svelte';
import JuniorMembers from '$lib/components/form/hackfest/junior/Members.svelte';
import JuniorTeamInfo from '$lib/components/form/hackfest/junior/TeamInfo.svelte';
import Requirements from '$lib/components/form/hackfest/Requirements.svelte';
import SeniorMembers from '$lib/components/form/hackfest/senior/Members.svelte';
import SeniorTeamInfo from '$lib/components/form/hackfest/senior/TeamInfo.svelte';
import PfjfUserInfo from '$lib/components/form/pfjf/UserInfo.svelte';
import { companyTalksRegistrationSchema } from '$lib/types/company-talks';
import {
  juniorHackfestRegistrationSchema,
  seniorHackfestRegistrationSchema
} from '$lib/types/hackfest';
import { pfjfRegistrationSchema } from '$lib/types/pfjf';

export type EventConfig = {
  meta: {
    title: string;
    date: string;
    description: string;
  };
  schema: ZodObject;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  steps: StepItem<any>[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  skeleton: any;
};

export const EVENT_REGISTRY: Record<string, EventConfig> = {
  'junior-hackfest': {
    meta: {
      title: 'Junior Hackfest',
      date: 'March 7-28, 2026',
      description: 'Engineer solutions that move communities forward.'
    },
    schema: juniorHackfestRegistrationSchema,
    skeleton: HackfestSkeleton,
    steps: [
      {
        label: 'Information',
        component: JuniorTeamInfo,
        keys: [
          'teamName',
          'adviserName',
          'schoolName',
          'coachFirstName',
          'coachLastName',
          'coachFacebookLink'
        ]
      },
      {
        label: 'Contact',
        component: ContactDetails,
        keys: ['contactNumber', 'email']
      },
      {
        label: 'Members',
        component: JuniorMembers,
        keys: ['members']
      },
      {
        label: 'Requirements',
        component: Requirements,
        keys: ['requirementsZip', 'proofOfPayment'],
        props: { variant: 'junior' }
      }
    ],
  },

  'senior-hackfest': {
    meta: {
      title: 'Collegiate Hackfest',
      date: 'March 7-28, 2026',
      description: 'Engineer solutions that move communities forward.'
    },
    schema: seniorHackfestRegistrationSchema,
    skeleton: HackfestSkeleton,
    steps: [
      {
        label: 'Information',
        component: SeniorTeamInfo,
        keys: ['teamName']
      },
      {
        label: 'Contact',
        component: ContactDetails,
        keys: ['contactNumber', 'email']
      },
      {
        label: 'Members',
        component: SeniorMembers,
        keys: ['members']
      },
      {
        label: 'Requirements',
        component: Requirements,
        keys: ['requirementsZip', 'proofOfPayment'],
        props: { variant: 'senior' }
      }
    ],
  },

  'company-talks': {
    meta: {
      title: 'Company Talks',
      date: 'March 19, 2026',
      description: 'Unlock what it takes to thrive in tech.'
    },
    schema: companyTalksRegistrationSchema,
    skeleton: HackfestSkeleton,
    steps: [
      {
        label: 'Information',
        component: CompanyUserInfo,
        keys: ['firstName', 'lastName', 'email']
      }
    ],
  },

  'pf-jf': {
    meta: {
      title: 'Practicum Fair and Job Fair',
      date: 'March 19, 2026',
      description:
        'Take your first step toward securing your ideal internship and launching your professional career.'
    },
    schema: pfjfRegistrationSchema,
    skeleton: HackfestSkeleton,
    steps: [
      {
        label: 'Information',
        component: PfjfUserInfo,
        keys: ['firstName', 'lastName', 'email', 'purposeOfRegistration']
      }
    ],
  }
};
