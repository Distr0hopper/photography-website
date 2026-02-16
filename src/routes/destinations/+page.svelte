<script lang="ts">
	import TravelCard from '$lib/components/common/TravelCard.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import type { Destination } from '$lib/api/notion';

	const destinations = createQuery<Destination[]>(() => ({
		queryKey: ['destinations'],
		queryFn: () => fetch('/api/destinations').then((r) => r.json())
	}));
</script>

<div class="container mx-auto flex flex-wrap gap-4 p-4">
	{#if destinations.isPending}
		<p class="text-neutral-400">Loading destinations...</p>
	{:else if destinations.isError}
		<p class="text-red-400">Failed to load destinations.</p>
	{:else if destinations.data.length === 0}
		<p class="text-neutral-400">No destinations found.</p>
	{:else}
		{#each destinations.data as destination}
			<TravelCard
				title={destination.name}
				description="{destination.nights ? `${destination.nights} nights` : ''}{destination.transport ? ` · ${destination.transport}` : ''}"
				imageUrl="https://images.unsplash.com/photo-1528127269322-539801943592?w=800"
				slug={destination.slug}
			/>
		{/each}
	{/if}
</div>
