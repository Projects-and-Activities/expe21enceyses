<script lang="ts">
  import { LiquidGlass } from 'liquid-glass-svelte';
  import { mode } from 'mode-watcher';

  import { cn } from '$lib/utils';

  let { children, class: className = '', ...restProps } = $props();

  let isDark = $derived(mode.current === 'dark');

  let borderGradient = $derived(
    isDark
      ? 'linear-gradient(90deg, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.01) 10%, rgba(255,255,255,0.05) 100%)'
      : 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 100%)'
  );

  let glassOptions = $derived(
    isDark
      ? ({
          // for dark mode play around with this until we get the desired effect
          mainBlur: '0.5rem',
          mainBackgroundColor: 'rgba(250, 250, 250, 0.0)',
          edgeBlur: '1rem',
          edgeBackgroundColor: 'rgba(100, 100, 100, 0.0)',
          edgeWidth: '0.01rem',
          sheenBlur: '4rem',
          sheenBackgroundColor: 'rgba(100, 100, 100, 0.05)',
          sheenWidth: '1rem'
        } as const)
      : ({
          // light mode
          mainBlur: '0.5rem',
          mainBackgroundColor: 'rgba(255, 255, 255, 0.2)',
          edgeBlur: '0.5rem',
          edgeBackgroundColor: 'rgba(100, 100, 100, 0.0)',
          edgeWidth: '0.01rem',
          sheenBlur: '4rem',
          sheenBackgroundColor: 'rgba(100, 100, 100, 0.05)',
          sheenWidth: '1rem'
        } as const)
  );
</script>

<div class="h-full! rounded-[1.5625rem]" style={`background: ${borderGradient}`}>
  <LiquidGlass
    class={cn(
      'glass-card relative block h-full w-full !overflow-visible rounded-[1.5rem] border-2  border-border/50  p-8 p-10 transition-all duration-300 ease-in-out hover:border-purple-500/50 lg:p-12',
      className
    )}
    style="
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25) inset; 
    overflow: hidden; 
    border-radius: 20px; 
    outline: 0.5px #494949 solid; 
    outline-offset: -1px;
    "
    options={glassOptions}
    {...restProps}
  >
    {@render children()}
  </LiquidGlass>
</div>

<style>
  .glass-card:hover {
    box-shadow:
      0px 2px 10px rgba(0, 0, 0, 0.25) inset,
      0 30px 40px -10px rgba(127, 82, 187, 0.15),
      0 12px 15px -8px rgba(0, 0, 0, 0.2) !important;
  }
</style>
