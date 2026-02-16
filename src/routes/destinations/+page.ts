import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, fetch }) => {
	const { queryClient } = await parent();

	await queryClient.prefetchQuery({
		queryKey: ['destinations'],
		queryFn: () => fetch('/api/destinations').then((r) => r.json())
	});
};
