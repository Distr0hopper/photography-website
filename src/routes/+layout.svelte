<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import NavigationBar from '$lib/components/organisms/NavigationBar.svelte';
	import { QueryClientProvider } from '@tanstack/svelte-query';

	let { data, children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<QueryClientProvider client={data.queryClient}>
	<div data-sveltekit-preload-data="hover">
		<NavigationBar/>
		{@render children()}
	</div>
</QueryClientProvider>
