<script lang="ts">
	let { children } = $props();
</script>

<main
	class="space-y-12 overflow-x-hidden overflow-y-hidden not-lg:*:px-4 lg:px-50 [&>section]:container [&>section]:mx-auto"
>
	{@render children()}
</main>
