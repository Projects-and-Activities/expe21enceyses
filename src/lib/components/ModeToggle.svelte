<script lang="ts">
	import MoonIcon from '@lucide/svelte/icons/moon';
	import SunIcon from '@lucide/svelte/icons/sun';
	import { toggleMode } from 'mode-watcher';

	import { Button, type ButtonVariant } from '$lib/components/ui/button/index.js';

	type Props = {
		isDark: boolean;
		variant: ButtonVariant;
		class: string;
	};

	const { isDark, variant = 'outline', class: className }: Props = $props();
</script>

<Button onclick={toggleMode} {variant} size="icon-lg" class="rounded-full {className}">
	{#if isDark}
		<MoonIcon
			class="absolute size-5 scale-0 rotate-90 transition-all! dark:scale-100 dark:rotate-0"
		/>
	{:else}
		<SunIcon class=" size-5 scale-100 rotate-0 transition-all! dark:scale-0 dark:-rotate-90" />
	{/if}
	<span class="sr-only">Toggle theme</span>
</Button>

