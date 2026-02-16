import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, fetch, params }) => {
	const { queryClient } = await parent();

	await queryClient.prefetchQuery({
		queryKey: ['destination', params.slug],
		queryFn: () => fetch(`/api/destinations/${params.slug}`).then((r) => r.json())
	});

	return { slug: params.slug };
};
