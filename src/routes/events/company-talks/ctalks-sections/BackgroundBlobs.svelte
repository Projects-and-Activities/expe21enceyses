<script lang="ts">
  import Blob from '$lib/components/BackgroundBlob.svelte';
</script>

<div class="pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-hidden">
  <Blob
    position="top-[0%] -left-[17%]"
    size="h-[340px] w-[300px]"
    opacity="opacity-50"
    blur="blur-[130px]"
    gradient="#7410FF, #55059B"
    desktop="lg:top-[5%] lg:-left-[24%] lg:h-[200px] lg:w-[500px] lg:opacity-100 lg:blur-[120px]"
  />

  <Blob
    position="top-[4%] right-[15%]"
    size="h-[400px] w-[300px]"
    opacity="opacity-40"
    mixBlend="mix-blend-overlay"
    blur="blur-[80px]"
    gradient="#AB3550 0%, #7410FF 100%"
    desktop="lg:top-[2%] lg:right-[37%] lg:h-[800px] lg:w-[300px] lg:opacity-60 lg:blur-[300px]"
  />

  <Blob
    position="top-[15%] -right-[50%]"
    size="h-[180px] w-[500px]"
    blur="blur-[230px]"
    gradient="#7410FF, #55059B"
    desktop="lg:top-[10%] lg:-right-[18%] lg:h-[300px] lg:w-[400px] lg:blur-[150px]"
  />

  <Blob
    position="top-[58%] -right-[30%]"
    size="h-[400px] w-[200px]"
    blur="blur-[150px]"
    gradient="#7410FF, #55059B"
    desktop="lg:top-[25%] lg:-left-[5%] lg:h-[500px] lg:w-[400px] lg:blur-[300px]"
  />

  <Blob
    position="top-[25%] right-[10%] xs:hidden"
    size="h-[450px] w-[350px]"
    opacity="opacity-50"
    mixBlend="mix-blend-overlay"
    blur="blur-[150px]"
    gradient="#AB3550 0%, #7410FF 100%"
    desktop="lg:top-[40%] lg:-right-[15%] lg:h-[600px] lg:w-[500px] lg:opacity-60 lg:blur-[200px]"
  />

  <Blob
    position="top-[37%] right-[10%]"
    size="h-[350px] w-[350px]"
    opacity="opacity-50"
    mixBlend="mix-blend-overlay"
    blur="blur-[150px]"
    gradient="#AB3550 0%, #7410FF 100%"
    desktop="lg:top-[40%] lg:-right-[15%] lg:h-[600px] lg:w-[500px] lg:opacity-60 lg:blur-[200px]"
  />

  <Blob
    position="top-[100%] -right-[5%]"
    size="h-[0px] w-[0px]"
    blur="blur-[100px]"
    gradient="#7410FF, #55059B"
    desktop="lg:top-[55%] lg:-right-[0%] lg:h-[400px] lg:w-[400px] lg:blur-[300px]"
  />

  <Blob
    position="top-[50%] left-[5%]"
    size="h-[450px] w-[250px]"
    opacity="opacity-50"
    mixBlend="mix-blend-overlay"
    blur="blur-[140px]"
    gradient="#AB3550 0%, #7410FF 100%"
    desktop="lg:-left-[10%] lg:h-[500px] lg:w-[500px] lg:opacity-60 lg:blur-[200px]"
  />

  <Blob
    position="top-[80%] -right-[5%]"
    size="h-[0px] w-[0px]"
    blur="blur-[80px]"
    gradient="#7410FF, #55059B"
    desktop="lg:top-[82%] lg:-left-[7%] lg:h-[300px] lg:w-[400px] lg:blur-[200px]"
  />

  <Blob
    position="top-[70%] right-[5%]"
    size="h-[1200px] w-[300px]"
    opacity="opacity-50"
    mixBlend="mix-blend-overlay"
    blur="blur-[200px]"
    gradient="#AB3550 0%, #7410FF 100%"
    desktop="lg:top-[84%] lg:right-[8%] lg:h-[400px] lg:w-[600px] lg:opacity-60 lg:blur-[200px]"
  />
</div>
