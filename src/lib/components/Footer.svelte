<script>
  import Facebook from './icons/Facebook.svelte';
  import Github from './icons/Github.svelte';
  import Instagram from './icons/Instagram.svelte';
  import LinkedIn from './icons/LinkedIn.svelte';
  import X from './icons/X.svelte';
  import YouTube from './icons/YouTube.svelte';

  import { page } from '$app/state';
  import invertedLogo from '$lib/assets/colored-logo-inverted.png?enhanced';
  import coloredLogo from '$lib/assets/colored-logo.png?enhanced';

  const socials = [
    { component: LinkedIn, href: 'https://www.linkedin.com/company/yses2005/', label: 'LinkedIn' },
    { component: Github, href: 'https://github.com/yses2005', label: 'GitHub' },
    { component: Facebook, href: 'https://www.facebook.com/YSES2005', label: 'Facebook' },
    { component: X, href: 'https://x.com/yses2005', label: 'X' },
    {
      component: YouTube,
      href: 'https://www.youtube.com/c/youngsoftwareengineerssociety',
      label: 'YouTube'
    },
    { component: Instagram, href: 'https://www.instagram.com/yses2005', label: 'Instagram' }
  ];

  const darkBg = $derived(
    page.url.pathname === '/' || page.url.pathname.split('/').at(-1) === 'register'
      ? 'dark:bg-primary/5 outline outline-primary/40'
      : 'bg-transparent'
  );
</script>

<footer class="bg-neutral-50 p-8 backdrop-blur-lg not-xs:pb-16 not-lg:px-0 {darkBg}">
  <div class="container mx-auto flex flex-col place-items-center gap-4 md:flex-row">
    <a
      href="https://www.yses.org/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Visit YSES Online"
      class="transition-transform hover:scale-105"
    >
      <enhanced:img
        src={coloredLogo}
        class="block size-16 dark:hidden"
        loading="lazy"
        decoding="async"
        alt="YSES Logo"
      />

      <enhanced:img
        src={invertedLogo}
        class="hidden size-16 dark:block"
        loading="lazy"
        decoding="async"
        alt="YSES Logo"
      />
    </a>

    <div class="not-md:text-center">
      <h3 class="text-lg">Young Software Engineers' Society</h3>
      <div class="text-sm">University of the Philippines Los Baños</div>
    </div>
    <div
      class="flex w-fit flex-col place-items-end not-md:place-items-center not-md:gap-y-12 md:ml-auto"
    >
      <div class="flex gap-1 not-md:scale-120">
        {#each socials as social (social.label)}
          <a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            class="transition-transform hover:scale-110"
          >
            <social.component />
          </a>
        {/each}
      </div>
      <div>prog@yses.org</div>
    </div>
  </div>
</footer>
