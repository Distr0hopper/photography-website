import { json, error } from '@sveltejs/kit';
import { getDestinationBySlug, getPageContent } from '$lib/api/notion';

export async function GET({ params }) {
	const destination = await getDestinationBySlug(params.slug);

	if (!destination) {
		error(404, 'Destination not found');
	}

	const content = await getPageContent(destination.id);
	return json({ destination, content });
}
