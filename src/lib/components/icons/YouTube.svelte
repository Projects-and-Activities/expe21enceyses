<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	type Props = {
		size?: number | string;
		color?: string;
		ariaLabel?: string;
	} & SVGAttributes<SVGElement>;

	const { size = 24, color = 'currentColor', ariaLabel = 'YouTube', ...rest }: Props = $props();
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
		d="M21.58 7.185a2.498 2.498 0 0 0-1.764-1.765C18.26 5 12 5 12 5s-6.255 0-7.815.42c-.86.23-1.535.905-1.765 1.765-.29 1.59-.43 3.2-.42 4.815-.01 1.615.13 3.225.42 4.815.23.86.905 1.535 1.765 1.765C5.74 19 12 19 12 19s6.255 0 7.815-.42a2.498 2.498 0 0 0 1.765-1.765c.29-1.59.43-3.2.42-4.815.01-1.615-.13-3.225-.42-4.815ZM10 15V9l5.195 3-5.194 3Z"
		fill={color}
	/>
</svg>
