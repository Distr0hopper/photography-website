<script lang="ts">
	import { page } from '$app/state';
	import TravelCard from '$lib/components/common/TravelCard.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	let { data } = $props();
	$inspect(data.notionData);
	let pageId = page.params.destination;
</script>

<div>Visiting subpage of {pageId}</div>
<div class="grid grid-cols-5 gap-5">
	{#if data.destination == 'vietnam'}
		{#each data.notionData as location}
			<TravelCard
				title="Platzhalter"
				description="Platzhalter"
				imageUrl={location.cover?.external?.url}
				redirectUri={'title'}
			></TravelCard>
		{/each}
	{:else if data.destination == 'marocco'}
		<Button>Fez</Button>
	{/if}
</div>
