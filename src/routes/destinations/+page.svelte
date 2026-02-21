<script lang="ts">
	import TravelCard from '$lib/components/common/TravelCard.svelte';
</script>

<div class="min-h-screen bg-neutral-950">
	<!-- Page header -->
	<div class="border-b border-white/5 px-6 pb-12 pt-16 text-center">
		<p class="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">
			Around the World
		</p>
		<h1 class="text-5xl font-bold tracking-tight text-white md:text-6xl" style="padding-bottom: 0;">
			Our Journeys
		</h1>
		<p class="mx-auto mt-4 max-w-md text-lg text-neutral-400">
			Three destinations. Countless memories.
		</p>
	</div>

	<!-- Magazine grid -->
	<div class="container mx-auto max-w-6xl px-6 py-16">
		<!-- Featured top row: 1 large + 1 normal -->
		<div class="mb-6 grid grid-cols-1 gap-6 md:grid-cols-5">
			<div class="md:col-span-3">
				<TravelCard
					title="Vietnam"
					description="Our travel route through Vietnam, from the bustling cities to the serene countryside."
					imageUrl="https://images.unsplash.com/photo-1528127269322-539801943592?w=900&q=80"
					slug="vietnam"
				/>
			</div>
			<div class="md:col-span-2">
				<TravelCard
					title="Morocco"
					description="Exploring the rich history and vibrant culture of Morocco."
					imageUrl="https://plus.unsplash.com/premium_photo-1673415819362-c2ca640bfafe?q=80&w=800"
					slug="marocco"
				/>
			</div>
		</div>

		<!-- Bottom row: full-width card -->
		<div>
			<TravelCard
				title="Lofoten Islands"
				description="Dramatic peaks, midnight sun, and Nordic wilderness unlike anywhere else on Earth."
				imageUrl="https://plus.unsplash.com/premium_photo-1668017178993-4c8fc9f59872?q=80&w=1200"
				slug="lofoten-islands"
			/>
		</div>
	</div>
</div>
