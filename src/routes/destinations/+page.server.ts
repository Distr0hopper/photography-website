import { getDestinations } from '$lib/api/notion';

export async function load() {
	try {
		const destinations = await getDestinations();
		return { destinations };
	} catch (e) {
		console.error('Failed to fetch destinations from Notion:', e);
		return { destinations: [] };
	}
}
