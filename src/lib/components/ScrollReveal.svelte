<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    delay = 0,
    threshold = 0.1,
    duration = '1.2s',
    class: className = '',
    children
  }: {
    delay?: number | string;
    threshold?: number;
    duration?: string;
    class?: string;
    children?: Snippet;
  } = $props();

  let isVisible = $state(false);

  let cssDelay = $derived(typeof delay === 'number' ? `${delay}ms` : delay);

  function inView(node: HTMLElement) {
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          isVisible = true;
          observer.unobserve(node);
        }
      },
      { threshold }
    );

    observer.observe(node);

    return {
      destroy() {
        observer.disconnect();
      }
    };
  }
</script>

<div
  use:inView
  class={className}
  style:opacity={isVisible ? 1 : 0}
  style:transform={isVisible ? 'translateZ(0)' : 'translate3d(0, 0.5rem, 0)'}
  style:transition="opacity {duration} cubic-bezier(0.16, 1, 0.3, 1), transform {duration} cubic-bezier(0.16,
  1, 0.3, 1)"
  style:transition-delay={cssDelay}
>
  {@render children?.()}
</div>
