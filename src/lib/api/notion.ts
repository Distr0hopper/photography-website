import { Client } from '@notionhq/client';
import { NOTION_API_KEY } from '$env/static/private';
import { env } from '$env/dynamic/private';
import type { BlockObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

const notion = new Client({ auth: NOTION_API_KEY });

const destinationDbIds: Record<string, string | undefined> = {
	vietnam: env.NOTION_DATABASE_ID_VIETNAM,
	marocco: env.NOTION_DATABASE_ID_MAROCCO,
	'lofoten-islands': env.NOTION_DATABASE_ID_LOFOTEN_ISLANDS
};

export function getDatabaseId(destination: string): string | null {
	return destinationDbIds[destination] || null;
}

export type Destination = {
	id: string;
	slug: string;
	name: string;
	nr: number | null;
	startDate: string | null;
	nights: number | null;
	transport: string | null;
	departure: string | null;
	place: string | null;
};

export type NotionBlock = {
	type: string;
	text?: string;
	url?: string;
	language?: string;
	items?: string[];
};

function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/[äöüß]/g, (match) => {
			const map: Record<string, string> = { ä: 'ae', ö: 'oe', ü: 'ue', ß: 'ss' };
			return map[match] ?? match;
		})
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');
}

function getTitle(page: PageObjectResponse): string {
	const prop = page.properties['Ort'];
	if (prop?.type === 'title' && prop.title.length > 0) {
		return prop.title.map((t) => t.plain_text).join('');
	}
	return 'Untitled';
}

function getNumber(page: PageObjectResponse, key: string): number | null {
	const prop = page.properties[key];
	if (prop?.type === 'number') return prop.number;
	return null;
}

function getDate(page: PageObjectResponse, key: string): string | null {
	const prop = page.properties[key];
	if (prop?.type === 'date' && prop.date) return prop.date.start;
	return null;
}

function getRichText(page: PageObjectResponse, key: string): string | null {
	const prop = page.properties[key];
	if (prop?.type === 'rich_text' && prop.rich_text.length > 0) {
		return prop.rich_text.map((t) => t.plain_text).join('');
	}
	return null;
}

function getSelect(page: PageObjectResponse, key: string): string | null {
	const prop = page.properties[key];
	if (prop?.type === 'select' && prop.select) return prop.select.name;
	if (prop?.type === 'status' && prop.status) return prop.status.name;
	return null;
}

function mapPageToDestination(page: PageObjectResponse): Destination {
	const name = getTitle(page);
	return {
		id: page.id,
		slug: slugify(name),
		name,
		nr: getNumber(page, 'Nr'),
		startDate: getDate(page, 'Reisestart'),
		nights: getNumber(page, 'Nächte'),
		transport: getSelect(page, 'Transport'),
		departure: getRichText(page, 'Abreise'),
		place: getRichText(page, 'Place')
	};
}

export async function getDestinations(databaseId: string): Promise<Destination[]> {
	const response = await notion.dataSources.query({
		data_source_id: databaseId,
		sorts: [{ property: 'Nr', direction: 'ascending' }]
	});

	return response.results
		.filter((page): page is PageObjectResponse => 'properties' in page)
		.map(mapPageToDestination);
}

export async function getDestinationBySlug(databaseId: string, slug: string): Promise<Destination | null> {
	const destinations = await getDestinations(databaseId);
	return destinations.find((d) => d.slug === slug) ?? null;
}

function extractBlockText(block: BlockObjectResponse): NotionBlock | null {
	const type = block.type;

	if (
		type === 'paragraph' ||
		type === 'heading_1' ||
		type === 'heading_2' ||
		type === 'heading_3' ||
		type === 'quote' ||
		type === 'callout'
	) {
		const content = (block as any)[type];
		const text = content.rich_text?.map((t: any) => t.plain_text).join('') ?? '';
		if (!text) return null;
		return { type, text };
	}

	if (type === 'bulleted_list_item' || type === 'numbered_list_item') {
		const content = (block as any)[type];
		const text = content.rich_text?.map((t: any) => t.plain_text).join('') ?? '';
		return { type, text };
	}

	if (type === 'image') {
		const image = (block as any).image;
		const url = image.type === 'external' ? image.external.url : image.file.url;
		const caption = image.caption?.map((t: any) => t.plain_text).join('') ?? '';
		return { type: 'image', url, text: caption };
	}

	if (type === 'code') {
		const code = (block as any).code;
		const text = code.rich_text?.map((t: any) => t.plain_text).join('') ?? '';
		return { type: 'code', text, language: code.language };
	}

	if (type === 'divider') {
		return { type: 'divider' };
	}

	return null;
}

export async function getPageContent(pageId: string): Promise<NotionBlock[]> {
	const response = await notion.blocks.children.list({ block_id: pageId });

	return response.results
		.filter((block): block is BlockObjectResponse => 'type' in block)
		.map(extractBlockText)
		.filter((block): block is NotionBlock => block !== null);
}
