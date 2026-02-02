<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';

  type Props = {
    size?: number | string;
    color?: string;
    ariaLabel?: string;
  } & SVGAttributes<SVGElement>;

  const { size = 24, color = 'currentColor', ariaLabel = 'X', ...rest }: Props = $props();
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
    d="M13.66 10.61l6.51-7.03h-1.575l-5.64 6.09L8.4 3.575H3.045l6.95 9.29L3 20.42h1.575l6.125-6.615 4.945 6.615H21l-7.34-9.815v.005Zm-8.3-5.875h2.46l10.865 14.53h-2.46L5.36 4.735Z"
    fill={color}
  />
</svg>
