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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submit: (data: any) => Promise<void>;
};

export const EVENT_REGISTRY: Record<string, EventConfig> = {
  'junior-hackfest': {
    meta: {
      title: 'Junior Hackfest',
      date: '<Date>',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
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
    submit: async (data) => {
      console.log('Submit junior hackfest:', data);
    }
  },

  'senior-hackfest': {
    meta: {
      title: 'Senior Hackfest',
      date: '<Date>',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
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
    submit: async (data) => {
      console.log('Submit senior hackfest:', data);
    }
  },

  'company-talks': {
    meta: {
      title: 'Company Talks',
      date: '<Date>',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
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
    submit: async (data) => {
      console.log('Submit company talks:', data);
    }
  },

  pfjf: {
    meta: {
      title: 'Practicum Fair and Job Fair',
      date: '<Date>',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
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
    submit: async (data) => {
      console.log('Submit pfjf:', data);
    }
  }
};
