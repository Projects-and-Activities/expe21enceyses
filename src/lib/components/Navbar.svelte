<script lang="ts">
	import { LiquidGlass } from 'liquid-glass-svelte';
	import { mode } from 'mode-watcher';

	import { page } from '$app/stores';
	import logo from '$lib/assets/logo.png';
	import logoDark from '$lib/assets/logoDark.png';
	import { Button } from '$lib/components/ui/button';
	import * as NavigationMenu from '$lib/components/ui/navigation-menu';

	// Navigation items
	const navItems = [
		{ label: 'Home', href: '/' },
		{ label: 'Events', href: '/events' }
	];

	// Check if a nav item is active
	function isActive(href: string, currentPath: string): boolean {
		return href === '/' ? currentPath === '/' : currentPath.startsWith(href);
	}

	// Reactive LiquidGlass options based on dark mode (Svelte 5 runes)
	let isDark = $derived(mode.current === 'dark');

	let glassOptions = $derived(
		isDark
			? ({
					mainBlur: '0.28rem',
					mainBackgroundColor: 'rgba(0, 0, 0, 0.2)',
					edgeBlur: '0.8rem',
					edgeBackgroundColor: 'rgba(255, 255, 255, 0.2)',
					edgeWidth: '0.5rem',
					sheenBlur: '5rem',
					sheenBackgroundColor: 'rgba(255, 255, 255, 0.05)',
					sheenWidth: '0.5rem'
				} as const)
			: ({
					mainBlur: '0.1rem',
					mainBackgroundColor: 'rgba(255, 255, 255, 0.4)',
					edgeBlur: '0.1rem',
					edgeBackgroundColor: 'rgba(255, 255, 255, 0.8)',
					edgeWidth: '0.5rem',
					sheenBlur: '5rem',
					sheenBackgroundColor: 'rgba(255, 255, 255, 0.5)',
					sheenWidth: '2rem'
				} as const)
	);

	// Reactive border gradient based on dark mode
	let borderGradient = $derived(
		isDark
			? 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.05) 100%)'
			: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.1) 100%)'
	);
</script>

<nav class="fixed top-8 left-1/2 z-50 box-border w-full max-w-[75rem] -translate-x-1/2 px-5">
	<div
		class="relative w-full rounded-[1.5625rem] p-px shadow-xl"
		style="background: {borderGradient};"
	>
		{#key isDark}
			<LiquidGlass
				class="relative block h-[5.16rem] w-full !overflow-visible rounded-[1.5rem]"
				options={glassOptions}
			>
				<div
					class="!absolute !inset-0 z-10 flex !h-full w-full items-center justify-between px-8"
				>
					<a
						href="/"
						class="flex items-center transition-transform duration-300 hover:scale-105"
					>
						<!-- Light mode logo -->
						<img
							src={logo}
							alt="E21 Logo"
							class="h-[1.875rem] w-auto object-contain dark:hidden"
						/>
						<!-- Dark mode logo -->
						<img
							src={logoDark}
							alt="E21 Logo"
							class="hidden h-[1.875rem] w-auto object-contain dark:block"
						/>
					</a>

					<div class="flex items-center gap-2.5">
						<NavigationMenu.Root>
							<NavigationMenu.List class="flex-initial justify-end gap-2.5">
								{#each navItems as item}
									<NavigationMenu.Item>
										{#if item.label === 'Events'}
											<NavigationMenu.Trigger
												class="flex h-[1.875rem] items-center justify-center !bg-transparent px-3 font-['Lexend'] text-2xl
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
													<a
														href="/events/hackfest"
														class="text-2xl font-light transition-colors hover:text-primary"
														>The HackFest</a
													>
													<a
														href="/events/pf-jf"
														class="text-2xl font-light transition-colors hover:text-primary"
														>PF/JF</a
													>
													<a
														href="/events/company-talks"
														class="text-2xl font-light transition-colors hover:text-primary"
														>Company Talks</a
													>
												</div>
											</NavigationMenu.Content>
										{:else}
											<NavigationMenu.Link
												href={item.href}
												class="flex h-[1.875rem] items-center justify-center bg-transparent px-3 font-['Lexend'] text-2xl
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

						<div
							class="ml-2 rounded-[3.75rem] p-[0.125rem]"
							style="background: linear-gradient(180deg, var(--muted-foreground) 0%, var(--background) 60%, var(--muted-foreground) 100%);"
						>
							<Button
								variant="gradient"
								size="register"
								class="register-btn relative isolate overflow-hidden !bg-transparent shadow-[0px_5px_20px_rgba(0,0,0,0.3),inset_0px_1px_0px_rgba(255,255,255,0.6)]"
								onclick={() => console.log('Register clicked')}
							>
								<span class="relative z-10">Register</span>
							</Button>
						</div>
					</div>
				</div>
			</LiquidGlass>
		{/key}
	</div>
</nav>
