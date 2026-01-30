<script lang="ts">
	import { mode } from 'mode-watcher';

	import DesktopNavbar from './DesktopNavbar.svelte';
	import MobileNavbar from './MobileNavbar.svelte';

	// Navigation items
	const navItems = [
		{ label: 'Home', href: '/' },
		{ label: 'Events', href: '/events' }
	];

	// Event sub-items
	const eventItems = [
		{ label: 'The Hackfest', href: '/events/hackfest' },
		{ label: 'Practicum/Job Fair', href: '/events/pf-jf' },
		{ label: 'Company Talks', href: '/events/company-talks' }
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
					// for dark mode play around with this until we get the desired effect
					mainBlur: '0.5rem',
					mainBackgroundColor: 'rgba(250, 250, 250, 0.0)',
					edgeBlur: '1rem',
					edgeBackgroundColor: 'rgba(100, 100, 100, 0.0)',
					edgeWidth: '0.01rem',
					sheenBlur: '4rem',
					sheenBackgroundColor: 'rgba(100, 100, 100, 0.05)',
					sheenWidth: '1rem'
				} as const)
			: ({
					// light mode
					mainBlur: '0.5rem',
					mainBackgroundColor: 'rgba(255, 255, 255, 0.2)',
					edgeBlur: '0.5rem',
					edgeBackgroundColor: 'rgba(100, 100, 100, 0.0)',
					edgeWidth: '0.01rem',
					sheenBlur: '4rem',
					sheenBackgroundColor: 'rgba(100, 100, 100, 0.05)',
					sheenWidth: '1rem'
				} as const)
	);

	// Reactive border gradient based on dark mode
	let borderGradient = $derived(
		isDark
			? 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.05) 100%)'
			: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.1) 100%)'
	);
</script>

<DesktopNavbar {navItems} {eventItems} {isDark} {glassOptions} {borderGradient} {isActive} />

<MobileNavbar {navItems} {eventItems} {isDark} {glassOptions} {borderGradient} {isActive} />
