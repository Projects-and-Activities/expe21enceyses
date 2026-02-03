<script lang="ts">
  import { page } from '$app/stores';
  import { mode } from 'mode-watcher';
  import { Spring } from 'svelte/motion';
  import ArrowLeft from '@lucide/svelte/icons/arrow-left';
  import { onMount } from 'svelte';
  import starImage from '$lib/assets/star.png';

  let isDark = $derived(mode.current === 'dark');

  let springX = new Spring(0, { stiffness: 0.05, damping: 0.25 });
  let springY = new Spring(0, { stiffness: 0.05, damping: 0.25 });

  function handleMouseMove(e: MouseEvent) {
    if (typeof window !== 'undefined') {
      springX.target = (e.clientX / window.innerWidth) * 2 - 1;
      springY.target = (e.clientY / window.innerHeight) * 2 - 1;
    }
  }

  onMount(() => {
    // spawn every 1.5 sec
    const interval = setInterval(() => {
      spawnShootingStar();
    }, 2000);

    return () => clearInterval(interval);
  });

  type ShootingStar = {
    id: number;
    x: number;
    y: number;
    duration: number;
  };

  let shootingStars = $state<ShootingStar[]>([]);
  let shootingStarId = 0;

  function spawnShootingStar() {
    const id = shootingStarId++;
    const star: ShootingStar = {
      id,
      x: Math.random() * 20, //spawn
      y: -20 + Math.random() * 50, // spread -10% to 40% from top
      duration: 4 + Math.random() * 2
    };

    shootingStars.push(star);

    setTimeout(
      () => {
        shootingStars = shootingStars.filter((s) => s.id !== id);
      },
      star.duration * 1000 + 500
    );
  }
</script>

<svelte:window onmousemove={handleMouseMove} />

<!-- dot stars background with parallax -->
<div class="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
  <!-- slow stars -->
  <div
    class="absolute inset-0"
    style="transform: translate({springX.current * 20}px, {springY.current * 20}px);"
  >
    <div class="stars-layer-1"></div>
  </div>

  <!-- slightly faster stars -->
  <div
    class="absolute inset-0"
    style="transform: translate({springX.current * 40}px, {springY.current * 40}px);"
  >
    <div class="stars-layer-2"></div>
  </div>

  <!-- fast stars -->
  <div
    class="absolute inset-0"
    style="transform: translate({springX.current * 60}px, {springY.current * 60}px);"
  >
    <div class="stars-layer-3"></div>
  </div>
</div>

<div class="pointer-events-none fixed inset-0 -z-10 h-screen overflow-hidden">
  <div
    class="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-purple-400/20 mix-blend-multiply blur-[100px] dark:mix-blend-normal"
  ></div>

  {#each shootingStars as star (star.id)}
    <div
      class="comet"
      style="
        left: {star.x}%; 
        top: {star.y}%; 
        animation-duration: {star.duration}s;
      "
    ></div>
  {/each}

  <div
    class="absolute -right-[10%] -bottom-[10%] h-[40%] w-[40%] rounded-full bg-purple-400/20 mix-blend-multiply blur-[120px] dark:mix-blend-normal"
  ></div>
  <div
    class="absolute top-1/2 left-1/2 h-[50%] w-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-400/10 blur-[100px]"
  ></div>
</div>

<!-- Main content -->
<main class="relative flex min-h-screen flex-col items-center justify-center px-4">
  <!-- Decorative stars -->
  {@render star(
    'top-[15%] left-[10%] w-20 rotate-12 blur-[2px] opacity-50 dark:opacity-70 hidden lg:block'
  )}
  {@render star(
    'top-[20%] right-[15%] w-32 -rotate-15 blur-[1px] opacity-60 dark:opacity-80 hidden lg:block'
  )}
  {@render star(
    'bottom-[25%] left-[8%] w-24 rotate-25 blur-[3px] opacity-40 dark:opacity-60 hidden lg:block'
  )}
  {@render star(
    'bottom-[20%] right-[12%] w-28 -rotate-30 opacity-55 dark:opacity-75 hidden lg:block'
  )}
  {@render star(
    'top-[40%] left-[5%] w-16 rotate-45 blur-[4px] opacity-35 dark:opacity-55 hidden lg:block'
  )}
  {@render star(
    'top-[35%] right-[8%] w-20 -rotate-20 blur-[2px] opacity-45 dark:opacity-65 hidden lg:block'
  )}

  <div class="animate-fade-in" style="animation-delay: 100ms;">
    <h1
      data-text={$page.status}
      class="floating-404 glitch font-serif text-[128px] leading-none font-normal tracking-normal text-foreground md:text-[200px] lg:text-[256px] dark:[text-shadow:0_0_8px_rgba(253,253,252,0.3)]"
    >
      {$page.status}
    </h1>
  </div>

  <div class="mt-8 text-center">
    <p
      class="animate-fade-in font-['Lexend'] text-lg leading-relaxed font-light text-foreground md:text-xl lg:text-2xl"
      style="animation-delay: 300ms;"
    >
      Uh oh! This page either does not exist or<br class="hidden sm:block" />
      is not yet available for you.
    </p>

    <p
      class="animate-fade-in mt-6 font-['Lexend'] text-lg leading-relaxed font-light text-foreground italic md:text-xl lg:text-2xl"
      style="animation-delay: 500ms;"
    >
      You may contact YSES<br class="hidden sm:block" />
      if you may be seeing this by mistake.
    </p>
  </div>

  <a
    href="/"
    class="group animate-fade-in mt-12 flex items-center gap-2 rounded-full border-2 border-purple-500/50 bg-purple-500/10 px-6 py-3 font-['Lexend'] text-sm font-medium text-purple-600 transition-all duration-300 hover:border-purple-500 hover:bg-purple-500/20 dark:text-purple-400"
    style="animation-delay: 700ms;"
  >
    <ArrowLeft class="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
    Back to Home
  </a>
</main>

{#snippet star(className: string)}
  {@const duration = (3 + Math.random() * 4).toFixed(2) + 's'}
  {@const delay = (Math.random() * -5).toFixed(2) + 's'}

  <div class="pointer-events-none absolute -z-10 select-none {className}">
    <img
      src={starImage}
      alt=""
      style="animation-duration: {duration}; animation-delay: {delay};"
      class="star-anim block h-full w-full object-contain"
    />
  </div>
{/snippet}
