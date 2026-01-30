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

	let { title, subtitle, class: className, children, ...rest }: Props = $props();
</script>

<section class={cn('sticky  flex  flex-col justify-between  p-8', className)} {...rest}>
	<ScrollReveal delay="200ms">
		<p class="hidden text-xl md:block">{subtitle}</p>
	</ScrollReveal>

	<div class="grid flex-1 place-content-center">
		{@render children?.()}
	</div>

	<div
		class="flex w-full flex-col place-items-center gap-y-8 text-center md:flex-row md:place-items-end md:justify-between md:text-left"
	>
		<div>
			<ScrollReveal class="hidden text-4xl font-extralight tracking-tighter md:block">
				EXPE21ENCE YSES:
			</ScrollReveal>
			<ScrollReveal delay="400ms">
				<h2 class="text-5xl md:text-6xl">{title}</h2>
			</ScrollReveal>
			<ScrollReveal delay="200ms">
				<p class="mt-4 not-md:text-sm md:hidden">{subtitle}</p>
			</ScrollReveal>
		</div>
		<Button
			variant="gradient"
			size="register"
			class="register-btn relative isolate overflow-hidden rounded-4xl  bg-transparent! px-18 py-6 shadow-[0px_5px_20px_rgba(0,0,0,0.3),inset_0px_1px_0px_rgba(255,255,255,0.6)] lg:px-20 lg:py-8"
			onclick={() => console.log('Register clicked')}
		>
			<span class="relative z-10">Explore</span>
		</Button>
	</div>
</section>
