<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import type { Destination, NotionBlock } from '$lib/api/notion';

	let { data } = $props();

	const query = createQuery<{ destination: Destination; content: NotionBlock[] }>(() => ({
		queryKey: ['destination', data.destination, data.slug],
		queryFn: () => fetch(`/api/destinations/${data.destination}/${data.slug}`).then((r) => r.json())
	}));
</script>

{#if query.isPending}
	<div class="flex h-screen items-center justify-center">
		<p class="text-neutral-400">Loading...</p>
	</div>
{:else if query.isError}
	<div class="flex h-screen items-center justify-center">
		<p class="text-red-400">Failed to load destination.</p>
	</div>
{:else}
	{@const destination = query.data.destination}
	{@const content = query.data.content}

	<div class="container mx-auto max-w-3xl px-4 py-12">
		<header class="mb-8">
			<h1 class="text-4xl font-bold">{destination.name}</h1>

			<div class="mt-4 flex flex-wrap gap-4 text-sm text-neutral-400">
				{#if destination.startDate}
					<span>
						{new Date(destination.startDate).toLocaleDateString('de-DE', {
							day: 'numeric',
							month: 'long',
							year: 'numeric'
						})}
					</span>
				{/if}
				{#if destination.nights}
					<span>{destination.nights} nights</span>
				{/if}
				{#if destination.transport}
					<span>{destination.transport}</span>
				{/if}
			</div>

			{#if destination.departure}
				<p class="mt-2 text-neutral-300">{destination.departure}</p>
			{/if}
		</header>

		{#if content.length > 0}
			<div class="prose prose-invert max-w-none">
				{#each content as block}
					{#if block.type === 'heading_1'}
						<h1>{block.text}</h1>
					{:else if block.type === 'heading_2'}
						<h2>{block.text}</h2>
					{:else if block.type === 'heading_3'}
						<h3>{block.text}</h3>
					{:else if block.type === 'paragraph'}
						<p>{block.text}</p>
					{:else if block.type === 'quote' || block.type === 'callout'}
						<blockquote>{block.text}</blockquote>
					{:else if block.type === 'bulleted_list_item'}
						<ul><li>{block.text}</li></ul>
					{:else if block.type === 'numbered_list_item'}
						<ol><li>{block.text}</li></ol>
					{:else if block.type === 'image' && block.url}
						<figure>
							<img src={block.url} alt={block.text || 'Image'} class="rounded-lg" />
							{#if block.text}
								<figcaption class="text-center text-sm text-neutral-400">{block.text}</figcaption>
							{/if}
						</figure>
					{:else if block.type === 'code'}
						<pre><code>{block.text}</code></pre>
					{:else if block.type === 'divider'}
						<hr />
					{/if}
				{/each}
			</div>
		{:else}
			<p class="text-neutral-500">No content yet.</p>
		{/if}
	</div>
{/if}
