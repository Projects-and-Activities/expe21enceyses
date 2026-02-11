<script lang="ts">
  import { LiquidGlass } from 'liquid-glass-svelte';

  import ModeToggle from './ModeToggle.svelte';

  import { page } from '$app/stores';
  import logo from '$lib/assets/logo21Light.png';
  import logoDark from '$lib/assets/logo21Dark.png';
  import { Button } from '$lib/components/ui/button';
  import * as NavigationMenu from '$lib/components/ui/navigation-menu';

  interface NavItem {
    label: string;
    href: string;
  }

  interface Props {
    navItems: NavItem[];
    eventItems: NavItem[];
    isDark: boolean;
    glassOptions: any;
    borderGradient: string;
    isActive: (href: string, currentPath: string) => boolean;
  }

  let { navItems, eventItems, isDark, glassOptions, borderGradient, isActive }: Props = $props();
</script>

<!-- Desktop Navbar -->
<nav
  class="fixed top-4 left-1/2 z-100 box-border hidden w-full max-w-300 -translate-x-1/2 place-items-center gap-2 px-4 md:flex md:px-5 lg:px-8"
>
  <div class="relative w-full flex-1 rounded-2xl outline" style="background: {borderGradient};">
    {#key isDark}
      <LiquidGlass
        class="relative block h-14 w-full !overflow-visible rounded-sm"
        options={glassOptions}
      >
        <div
          class="!absolute !inset-0 z-10 flex !h-full w-full items-center justify-between px-4 md:px-6 lg:px-8"
        >
          <a href="/" class="flex items-center transition-transform duration-300 hover:scale-105">
            {#if isDark}
              <enhanced:img
                src={logoDark}
                alt="E21 Logo"
                class="h-[1.875rem] w-auto object-contain"
              />
            {:else}
              <enhanced:img src={logo} alt="E21 Logo" class="h-[1.875rem] w-auto object-contain" />
            {/if}
          </a>

          <div class="flex items-center gap-2.5">
            <NavigationMenu.Root>
              <NavigationMenu.List class="flex-initial justify-end gap-2.5">
                {#each navItems as item (item.label)}
                  <NavigationMenu.Item>
                    {#if item.label === 'Events'}
                      <NavigationMenu.Trigger
                        class="flex min-h-[2.75rem] items-center justify-center !bg-transparent px-3 font-['Lexend']
												   font-light !no-underline !ring-0 transition-all
												   duration-300 hover:scale-[1.02] hover:!bg-transparent hover:text-primary
												   data-[state=open]:!bg-transparent
												   {isActive(item.href, $page.url.pathname) ? 'text-primary drop-shadow-sm' : 'text-foreground'}"
                      >
                        {item.label}
                      </NavigationMenu.Trigger>
                      <NavigationMenu.Content
                        class="!rounded-none !border-none !bg-transparent !p-0 !shadow-none"
                      >
                        <div
                          class="flex min-w-[17.5rem] flex-col gap-4 rounded-[1.5rem] border border-border bg-background p-8 shadow-2xl"
                        >
                          {#each eventItems as event}
                            <a
                              href={event.href}
                              class="font-light transition-colors hover:text-primary"
                            >
                              {event.label}
                            </a>
                          {/each}
                        </div>
                      </NavigationMenu.Content>
                    {:else}
                      <NavigationMenu.Link
                        href={item.href}
                        class="flex min-h-[2.75rem] items-center justify-center bg-transparent px-3 font-['Lexend']
												   font-light transition-all
												   duration-300 hover:scale-[1.02] hover:bg-transparent hover:text-primary
												   {isActive(item.href, $page.url.pathname) ? 'text-primary drop-shadow-sm' : 'text-foreground'}"
                      >
                        {item.label}
                      </NavigationMenu.Link>
                    {/if}
                  </NavigationMenu.Item>
                {/each}
              </NavigationMenu.List>
              <NavigationMenu.Viewport
                class="absolute top-full right-0 mt-4 h-auto w-auto overflow-visible"
              />
            </NavigationMenu.Root>

            <div class="ml-2 rounded-[3.75rem] p-0.5">
              <Button
                variant="outline"
                size="register"
                class="relative isolate overflow-hidden bg-transparent! p-0 font-light dark:font-normal dark:shadow-[0px_5px_20px_rgba(0,0,0,0.3),inset_0px_1px_0px_rgba(255,255,255,0.6)]"
                href="/register"
              >
                <span class="relative z-10">Register</span>
              </Button>
            </div>
          </div>
        </div>
      </LiquidGlass>
    {/key}
  </div>

  <ModeToggle class="p-6 shadow-xl " />
</nav>
