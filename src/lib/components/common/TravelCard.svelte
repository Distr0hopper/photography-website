<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import CardFooter from '../ui/card/card-footer.svelte';
	import CardHeader from '../ui/card/card-header.svelte';
	import CardAction from '../ui/card/card-action.svelte';
	import CardTitle from '../ui/card/card-title.svelte';
	import CardDescription from '../ui/card/card-description.svelte';

	interface Props {
		title: string;
		description: string;
		imageUrl: string;
		slug?: string;
	}

	let { title, description, imageUrl, slug }: Props = $props();
</script>

<Card.Root class="relative mx-auto w-full max-w-sm pt-0">
	<div class="absolute inset-0 z-30 aspect-video bg-black/35"></div>
	<img
		src={imageUrl ?? 'https://avatar.vercel.sh/shadcn1'}
		alt="Travel destination"
		class="relative z-20 aspect-video w-full object-cover brightness-95 dark:brightness-95"
	/>
	<CardHeader>
		<CardAction></CardAction>
		<CardTitle>{title}</CardTitle>
		<CardDescription>{description ?? 'Description'}</CardDescription>
	</CardHeader>
	<CardFooter>
		<Button href="/destinations/{slug ?? title.toLowerCase()}" class="w-full"
			>Visit Destination</Button
		>
	</CardFooter>
</Card.Root>
