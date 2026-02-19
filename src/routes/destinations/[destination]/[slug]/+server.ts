import { json, error } from '@sveltejs/kit';
import { getDatabaseId, getDestinationBySlug, getPageContent } from '$lib/api/notion';

export async function GET({ params }) {
	const databaseId = getDatabaseId(params.destination);

	if (!databaseId) {
		error(404, 'Destination not configured');
	}

	const destination = await getDestinationBySlug(databaseId, params.slug);

	if (!destination) {
		error(404, 'Destination not found');
	}

	const content = await getPageContent(destination.id);
	return json({ destination, content });
}
