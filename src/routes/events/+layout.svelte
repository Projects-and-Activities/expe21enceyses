<script lang="ts">
  let { children } = $props();
</script>

<main
  class="relative w-full space-y-48 overflow-x-hidden not-lg:*:px-4 lg:px-50 [&>section]:container [&>section]:mx-auto"
>
  {@render children()}
</main>
