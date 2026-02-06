<script lang="ts">
	import { fly } from 'svelte/transition';
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

<div class="relative h-screen overflow-hidden">
	{#key activeImage}
		<div
			class="absolute inset-0 h-full w-full"
			in:fly={{ y: '100%', duration: 1000, easing: cubicInOut }}
			out:fly={{ y: '-100%', duration: 1000, easing: cubicInOut }}
		>
			<img src={heroImages[activeImage]} alt="Hero background" class="h-full w-full object-cover" />
		</div>
	{/key}

	<div class="pointer-events-none absolute inset-0 z-10 bg-black/60"></div>

	<div class="relative z-20 flex h-full flex-col items-center justify-center">
		<h1
			class="bg-linear-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-6xl lg:text-7xl"
		>
			Capturing the World
			<br />
			One Journey at a Time
		</h1>
		<p
			class="flex max-w-2xl items-center justify-center py-4 text-center text-lg text-neutral-200 md:text-xl"
		>
			See the adventures through our eyes!
		</p>
		<div class="flex items-center justify-center">
			<a
				href="/pictures"
				class="rounded-full border border-emerald-500/20 bg-emerald-300/10 px-5 py-3 text-center text-white backdrop-blur-sm hover:bg-emerald-300/20"
			>
				Explore Pictures →
			</a>
		</div>
	</div>
</div>
