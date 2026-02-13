<script lang="ts">
  let {
    position = 'top-[0%] left-[0%]',
    size = 'h-[300px] w-[300px]',
    gradient = 'from-[#7410FF] to-[#55059B]',
    blur = 'blur-[130px]',
    lightOpacity = 'opacity-30',
    darkOpacity = 'dark:opacity-50',
    mixBlend = 'mix-blend-multiply',
    desktop = ''
  } = $props();
</script>

<div
  class="absolute rounded-full {position} {size} {lightOpacity} {darkOpacity} {mixBlend} {blur} {desktop}"
  style="background: linear-gradient(135deg, {gradient});"
></div>
