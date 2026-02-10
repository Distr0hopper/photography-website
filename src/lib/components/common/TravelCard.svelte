<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';

	interface Props {
		title: string;
		description: string;
		imageUrl: string;
		showBadge?: boolean;
	}

	let { title, description, imageUrl, showBadge = false }: Props = $props();
</script>

<Card.Root class="relative mx-auto w-full max-w-sm pt-0">
	<div class="absolute inset-0 z-30 aspect-video bg-black/35"></div>
	<img
		src={imageUrl ?? 'https://avatar.vercel.sh/shadcn1'}
		alt="Travel destination"
		class="relative z-20 aspect-video w-full object-cover brightness-90 dark:brightness-80"
	/>
	<Card.Header>
		<Card.Action>
			{#if showBadge}
				<span
					class="rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
					>Featured</span
				>
			{/if}
		</Card.Action>
		<Card.Title>{title}</Card.Title>
		<Card.Description>{description ?? 'Description'}</Card.Description>
	</Card.Header>
	<Card.Footer>
		<Button class="w-full">Visit Destination</Button>
	</Card.Footer>
</Card.Root>
