<script lang="ts">
	interface Props {
		title: string;
		description: string;
		imageUrl: string;
		slug?: string;
	}

	let { title, description, imageUrl, slug }: Props = $props();
</script>

<a
	href="/destinations/{slug ?? title.toLowerCase()}"
	class="group relative block overflow-hidden rounded-2xl w-full"
	style="text-decoration: none;"
>
	<div class="aspect-4/3 overflow-hidden">
		<img
			src={imageUrl ?? 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'}
			alt={title}
			class="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
		/>
	</div>

	<!-- Gradient overlay -->
	<div
		class="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300"
	></div>

	<!-- Top label -->
	<div class="absolute top-4 left-4">
		<span
			class="inline-flex items-center rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
		>
			Destination
		</span>
	</div>

	<!-- Card content -->
	<div class="absolute bottom-0 left-0 right-0 p-5">
		<h3 class="text-xl font-bold tracking-tight text-white">{title}</h3>
		{#if description}
			<p class="mt-1 line-clamp-2 text-sm leading-relaxed text-neutral-300">{description}</p>
		{/if}
		<div
			class="mt-3 flex items-center gap-1.5 text-sm font-semibold text-emerald-400"
		>
			Explore
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="14"
				height="14"
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
		</div>
	</div>
</a>
