<script lang="ts">
  let {
    position = 'top-[0%] left-[0%]',
    size = 'h-[300px] w-[300px]',
    gradient = 'from-[#7410FF] to-[#55059B]',
    blur = 'blur-[130px]',
    opacity = 'opacity-50',
    lightOpacity = 'opacity-30',
    mixBlend = 'mix-blend-multiply',
    desktop = '' // Optional desktop overrides like 'lg:top-[5%]'
  } = $props();

  // Build dark-mode opacity by prefixing the caller's opacity with `dark:`
  const darkOpacity = $derived(
    opacity
      .split(' ')
      .map((cls: string) => (cls.startsWith('opacity-') ? `dark:${cls}` : cls))
      .join(' ')
  );
</script>

<div
  class="absolute rounded-full {position} {size} {lightOpacity} {darkOpacity} {mixBlend} {blur} {desktop}"
  style="background: linear-gradient(135deg, {gradient});"
></div>
