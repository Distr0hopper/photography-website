import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, fetch, params }) => {
	const { queryClient } = await parent();

	await queryClient.prefetchQuery({
		queryKey: ['destination', params.destination, params.slug],
		queryFn: () =>
			fetch(`/api/destinations/${params.destination}/${params.slug}`).then((r) => r.json())
	});

	return { destination: params.destination, slug: params.slug };
};
