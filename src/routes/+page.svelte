<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { cubicInOut } from 'svelte/easing';

	const heroImages = [
		'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop',
		'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2942&auto=format&fit=crop',
		'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2944&auto=format&fit=crop'
	];

	let activeImage = $state(0);

	onMount(() => {
		const interval = setInterval(() => {
			activeImage = (activeImage + 1) % heroImages.length;
		}, 5000);

		return () => clearInterval(interval);
	});
</script>

<div class="relative h-screen overflow-hidden bg-neutral-950">
	{#key activeImage}
		<div
			class="absolute inset-0 h-full w-full"
			in:fly={{ y: '100%', duration: 1000, easing: cubicInOut }}
			out:fly={{ y: '-100%', duration: 1000, easing: cubicInOut }}
		>
			<img src={heroImages[activeImage]} alt="Hero background" class="h-full w-full object-cover" />
		</div>
	{/key}

	<!-- Multi-layer gradient overlay for depth -->
	<div class="pointer-events-none absolute inset-0 z-10 bg-linear-to-b from-black/40 via-black/30 to-black/85"></div>
	<div class="pointer-events-none absolute inset-0 z-10 bg-linear-to-r from-black/20 via-transparent to-black/20"></div>

	<!-- Main content -->
	<div class="relative z-20 flex h-full flex-col items-center justify-center px-6" in:fade={{ duration: 800, delay: 200 }}>
		<p class="mb-5 text-center text-xs font-semibold tracking-[0.35em] uppercase text-emerald-400">
			Travel Photography
		</p>

		<div class="text-center text-5xl font-bold leading-tight tracking-tight text-transparent md:text-7xl lg:text-8xl"
			style="background: linear-gradient(to bottom, #fff 0%, #a3a3a3 100%); -webkit-background-clip: text; background-clip: text;"
		>
			Capturing the World<br />
			<span class="text-4xl font-semibold md:text-6xl lg:text-7xl">One Journey at a Time</span>
		</div>

		<p class="mx-auto mt-6 max-w-lg text-center text-base leading-relaxed text-neutral-300 md:text-lg">
			Raw moments. Authentic places. Unfiltered stories from around the globe.
		</p>

		<div class="mt-10 flex flex-col items-center gap-4 sm:flex-row">
			<a
				href="/destinations"
				class="group inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-3.5 text-sm font-semibold text-black transition-all hover:bg-emerald-400 hover:shadow-[0_0_40px_rgba(52,211,153,0.35)]"
				style="text-decoration: none;"
			>
				Explore Destinations
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="15"
					height="15"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="transition-transform duration-300 group-hover:translate-x-1"
				>
					<path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
				</svg>
			</a>
			<a
				href="/pictures"
				class="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/5"
				style="text-decoration: none;"
			>
				Browse Photos
			</a>
		</div>
	</div>

	<!-- Image indicator dots -->
	<div class="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
		{#each heroImages as _, i}
			<button
				onclick={() => (activeImage = i)}
				class="h-1.5 rounded-full transition-all duration-500 {activeImage === i
					? 'w-8 bg-emerald-400'
					: 'w-1.5 bg-white/30 hover:bg-white/50'}"
				aria-label="Go to slide {i + 1}"
			></button>
		{/each}
	</div>

	<!-- Scroll hint -->
	<div class="absolute bottom-10 right-8 z-20 hidden items-center gap-2 text-xs tracking-widest text-neutral-500 md:flex">
		<span>SCROLL</span>
		<div class="h-6 w-px bg-neutral-600"></div>
	</div>
</div>
