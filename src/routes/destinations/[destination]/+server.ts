import { json } from '@sveltejs/kit';
import { getDatabaseId, getDestinations } from '$lib/api/notion';

export async function GET({ params }) {
	const databaseId = getDatabaseId(params.destination);

	if (!databaseId) {
		return json([]);
	}

	const destinations = await getDestinations(databaseId);
	return json(destinations);
}
