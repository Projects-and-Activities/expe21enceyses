<script lang="ts">
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
</script>

<div class="mx-auto max-w-2xl animate-pulse space-y-8 p-6">
	<div class="space-y-2">
		<Skeleton class="h-8 w-1/3 bg-zinc-200 dark:bg-zinc-800" />
		<Skeleton class="h-4 w-2/3 bg-zinc-100 dark:bg-zinc-800/50" />
	</div>

	<div class="space-y-6">
		<div class="space-y-3">
			<Skeleton class="h-4 w-24 bg-zinc-100 dark:bg-zinc-800/50" />
			<Skeleton class="h-12 w-full rounded-xl bg-zinc-200 dark:bg-zinc-800" />
		</div>

		<div class="space-y-3">
			<Skeleton class="h-4 w-32 bg-zinc-100 dark:bg-zinc-800/50" />
			<Skeleton class="h-12 w-full rounded-xl bg-zinc-200 dark:bg-zinc-800" />
		</div>

		<div class="space-y-3">
			<Skeleton class="h-4 w-20 bg-zinc-100 dark:bg-zinc-800/50" />
			<Skeleton class="h-12 w-full rounded-xl bg-zinc-200 dark:bg-zinc-800" />
		</div>
	</div>

	<div class="flex justify-end pt-4">
		<Skeleton class="h-10 w-24 rounded-md bg-zinc-200 dark:bg-zinc-800" />
	</div>
</div>
