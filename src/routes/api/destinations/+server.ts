import { json } from '@sveltejs/kit';
import { getDestinations } from '$lib/api/notion';

export async function GET() {
	const destinations = await getDestinations();
	return json(destinations);
}
