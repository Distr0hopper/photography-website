<script lang="ts">
	import TravelCard from '$lib/components/common/TravelCard.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import type { Destination } from '$lib/api/notion';

	let { data } = $props();

	const destinationMeta: Record<string, { name: string; heroImage: string; tagline: string }> = {
		vietnam: {
			name: 'Vietnam',
			heroImage:
				'https://images.unsplash.com/photo-1528127269322-539801943592?w=1600&q=80',
			tagline: 'From bustling cities to serene countryside'
		},
		marocco: {
			name: 'Morocco',
			heroImage:
				'https://plus.unsplash.com/premium_photo-1673415819362-c2ca640bfafe?q=80&w=1600',
			tagline: 'Vibrant colors, ancient medinas, endless culture'
		},
		'lofoten-islands': {
			name: 'Lofoten Islands',
			heroImage:
				'https://plus.unsplash.com/premium_photo-1668017178993-4c8fc9f59872?q=80&w=1600',
			tagline: 'Dramatic peaks, midnight sun, Nordic wilderness'
		}
	};

	const meta = $derived(
		destinationMeta[data.destination] ?? {
			name: data.destination,
			heroImage:
				'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80',
			tagline: 'Explore this destination'
		}
	);

	const destinations = createQuery<Destination[]>(() => ({
		queryKey: ['destinations', data.destination],
		queryFn: () => fetch(`/destinations/${data.destination}`).then((r) => r.json())
	}));
</script>

<!-- Hero banner -->
<div class="relative h-72 overflow-hidden md:h-96">
	<img
		src={meta.heroImage}
		alt={meta.name}
		class="h-full w-full object-cover"
	/>
	<div class="absolute inset-0 bg-linear-to-b from-black/20 via-black/40 to-black/85"></div>

	<div class="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
		<a
			href="/destinations"
			class="mb-5 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/30 px-3 py-1.5 text-xs font-medium text-neutral-300 backdrop-blur-sm transition-colors hover:text-white"
			style="text-decoration: none;"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="12"
				height="12"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="m15 18-6-6 6-6" />
			</svg>
			All Destinations
		</a>
		<h1
			class="text-5xl font-bold tracking-tight text-white md:text-6xl"
			style="padding-bottom: 0;"
		>
			{meta.name}
		</h1>
		<p class="mt-3 text-base text-neutral-300 md:text-lg">{meta.tagline}</p>
	</div>
</div>

<!-- Cities content -->
<div class="min-h-screen bg-neutral-950">
	<div class="container mx-auto max-w-6xl px-6 py-16">
		{#if destinations.isPending}
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each Array(3) as _}
					<div class="aspect-4/3 animate-pulse rounded-2xl bg-neutral-800"></div>
				{/each}
			</div>
		{:else if destinations.isError}
			<div class="flex flex-col items-center gap-2 py-16 text-center">
				<p class="text-red-400">Failed to load destinations.</p>
			</div>
		{:else if destinations.data.length === 0}
			<div class="flex flex-col items-center gap-2 py-16 text-center">
				<p class="text-neutral-400">No stops found for this destination.</p>
			</div>
		{:else}
			<div class="mb-8 flex items-center gap-3">
				<span class="text-sm font-medium text-neutral-500">
					{destinations.data.length}
					{destinations.data.length === 1 ? 'stop' : 'stops'}
				</span>
				<div class="h-px flex-1 bg-white/5"></div>
			</div>
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each destinations.data as destination}
					<TravelCard
						title={destination.name}
						description="{destination.nights
							? `${destination.nights} nights`
							: ''}{destination.transport ? ` · ${destination.transport}` : ''}"
						imageUrl={meta.heroImage}
						slug="{data.destination}/{destination.slug}"
					/>
				{/each}
			</div>
		{/if}
	</div>
</div>
