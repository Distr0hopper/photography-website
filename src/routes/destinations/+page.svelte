<script lang="ts">
	import TravelCard from '$lib/components/common/TravelCard.svelte';
	const travelDestinations = [
		{
			title: 'Vietnam',
			description:
				'Our travel route through Vietnam, from the bustling cities to the serene countryside.',
			imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800'
		},
		{
			title: 'Marocco',
			description: 'Amazing trip to the north of africa, from old medina to stunning mountains.',
			imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800'
		},
		{
			title: 'Lofoten Island',
			description: 'A roadtrip to the stunning mountains of lofoten island.',
			imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800'
		}
	];

	function slugify(title: string) {
		let slug = title.toLocaleLowerCase();
		slug = slug.replace(/\s/g, '-');
		return slug;
	}
</script>

<div class="container mx-auto flex p-4">
	{#each travelDestinations as destination}
		<TravelCard
			title={destination.title}
			description={destination.description}
			imageUrl={destination.imageUrl}
			showBadge={false}
			redirectUri={slugify(destination.title)}
		/>
	{/each}
</div>
