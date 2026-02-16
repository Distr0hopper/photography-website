<script lang="ts">
	import TravelCard from '$lib/components/common/TravelCard.svelte';
</script>

<div class="container mx-auto flex p-4">
	<TravelCard
		title="Vietnam"
		description="Our travel route through Vietnam, from the bustling cities to the serene countryside."
		imageUrl="https://images.unsplash.com/photo-1528127269322-539801943592?w=800"
		slug="vietnam"
	/>

	<TravelCard
		title="Marocco"
		description="Exploring the rich history  and vibrant culture of Marocco, from Rome to Venice."
		imageUrl="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800"
		slug="marocco"
	/>

	<TravelCard
		title="Lofoten Islands"
		description="A journey through Japan's blend of tradition and modernity, from Tokyo to Kyoto."
		imageUrl="https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=800"
		slug="lofoten-islands"
	/>
</div>

<!-- Only 3 TravelCards in a Row! -->
