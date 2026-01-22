<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import ScrollReveal from './ScrollReveal.svelte';
	import Button from './ui/button/button.svelte';

	import { cn } from '$lib/utils';

	type Props = {
		title: string;
		subtitle: string;
		class?: string;
	} & HTMLAttributes<HTMLElement>;

	let { title, subtitle, class: className, ...rest }: Props = $props();
</script>

<section class={cn('sticky  flex  flex-col justify-between bg-white p-8', className)} {...rest}>
	<ScrollReveal delay="200ms">
		<p class="hidden text-xl md:block">{subtitle}</p>
	</ScrollReveal>
	<div
		class="flex w-full flex-col place-items-center gap-y-8 text-center md:flex-row md:place-items-end md:justify-between md:text-left"
	>
		<div>
			<ScrollReveal class="hidden text-4xl font-extralight tracking-tighter md:block">
				EXPE21ENCE YSES:
			</ScrollReveal>
			<ScrollReveal delay="400ms">
				<h2 class="text-6xl">{title}</h2>
			</ScrollReveal>
			<ScrollReveal delay="200ms">
				<p class="mt-4 md:hidden">{subtitle}</p>
			</ScrollReveal>
		</div>
		<Button class="rounded-full p-8 px-16" size="lg">Explore</Button>
	</div>
</section>
