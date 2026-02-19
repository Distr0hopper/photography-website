import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, fetch, params }) => {
	const { queryClient } = await parent();

	await queryClient.prefetchQuery({
		queryKey: ['destinations', params.destination],
		queryFn: () => fetch(`/destinations/${params.destination}`).then((r) => r.json())
	});

	return { destination: params.destination };
};
