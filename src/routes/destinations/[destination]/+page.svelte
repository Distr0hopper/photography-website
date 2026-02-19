<script lang="ts">
	import TravelCard from '$lib/components/common/TravelCard.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import type { Destination } from '$lib/api/notion';

	let { data } = $props();

	const destinations = createQuery<Destination[]>(() => ({
		queryKey: ['destinations', data.destination],
		queryFn: () => fetch(`/destinations/${data.destination}`).then((r) => r.json())
	}));
</script>

<div class="container mx-auto flex flex-wrap gap-4 p-4">
	{#if destinations.isPending}
		<p class="text-neutral-400">Loading destinations...</p>
	{:else if destinations.isError}
		<p class="text-red-400">Failed to load destinations.</p>
	{:else if destinations.data.length === 0}
		<p class="text-neutral-400">No data found.</p>
	{:else}
		{#each destinations.data as destination}
			<TravelCard
				title={destination.name}
				description="{destination.nights ? `${destination.nights} nights` : ''}{destination.transport ? ` · ${destination.transport}` : ''}"
				imageUrl="https://images.unsplash.com/photo-1528127269322-539801943592?w=800"
				slug="{data.destination}/{destination.slug}"
			/>
		{/each}
	{/if}
</div>
