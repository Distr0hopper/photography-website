import { QueryClient } from '@tanstack/svelte-query';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000
			}
		}
	});

	return { queryClient };
};
