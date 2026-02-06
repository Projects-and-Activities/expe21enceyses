<script lang="ts">
  let { children } = $props();
</script>

<main
  class="mb-32 space-y-36 overflow-x-hidden not-lg:*:px-4 lg:px-50 [&>section]:container [&>section]:mx-auto"
>
  {@render children()}
</main>
