<script lang="ts">
	import TravelCard from '$lib/components/common/TravelCard.svelte';
	import MapView from '$lib/components/common/MapView.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import type { Destination } from '$lib/api/notion';

	let { data } = $props();

	const destinationMeta: Record<string, { name: string; heroImage: string; tagline: string }> = {
		vietnam: {
			name: 'Vietnam',
			heroImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=1600&q=80',
			tagline: 'From bustling cities to serene countryside'
		},
		marocco: {
			name: 'Morocco',
			heroImage: 'https://plus.unsplash.com/premium_photo-1673415819362-c2ca640bfafe?q=80&w=1600',
			tagline: 'Vibrant colors, ancient medinas, endless culture'
		},
		'lofoten-islands': {
			name: 'Lofoten Islands',
			heroImage: 'https://plus.unsplash.com/premium_photo-1668017178993-4c8fc9f59872?q=80&w=1600',
			tagline: 'Dramatic peaks, midnight sun, Nordic wilderness'
		}
	};

	const meta = $derived(
		destinationMeta[data.destination] ?? {
			name: data.destination,
			heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80',
			tagline: 'Explore this destination'
		}
	);

	const destinations = createQuery<Destination[]>(() => ({
		queryKey: ['destinations', data.destination],
		queryFn: () => fetch(`/destinations/${data.destination}`).then((r) => r.json())
	}));

	// View toggle
	type View = 'list' | 'map';
	let activeView = $state<View>('list');

	// Carousel state
	let scrollContainer = $state<HTMLElement | null>(null);
	let canScrollLeft = $state(false);
	let canScrollRight = $state(true);

	const CARD_WIDTH = 456; // px — w-110 (440) + gap-4 (16)

	function scroll(dir: 'left' | 'right') {
		scrollContainer?.scrollBy({
			left: dir === 'right' ? CARD_WIDTH * 2 : -CARD_WIDTH * 2,
			behavior: 'smooth'
		});
	}

	function onScroll() {
		if (!scrollContainer) return;
		canScrollLeft = scrollContainer.scrollLeft > 4;
		canScrollRight =
			scrollContainer.scrollLeft < scrollContainer.scrollWidth - scrollContainer.clientWidth - 4;
	}
</script>

<!-- Hero banner -->
<div class="relative h-50 md:h-45">
	<img src={meta.heroImage} alt={meta.name} class="h-full w-full object-cover" />
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
		<h1 class="text-5xl font-bold tracking-tight text-white md:text-6xl" style="padding-bottom: 0;">
			{meta.name}
		</h1>
		<p class="mt-3 text-base text-neutral-300 md:text-lg">{meta.tagline}</p>
	</div>
</div>

<!-- Content section -->
<div class="min-h-screen bg-neutral-950 py-16">
	{#if destinations.isPending}
		<div class="flex gap-4 overflow-hidden px-6 md:px-12">
			{#each Array(4) as _}
				<div class="w-72 shrink-0">
					<div class="aspect-3/4 animate-pulse rounded-2xl bg-neutral-800"></div>
				</div>
			{/each}
		</div>
	{:else if destinations.isError}
		<div class="px-6 py-16 text-center">
			<p class="text-red-400">Failed to load destinations.</p>
		</div>
	{:else if destinations.data.length === 0}
		<div class="px-6 py-16 text-center">
			<p class="text-neutral-400">No stops found for this destination.</p>
		</div>
	{:else}
		<!-- Header row: stop count + view toggle + carousel nav -->
		<div class="mb-8 flex items-center justify-between px-6 md:px-12">
			<div class="flex items-center gap-3">
				<h2 class="text-lg font-semibold text-white" style="padding-bottom: 0;">
					{destinations.data.length}
					{destinations.data.length === 1 ? 'Stop' : 'Stops'}
				</h2>
				{#if activeView === 'list'}
					<span class="text-sm text-neutral-600">— scroll to explore</span>
				{/if}
			</div>

			<div class="flex items-center gap-3">
				<!-- View toggle pill -->
				<div class="flex rounded-full border border-white/10 bg-white/5 p-1">
					<button
						onclick={() => (activeView = 'list')}
						class="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all {activeView ===
						'list'
							? 'bg-white/10 text-white'
							: 'text-neutral-500 hover:text-neutral-300'}"
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
						>
							<rect width="7" height="7" x="3" y="3" rx="1" /><rect
								width="7"
								height="7"
								x="14"
								y="3"
								rx="1"
							/><rect width="7" height="7" x="14" y="14" rx="1" /><rect
								width="7"
								height="7"
								x="3"
								y="14"
								rx="1"
							/>
						</svg>
						List
					</button>
					<button
						onclick={() => (activeView = 'map')}
						class="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all {activeView ===
						'map'
							? 'bg-white/10 text-white'
							: 'text-neutral-500 hover:text-neutral-300'}"
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
						>
							<polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" /><line
								x1="9"
								x2="9"
								y1="3"
								y2="18"
							/><line x1="15" x2="15" y1="6" y2="21" />
						</svg>
						Map
					</button>
				</div>

				<!-- Carousel nav (only shown in list view) -->
				{#if activeView === 'list'}
					<div class="flex gap-2">
						<button
							onclick={() => scroll('left')}
							disabled={!canScrollLeft}
							class="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:border-white/20 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
							aria-label="Scroll left"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"><path d="m15 18-6-6 6-6" /></svg
							>
						</button>
						<button
							onclick={() => scroll('right')}
							disabled={!canScrollRight}
							class="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:border-white/20 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
							aria-label="Scroll right"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg
							>
						</button>
					</div>
				{/if}
			</div>
		</div>

		<!-- List view: carousel -->
		{#if activeView === 'list'}
			<div class="relative">
				<div
					class="pointer-events-none absolute top-0 right-0 z-10 h-full w-24 bg-linear-to-l from-neutral-950 to-transparent"
				></div>
				<div
					bind:this={scrollContainer}
					onscroll={onScroll}
					class="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:px-12"
					style="scrollbar-width: none; -webkit-overflow-scrolling: touch;"
				>
					{#each destinations.data as destination}
						<div class="w-[78vw] shrink-0 snap-start sm:w-96 lg:w-110">
							<TravelCard
								title={destination.name}
								description="{destination.nights
									? `${destination.nights} nights`
									: ''}{destination.transport ? ` · ${destination.transport}` : ''}"
								imageUrl={meta.heroImage}
								slug="{data.destination}/{destination.slug}"
								aspectRatio="aspect-4/4"
							/>
						</div>
					{/each}
					<div class="w-16 shrink-0"></div>
				</div>
			</div>

			<!-- Map view -->
		{:else}
			<div class="px-6 md:px-12">
				<MapView destinations={destinations.data} destinationBase={data.destination} />
			</div>
		{/if}
	{/if}
</div>
