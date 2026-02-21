<script lang="ts">
	import { page } from '$app/state';

	let navItems = [
		{ name: 'Home', path: '/' },
		{ name: 'Pictures', path: '/pictures' },
		{ name: 'Destinations', path: '/destinations' },
		{ name: 'About', path: '/about' }
	];
</script>

<nav
	class="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between px-6 bg-neutral-950/80 backdrop-blur-xl border-b border-white/5"
>
	<div class="flex-1">
		<a
			href="/"
			class="group flex items-center gap-2.5 text-white no-underline"
			style="color: inherit;"
		>
			<div
				class="flex size-8 items-center justify-center rounded-lg bg-emerald-500/10 ring-1 ring-emerald-500/20"
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
					stroke-linejoin="round"
					class="text-emerald-400"
				>
					<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
					<circle cx="12" cy="10" r="3" />
				</svg>
			</div>
			<span
				class="text-base font-bold tracking-tight text-white transition-colors group-hover:text-emerald-300"
				>Joli Blog</span
			>
		</a>
	</div>

	<div class="flex items-center gap-1">
		{#each navItems as item}
			<a
				href={item.path}
				class="relative rounded-lg px-4 py-2 text-sm font-medium transition-all no-underline {page.url
					.pathname === item.path
					? 'text-emerald-400 bg-emerald-400/10'
					: 'text-neutral-400 hover:text-white hover:bg-white/5'}"
				style="text-decoration: none;"
			>
				{item.name}
			</a>
		{/each}
	</div>

	<div class="flex-1"></div>
</nav>
