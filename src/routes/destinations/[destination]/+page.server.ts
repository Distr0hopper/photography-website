import { Client } from '@notionhq/client';
import { NOTION_API_KEY, NOTION_DATABASE_ID_VIETNAM } from '$env/static/private';
import { slugify } from '$lib/common';

const notion = new Client({ auth: NOTION_API_KEY });

export async function load({ params }) {
	if (params.destination == 'vietnam') {
		const response = await notion.dataSources.query({
			data_source_id: NOTION_DATABASE_ID_VIETNAM,
			sorts: [{ property: 'Nr', direction: 'ascending' }]
		});

		const locations = response.results.map((location) => {
			const title = location.properties.Ort?.title[0].plain_text ?? 'Unknown';
			return {
				title,
				imageUrl: location.cover?.external?.url || '',
				slug: slugify(title)
			};
		});

		return {
			destination: params.destination,
			locations
		};
	}
}
