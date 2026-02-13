import { handleApiError } from '@/error/error-handler';
import { QueryClient } from '@tanstack/svelte-query'

export const queryClient = new QueryClient({
    defaultOptions: {
        mutations: {
            onError: (error) => {
                handleApiError(error);
            },
        },
        
    }
});