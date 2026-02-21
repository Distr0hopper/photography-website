<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import type { Destination, NotionBlock } from '$lib/api/notion';

	let { data } = $props();

	const query = createQuery<{ destination: Destination; content: NotionBlock[] }>(() => ({
		queryKey: ['destination', data.destination, data.slug],
		queryFn: () => fetch(`/destinations/${data.destination}/${data.slug}`).then((r) => r.json())
	}));

	const destinationNames: Record<string, string> = {
		vietnam: 'Vietnam',
		marocco: 'Morocco',
		'lofoten-islands': 'Lofoten Islands'
	};
</script>

{#if query.isPending}
	<div class="flex h-screen items-center justify-center bg-neutral-950">
		<div class="flex flex-col items-center gap-4">
			<div
				class="size-7 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent"
			></div>
			<p class="text-sm text-neutral-500">Loading...</p>
		</div>
	</div>
{:else if query.isError}
	<div class="flex h-screen items-center justify-center bg-neutral-950">
		<p class="text-red-400">Failed to load destination.</p>
	</div>
{:else}
	{@const destination = query.data.destination}
	{@const content = query.data.content}

	<div class="min-h-screen bg-neutral-950">
		<!-- Article header -->
		<div class="border-b border-white/5 bg-neutral-900/40">
			<div class="container mx-auto max-w-3xl px-6 py-10">
				<!-- Breadcrumb -->
				<nav class="mb-7 flex items-center gap-2 text-sm text-neutral-600">
					<a
						href="/destinations"
						class="text-neutral-500 transition-colors hover:text-neutral-300"
						style="text-decoration: none;"
					>
						Destinations
					</a>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="12"
						height="12"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="m9 18 6-6-6-6" />
					</svg>
					<a
						href="/destinations/{data.destination}"
						class="text-neutral-500 transition-colors hover:text-neutral-300"
						style="text-decoration: none;"
					>
						{destinationNames[data.destination] ?? data.destination}
					</a>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="12"
						height="12"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="m9 18 6-6-6-6" />
					</svg>
					<span class="text-neutral-300">{destination.name}</span>
				</nav>

				<h1
					class="text-4xl font-bold tracking-tight text-white md:text-5xl"
					style="padding-bottom: 0;"
				>
					{destination.name}
				</h1>

				<!-- Meta badges -->
				<div class="mt-6 flex flex-wrap gap-2.5">
					{#if destination.startDate}
						<div
							class="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-300"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="13"
								height="13"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="text-emerald-400"
							>
								<rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line
									x1="16"
									x2="16"
									y1="2"
									y2="6"
								/><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" />
							</svg>
							{new Date(destination.startDate).toLocaleDateString('de-DE', {
								day: 'numeric',
								month: 'long',
								year: 'numeric'
							})}
						</div>
					{/if}

					{#if destination.nights}
						<div
							class="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-300"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="13"
								height="13"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="text-emerald-400"
							>
								<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
							</svg>
							{destination.nights}
							{destination.nights === 1 ? 'night' : 'nights'}
						</div>
					{/if}

					{#if destination.transport}
						<div
							class="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-300"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="13"
								height="13"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="text-emerald-400"
							>
								<path d="M12 22V12" /><path
									d="M5 12H2a10 10 0 0 0 20 0h-3"
								/><circle cx="12" cy="5" r="3" /><path d="M6.2 10.2A10 10 0 0 0 12 12" /><path
									d="M17.8 10.2A10 10 0 0 1 12 12"
								/>
							</svg>
							{destination.transport}
						</div>
					{/if}
				</div>

				{#if destination.departure}
					<p class="mt-4 text-sm text-neutral-500">{destination.departure}</p>
				{/if}
			</div>
		</div>

		<!-- Article body -->
		<div class="container mx-auto max-w-3xl px-6 py-12">
			{#if content.length > 0}
				<div
					class="prose prose-invert prose-emerald max-w-none
					prose-headings:tracking-tight prose-headings:text-white
					prose-p:text-neutral-300 prose-p:leading-8
					prose-img:rounded-2xl prose-img:shadow-2xl
					prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:text-emerald-300
					prose-blockquote:border-l-emerald-500 prose-blockquote:text-neutral-400 prose-blockquote:not-italic
					prose-code:rounded prose-code:bg-neutral-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-emerald-300 prose-code:before:content-none prose-code:after:content-none
					prose-pre:rounded-xl prose-pre:border prose-pre:border-white/5 prose-pre:bg-neutral-900
					prose-hr:border-white/10
					prose-strong:text-white"
				>
					{#each content as block}
						{#if block.type === 'heading_1'}
							<h1>{@html block.text}</h1>
						{:else if block.type === 'heading_2'}
							<h2>{@html block.text}</h2>
						{:else if block.type === 'heading_3'}
							<h3>{@html block.text}</h3>
						{:else if block.type === 'paragraph'}
							<p>{@html block.text}</p>
						{:else if block.type === 'quote' || block.type === 'callout'}
							<blockquote>{@html block.text}</blockquote>
						{:else if block.type === 'bulleted_list_item'}
							<ul><li>{@html block.text}</li></ul>
						{:else if block.type === 'numbered_list_item'}
							<ol><li>{@html block.text}</li></ol>
						{:else if block.type === 'image' && block.url}
							<figure>
								<img src={block.url} alt={block.text || 'Image'} />
								{#if block.text}
									<figcaption class="text-center text-sm text-neutral-500">
										{@html block.text}
									</figcaption>
								{/if}
							</figure>
						{:else if block.type === 'bookmark' && block.url}
							<a
								href={block.url}
								target="_blank"
								rel="noopener noreferrer"
								class="not-prose flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm transition-colors hover:border-white/20 hover:bg-white/8"
								style="text-decoration: none;"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="15"
									height="15"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="shrink-0 text-emerald-400"
								>
									<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path
										d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
									/>
								</svg>
								<span class="text-neutral-300">{@html block.text}</span>
							</a>
						{:else if block.type === 'code'}
							<pre><code>{@html block.text}</code></pre>
						{:else if block.type === 'divider'}
							<hr />
						{/if}
					{/each}
				</div>
			{:else}
				<div class="py-16 text-center">
					<p class="text-neutral-500">No content yet.</p>
				</div>
			{/if}

			<!-- Back nav -->
			<div class="mt-16 border-t border-white/5 pt-8">
				<a
					href="/destinations/{data.destination}"
					class="inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-white"
					style="text-decoration: none;"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="15"
						height="15"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="m15 18-6-6 6-6" />
					</svg>
					Back to {destinationNames[data.destination] ?? data.destination}
				</a>
			</div>
		</div>
	</div>
{/if}
