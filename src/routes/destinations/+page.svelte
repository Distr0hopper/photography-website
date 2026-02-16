<script lang="ts">
	import TravelCard from '$lib/components/common/TravelCard.svelte';

	let { data } = $props();
</script>

<div class="container mx-auto flex flex-wrap gap-4 p-4">
	{#each data.destinations as destination}
		<TravelCard
			title={destination.name}
			description="{destination.nights ? `${destination.nights} nights` : ''}{destination.transport ? ` · ${destination.transport}` : ''}"
			imageUrl="https://images.unsplash.com/photo-1528127269322-539801943592?w=800"
			slug={destination.slug}
		/>
	{:else}
		<p class="text-neutral-400">No destinations found.</p>
	{/each}
</div>
