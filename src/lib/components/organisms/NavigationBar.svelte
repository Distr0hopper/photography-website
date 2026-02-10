<script lang="ts">
	import { page } from '$app/state';

	let navItems = [
		{ name: 'Home', path: '/' },
		{ name: 'Pictures', path: '/pictures' },
		{ name: 'Destinations', path: '/destinations' },
		{ name: 'About', path: '/about' }
	];
</script>

<nav class="flex items-center justify-between bg-neutral-900/80 px-6 py-4 backdrop-blur-sm">
	<div class="flex-1">
		<span class="text-xl font-bold text-white">Joli Blog</span>
	</div>

	<div class="flex space-x-6">
		{#each navItems as item}
			<a
				href={item.path}
				class="transition-colors {page.url.pathname === item.path
					? 'font-semibold text-emerald-400'
					: 'text-white hover:text-emerald-300'}"
			>
				{item.name}
			</a>
		{/each}
	</div>

	<div class="invisible flex-1 md:visible"></div>
</nav>
