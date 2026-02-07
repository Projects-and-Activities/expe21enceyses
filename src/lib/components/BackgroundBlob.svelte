<script lang="ts">
  let {
    position = 'top-[0%] left-[0%]',
    size = 'h-[300px] w-[300px]',
    gradient = 'from-[#7410FF] to-[#55059B]',
    blur = 'blur-[130px]',
    opacity = 'opacity-50',
    mixBlend = 'mix-blend-multiply',
    desktop = '' // Optional desktop overrides like 'lg:top-[5%]'
  } = $props();
</script>

<div
  class="absolute rounded-full {position} {size} {opacity} {mixBlend} {blur} {desktop}"
  style="background: linear-gradient(135deg, {gradient});"
></div>
