<script lang="ts">
  import type { Snippet } from 'svelte';

  import { cn } from '$lib/utils';

  export type AnnotationColor = 'primary' | 'accent' | 'red' | 'green' | 'blue' | '';
  export type AnnotationAlign =
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'bottom-center';

  type Props = {
    class?: string;
    annotation: string;
    annotationAlign: AnnotationAlign;
    color: AnnotationColor;
    size: 'xs' | 'sm';
    children: Snippet;
  };

  const {
    class: className,
    annotation,
    annotationAlign,
    color,
    size = 'sm',
    children
  }: Props = $props();

  const positionStyles = {
    xs: {
      top: '-top-3.5',
      bottom: '-bottom-3.5'
    },
    sm: {
      top: '-top-5',
      bottom: '-bottom-5'
    }
  };

  const alignStyle = $derived.by(() => {
    const t = positionStyles[size].top;
    const b = positionStyles[size].bottom;

    const lookup: Record<AnnotationAlign, string> = {
      'top-left': `${t} -left-px`,
      'top-right': `${t} -right-px`,
      'bottom-left': `${b} -left-px`,
      'bottom-right': `${b} -right-px`,
      'bottom-center': `${b} left-0 right-0 mx-auto w-fit`
    };

    return lookup[annotationAlign];
  });

  const sizeStyle: Record<Props['size'], string> = {
    xs: 'text-[0.6rem] leading-none',
    sm: 'text-xs'
  };

  const backgroundStyle: Record<AnnotationColor, string> = {
    primary: 'bg-primary border-primary',
    accent: 'bg-accent border-accent',
    blue: 'bg-blue-900 border-blue-900',
    red: 'bg-red-900 border-red-900',
    green: 'bg-green-900 border-green-900',
    '': ''
  };
</script>

<div class={cn('relative border', backgroundStyle[color].split(' ')[1], className)}>
  {@render children()}

  <div
    id="annotation"
    class={cn(
      'absolute px-2 py-0.5 font-mono text-xs tracking-tight text-white',
      backgroundStyle[color].split(' ')[0],
      alignStyle,
      sizeStyle[size]
    )}
  >
    {annotation}
  </div>
</div>
