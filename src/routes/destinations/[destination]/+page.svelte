<script lang="ts">
	import { page } from '$app/state';
	import Button from '$lib/components/ui/button/button.svelte';
	let pageId = page.params.destination;
</script>

<div>Visiting subpage of {pageId}</div>
{#if pageId == 'vietnam'}
	<Button href={page.url.pathname + '/ho-chi-minh'}>Ho Chi Minh</Button>
	<Button href={page.url.pathname + '/can-tho'}>Can Tho</Button>
{:else if pageId == 'marocco'}
	<Button>Fez</Button>
{/if}
