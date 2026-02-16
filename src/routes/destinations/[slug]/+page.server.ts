import { error } from '@sveltejs/kit';
import { getDestinationBySlug, getPageContent } from '$lib/api/notion';

export async function load({ params }) {
	const destination = await getDestinationBySlug(params.slug);

	if (!destination) {
		error(404, 'Destination not found');
	}

	const content = await getPageContent(destination.id);

	return { destination, content };
}
