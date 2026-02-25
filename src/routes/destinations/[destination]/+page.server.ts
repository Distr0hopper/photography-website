import { Client } from '@notionhq/client';
import { NOTION_API_KEY, NOTION_DATABASE_ID_VIETNAM } from '$env/static/private';

const notion = new Client({ auth: NOTION_API_KEY });

export async function load({ params }) {
	if (params.destination == 'vietnam') {
		const response = await notion.dataSources.query({
			data_source_id: NOTION_DATABASE_ID_VIETNAM,
			sorts: [{ property: 'Nr', direction: 'ascending' }]
		});

		return {
			destination: params.destination,
			notionData: response.results
		};
	}
}
