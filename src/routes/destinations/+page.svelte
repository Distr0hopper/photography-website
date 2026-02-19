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
		imageUrl="https://plus.unsplash.com/premium_photo-1673415819362-c2ca640bfafe?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=800"
		slug="marocco"
	/>

	<TravelCard
		title="Lofoten Islands"
		description="A journey through Japan's blend of tradition and modernity, from Tokyo to Kyoto."
		imageUrl="https://plus.unsplash.com/premium_photo-1668017178993-4c8fc9f59872?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=800"
		slug="lofoten-islands"
	/>
</div>

<!-- Only 3 TravelCards in a Row! -->
