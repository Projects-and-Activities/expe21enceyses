<script lang="ts">
  import { onMount } from 'svelte';
  import { mode } from 'mode-watcher';

  // Icons & Assets
  import Bell from '@lucide/svelte/icons/bell';
  import Mic from '@lucide/svelte/icons/mic';
  import Globe from '@lucide/svelte/icons/globe';
  import Briefcase from '@lucide/svelte/icons/briefcase';
  import Megaphone from '@lucide/svelte/icons/megaphone';
  import Group from '@lucide/svelte/icons/users';
  import Lightbulb from '@lucide/svelte/icons/lightbulb';

  // Section Components
  import BackgroundBlobs from './ctalks-sections/BackgroundBlobs.svelte';
  import HeroSection from './ctalks-sections/HeroSection.svelte';
  import OverviewSection from './ctalks-sections/OverviewSection.svelte';
  import SessionSection from './ctalks-sections/SessionSection.svelte';
  import SpeakerSection from './ctalks-sections/SpeakerSection.svelte';
  import RegisterSection from './ctalks-sections/RegisterSection.svelte';

  // --- Reactive States ---
  let isDark = $derived(mode.current === 'dark');

  // Glass & Styling Constants
  let BORDER_GRADIENT = $derived(
    isDark
      ? 'linear-gradient(90deg, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.01) 10%, rgba(255,255,255,0.05) 100%)'
      : 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 100%)'
  );

  let GLASS_OPTIONS = $derived(
    isDark
      ? {
          mainBlur: '0.1rem',
          mainBackgroundColor: 'rgba(250, 250, 250, 0.05)',
          edgeBlur: '1rem',
          edgeBackgroundColor: 'rgba(150, 150, 150, 0.0)',
          edgeWidth: '0.15rem',
          sheenBlur: '4rem',
          sheenBackgroundColor: 'rgba(100, 100, 100, 0.05)',
          sheenWidth: '1rem'
        }
      : {
          mainBlur: '0.5rem',
          mainBackgroundColor: 'rgba(255, 255, 255, 0.2)',
          edgeBlur: '0.5rem',
          edgeBackgroundColor: 'rgba(1, 1, 1, 0.0)',
          edgeWidth: '0.1rem',
          sheenBlur: '4rem',
          sheenBackgroundColor: 'rgba(100, 100, 100, 0.05)',
          sheenWidth: '1rem'
        }
  );

  // --- Content Data ---
  const keyDetails = [
    {
      icon: Globe,
      description:
        'Bridges academic learning with real-world industry practice through insights shared by professionals.'
    },
    {
      icon: Briefcase,
      description:
        'Understand industry expectations, essential skills, and professional readiness for early careers.'
    },
    {
      icon: Lightbulb,
      description:
        'Gain firsthand knowledge of roles, responsibilities, and realities of working in the tech industry.'
    },
    {
      icon: Megaphone,
      description:
        'Engage directly with company representatives through meaningful Q&A and open discussions.'
    },
    {
      icon: Group,
      description:
        'Understand how technology and AI are used in real-world and community-focused solutions.'
    }
  ];

  const registrationSteps = [
    {
      Icon: Bell,
      title: 'Register',
      description: 'Go to [link] and choose "Company Talks" to begin your registration.'
    },
    {
      Icon: Mic,
      title: 'Submit Your Details',
      description:
        'Fill out the form, upload the necessary requirements, and submit your application.'
    },
    {
      Icon: Bell,
      title: 'Await Confirmation',
      description:
        'Once you have submitted your application, wait for a confirmation email to secure your entry.'
    }
  ];

  const speakers = [
    { name: 'Speaker 1', company: 'Company 1', image: '' },
    { name: 'Speaker 2', company: 'Company 2', image: '' },
    { name: 'Speaker 3', company: 'Company 3', image: '' }
  ];

  const overview_description =
    "is a curated series of talks and interactive Q&A sessions where industry professionals share real-world perspectives on working in the tech industry today. As part of EXPE21ENCE YSES, it reinforces the organization's 21-year mission of bridging the gap between the academe and the industry—helping the students understand how their skills, values, and education translate into real impact. ";

  const event_title = 'EXPE21ENCE YSES: Company Talks';

  const tagline = 'Inside the Tech Industry — From Professionals Themselves';

  const register_route = '';

  const sessionPreview = '';
</script>

<BackgroundBlobs />

<div class="flex flex-col items-center">
  <HeroSection {event_title} {tagline} {register_route} />

  <OverviewSection
    {isDark}
    {GLASS_OPTIONS}
    {BORDER_GRADIENT}
    {overview_description}
    {event_title}
  />

  <SessionSection {keyDetails} {sessionPreview} {isDark} {GLASS_OPTIONS} {BORDER_GRADIENT} />

  <SpeakerSection {speakers} {isDark} {GLASS_OPTIONS} {BORDER_GRADIENT} />

  <RegisterSection {registrationSteps} />
</div>
