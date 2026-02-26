<script lang="ts">
	import { page } from '$app/state';
	import TravelCard from '$lib/components/common/TravelCard.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	let { data } = $props();
	$inspect(data.locations);
	let pageId = page.params.destination;
</script>

<div class="flex items-center justify-center p-3">Visiting subpage of {pageId}</div>
<div class="grid grid-cols-4 gap-5">
	{#if data.destination == 'vietnam'}
		{#each data.locations as location}
			<TravelCard
				title={location.title}
				description="Platzhalter"
				imageUrl={location.imageUrl}
				redirectUri={location.slug}
			></TravelCard>
		{/each}
	{:else if data.destination == 'marocco'}
		<Button>Fez</Button>
	{/if}
</div>
