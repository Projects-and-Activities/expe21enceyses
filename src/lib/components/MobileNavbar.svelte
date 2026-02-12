<script lang="ts">
  import { ArrowUpRight, Menu, X as XIcon } from '@lucide/svelte';
  import { LiquidGlass } from 'liquid-glass-svelte';

  import ModeToggle from './ModeToggle.svelte';

  import { page } from '$app/stores';
  import invertedLogo from '$lib/assets/colored-logo-inverted.png?enhanced';
  import coloredLogo from '$lib/assets/colored-logo.png?enhanced';
  import logo from '$lib/assets/logo21Light.png?enhanced';
  import logoDark from '$lib/assets/logoDark.png?enhanced';
  import Facebook from '$lib/components/icons/Facebook.svelte';
  import Github from '$lib/components/icons/Github.svelte';
  import Instagram from '$lib/components/icons/Instagram.svelte';
  import LinkedIn from '$lib/components/icons/LinkedIn.svelte';
  import TwitterX from '$lib/components/icons/X.svelte';
  import YouTube from '$lib/components/icons/YouTube.svelte';
  import { Button } from '$lib/components/ui/button';
  import * as Sheet from '$lib/components/ui/sheet';

  interface NavItem {
    label: string;
    href: string;
  }

  interface Props {
    eventItems: NavItem[];
    isDark: boolean;
    glassOptions: any;
    borderGradient: string;
    isActive: (href: string, currentPath: string) => boolean;
  }

  let { eventItems, isDark, glassOptions, borderGradient, isActive }: Props = $props();

  // Mobile menu state
  let mobileMenuOpen = $state(false);
</script>

<!-- Mobile Navbar -->
<nav
  class="fixed top-4 right-0 left-0 z-50 mx-auto w-full px-4 xs:max-w-[calc(100%-1.5rem)] sm:top-4 sm:max-w-[calc(100%-2rem)] sm:px-0 md:hidden"
>
  <div
    class="relative w-full rounded-2xl p-px shadow-xl outline"
    style="background: {borderGradient};"
  >
    {#key isDark}
      <LiquidGlass
        class="relative block h-[3.5rem] w-full !overflow-visible rounded-[1.25rem] sm:h-[4rem] sm:rounded-[1.5rem]"
        options={glassOptions}
      >
        <div class="!absolute !inset-0 z-10 flex !h-full w-full items-center px-3 sm:px-4">
          <!-- Hamburger Menu Button -->
          <Sheet.Root bind:open={mobileMenuOpen}>
            <Sheet.Trigger>
              <button
                class="mr-2 flex h-11 min-h-[2.75rem] w-11 min-w-[2.75rem] items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted/50 sm:mr-3"
                aria-label="Open menu"
              >
                <Menu class="h-6 w-6" />
              </button>
            </Sheet.Trigger>

            <!-- Logo -->
            <a href="/" class="flex items-center">
              {#if isDark}
                <enhanced:img
                  src={logoDark}
                  alt="E21 Logo"
                  class="h-[1.5rem] w-auto object-contain sm:h-[1.875rem]"
                />
              {:else}
                <enhanced:img
                  src={logo}
                  alt="E21 Logo"
                  class="h-[1.5rem] w-auto object-contain sm:h-[1.875rem]"
                />
              {/if}
            </a>

            <ModeToggle variant="ghost" class="ml-auto shadow-none" />

            <Sheet.Portal>
              <Sheet.Overlay class="!bg-black/20 backdrop-blur-sm" />
              <Sheet.Content
                side="right"
                class="!w-full !max-w-full !border-none !bg-transparent p-0 sm:!max-w-full"
              >
                {#key isDark}
                  <LiquidGlass
                    class="flex h-full w-full flex-col rounded-none"
                    options={glassOptions}
                  >
                    <div class="flex h-full flex-col p-4 sm:p-6">
                      <!-- Header with logo and close button -->
                      <div class="flex items-center justify-between">
                        <a href="/" onclick={() => (mobileMenuOpen = false)}>
                          {#if isDark}
                            <enhanced:img
                              src={logoDark}
                              alt="E21 Logo"
                              class="h-10 w-auto object-contain"
                            />
                          {:else}
                            <enhanced:img
                              src={logo}
                              alt="E21 Logo"
                              class="h-10 w-auto object-contain"
                            />
                          {/if}
                        </a>
                        <Sheet.Close>
                          <button
                            class="flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted/50"
                            aria-label="Close menu"
                          >
                            <XIcon class="h-6 w-6" />
                          </button>
                        </Sheet.Close>
                      </div>

                      <!-- Navigation Links -->
                      <nav class="mt-12 flex flex-col gap-2">
                        <!-- Home -->
                        <a
                          href="/"
                          onclick={() => (mobileMenuOpen = false)}
                          class="font-['Lexend'] text-xl font-medium transition-colors hover:text-primary
													       {isActive('/', $page.url.pathname) ? 'text-primary' : 'text-foreground'}"
                        >
                          Home
                        </a>

                        <!-- Events -->
                        <div class="flex flex-col">
                          <span
                            class="font-['Lexend'] text-xl font-medium
														       {isActive('/events', $page.url.pathname) ? 'text-primary' : 'text-foreground'}"
                          >
                            Events
                          </span>
                          <!-- Event Sub-items -->
                          <div class="mt-4 ml-4 flex flex-col gap-4">
                            {#each eventItems as event (event.label)}
                              <a
                                href={event.href}
                                onclick={() => (mobileMenuOpen = false)}
                                class="font-['Lexend'] font-light transition-colors hover:text-primary
																       {isActive(event.href, $page.url.pathname) ? 'text-primary' : 'text-foreground'}"
                              >
                                {event.label}
                              </a>
                            {/each}
                          </div>
                        </div>

                        <a
                          href="https://www.yses.org/"
                          target="_blank"
                          rel="noopener noreferrer"
                          onclick={() => (mobileMenuOpen = false)}
                          class="mt-4 flex flex-row font-light text-foreground transition-colors hover:text-primary"
                        >
                          YSES Online
                          <ArrowUpRight size="16" />
                        </a>
                      </nav>

                      <!-- Register Button -->
                      <div class="mt-8">
                        <Button
                          variant="outline"
                          size="register"
                          class="relative isolate overflow-hidden bg-transparent! p-0 font-light dark:font-normal dark:shadow-[0px_5px_20px_rgba(0,0,0,0.3),inset_0px_1px_0px_rgba(255,255,255,0.6)]"
                          href="/register"
                          onclick={() => (mobileMenuOpen = false)}
                          disabled
                        >
                          <span class="relative z-10">Register</span>
                        </Button>
                      </div>

                      <!-- Spacer -->
                      <div class="flex-1"></div>

                      <!-- Footer with YSES logo and social icons -->
                      <div class="mt-auto pb-4 sm:pb-6">
                        <div class="flex items-center gap-3">
                          <enhanced:img
                            src={coloredLogo}
                            class="block size-16 dark:hidden"
                            loading="lazy"
                            decoding="async"
                            alt="Logo"
                          />

                          <enhanced:img
                            src={invertedLogo}
                            class="hidden size-16 dark:block"
                            loading="lazy"
                            decoding="async"
                            alt="Logo"
                          />
                          <div>
                            <div class="font-['Lexend'] text-sm font-medium">
                              Young Software Engineers' Society
                            </div>
                            <div class="text-xs text-muted-foreground">
                              University of the Philippines Los Baños
                            </div>
                          </div>
                        </div>
                        <!-- Social Icons -->
                        <div class="mt-4 flex gap-2">
                          <LinkedIn />
                          <Github />
                          <Facebook />
                          <TwitterX />
                          <YouTube />
                          <Instagram />
                        </div>
                      </div>
                    </div>
                  </LiquidGlass>
                {/key}
              </Sheet.Content>
            </Sheet.Portal>
          </Sheet.Root>
        </div>
      </LiquidGlass>
    {/key}
  </div>
</nav>
