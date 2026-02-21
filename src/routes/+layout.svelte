<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import NavigationBar from '$lib/components/organisms/NavigationBar.svelte';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { page } from '$app/state';

	let { data, children } = $props();

	let isHome = $derived(page.url.pathname === '/');
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<QueryClientProvider client={data.queryClient}>
	<div data-sveltekit-preload-data="hover">
		<NavigationBar />
		<main class={isHome ? '' : 'pt-16'}>
			{@render children()}
		</main>
	</div>
</QueryClientProvider>
