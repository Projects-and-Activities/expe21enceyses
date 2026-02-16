<script lang="ts">
  import { X } from '@lucide/svelte';
  import { onMount } from 'svelte';
  import { cubicOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';

  let visible = $state(false);

  onMount(() => {
    const timer = setTimeout(() => {
      visible = true;
    }, 4000);

    return () => clearTimeout(timer);
  });

  function dismiss(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    visible = false;
  }
</script>

{#if visible}
  <div
    class="pointer-events-none fixed top-22 left-1/2 z-40 flex w-full max-w-300 -translate-x-1/2 justify-end px-4 max-md:top-20 max-md:px-3"
    transition:fly={{ x: 60, duration: 400, easing: cubicOut }}
  >
    <a
      href="/faqs"
      class="faq-toast pointer-events-auto cursor-pointer rounded-full p-px no-underline transition-[transform,box-shadow] duration-250 ease-in-out hover:-translate-y-px"
    >
      <div
        class="relative flex items-center gap-3 overflow-hidden rounded-full py-2.5 pr-3.5 pl-5 backdrop-blur-[16px] dark:backdrop-blur-none"
      >
        <div class="faq-toast-bg absolute inset-0 z-0 rounded-full blur-[12px]"></div>
        <span
          class="relative z-1 font-['Lexend'] text-sm font-normal tracking-wide whitespace-nowrap text-[rgba(20,20,30,0.9)] dark:text-[rgba(255,255,255,0.95)]"
        >
          Got Questions? →
        </span>
        <button
          class="relative z-1 flex size-6 cursor-pointer items-center justify-center rounded-full border-none bg-transparent p-0 text-[rgba(20,20,30,0.5)] transition-[color,background-color] duration-200 ease-in-out hover:bg-[rgba(0,0,0,0.06)] hover:text-[rgba(20,20,30,0.85)] dark:text-[rgba(255,255,255,0.7)] dark:hover:bg-[rgba(255,255,255,0.1)] dark:hover:text-white"
          onclick={dismiss}
          aria-label="Dismiss FAQ notification"
        >
          <X size={16} strokeWidth={2.5} />
        </button>
      </div>
    </a>
  </div>
{/if}

<style>
  .faq-toast {
    background: linear-gradient(
      94deg,
      rgba(200, 200, 200, 0.6) 8.4%,
      rgba(255, 255, 255, 0.9) 49.75%,
      rgba(200, 200, 200, 0.6) 92.72%
    );
    box-shadow: 0px 10px 40px -10px rgba(0, 0, 0, 0.12);
  }

  .faq-toast:hover {
    box-shadow: 0px 12px 44px -8px rgba(0, 0, 0, 0.2);
  }

  :global(.dark) .faq-toast {
    background: linear-gradient(
      94deg,
      rgba(73, 73, 73, 0.5) 8.4%,
      rgba(255, 255, 255, 0.6) 49.75%,
      rgba(73, 73, 73, 0.5) 92.72%
    );
    box-shadow: 0px 10px 40px -10px rgba(0, 0, 0, 0.25);
  }

  :global(.dark) .faq-toast:hover {
    box-shadow: 0px 12px 44px -8px rgba(0, 0, 0, 0.35);
  }

  .faq-toast > div {
    background: rgba(255, 255, 255, 0.82);
  }

  :global(.dark) .faq-toast > div {
    background: rgba(10, 10, 14, 0.85);
  }

  .faq-toast-bg {
    background:
      radial-gradient(ellipse 60% 100% at 30% 50%, rgba(180, 80, 200, 0.3) 0%, transparent 70%),
      radial-gradient(ellipse 50% 100% at 60% 60%, rgba(60, 100, 220, 0.25) 0%, transparent 70%),
      radial-gradient(ellipse 40% 80% at 45% 40%, rgba(220, 60, 140, 0.25) 0%, transparent 60%);
    opacity: 0.7;
  }

  :global(.dark) .faq-toast-bg {
    background:
      radial-gradient(ellipse 60% 100% at 30% 50%, rgba(180, 80, 200, 0.5) 0%, transparent 70%),
      radial-gradient(ellipse 50% 100% at 60% 60%, rgba(60, 100, 220, 0.45) 0%, transparent 70%),
      radial-gradient(ellipse 40% 80% at 45% 40%, rgba(220, 60, 140, 0.4) 0%, transparent 60%);
    opacity: 0.9;
  }
</style>
