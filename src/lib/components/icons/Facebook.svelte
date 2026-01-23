<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	type Props = {
		size?: number | string;
		color?: string;
		ariaLabel?: string;
	} & SVGAttributes<SVGElement>;

	const { size = 24, color = 'currentColor', ariaLabel = 'Facebook', ...rest }: Props = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	aria-label={ariaLabel}
	{...rest}
>
	<path
		d="M20.005 3H3.995C3.445 3 3 3.45 3 3.995v16.01c0 .55.45.995.995.995h8.62v-6.96h-2.34v-2.72h2.34V9.315c0-2.325 1.415-3.59 3.505-3.59.7 0 1.395 0 2.09.105v2.425h-1.43c-1.135 0-1.35.54-1.35 1.33v1.73h2.7l-.35 2.72h-2.35v6.97h4.575c.55 0 .995-.45.995-.995V3.995c0-.55-.45-.995-.995-.995Z"
		fill={color}
	/>
</svg>
