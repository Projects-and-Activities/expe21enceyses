type ViewportParams = {
  onEnter?: () => void;
  once?: boolean;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
};

export function viewport(node: HTMLElement, params: ViewportParams = {}) {
  let { onEnter, once = true, delay = 0, threshold = 0, rootMargin = '0px' } = params;

  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        if (delay > 0) {
          setTimeout(() => {
            onEnter?.();
          }, delay);
        } else {
          onEnter?.();
        }

        if (once) {
          observer.disconnect();
        }
      }
    },
    { threshold, rootMargin }
  );

  observer.observe(node);

  return {
    update(newParams: ViewportParams) {
      ({ onEnter, once, delay, threshold, rootMargin } = {
        once: true,
        delay: 0,
        threshold: 0,
        rootMargin: '0px',
        ...newParams
      });
    },
    destroy() {
      observer.disconnect();
    }
  };
}
