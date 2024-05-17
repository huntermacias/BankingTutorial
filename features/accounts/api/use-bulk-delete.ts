
import { toast } from 'sonner';

import { InferRequestType, InferResponseType } from 'hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { client } from '@/lib/hono'; 

type ResponseType = InferResponseType<typeof client.api.accounts['bulk-delete']['$post']>;
type RequestType = InferRequestType<typeof client.api.accounts['bulk-delete']['$post']>['json'];

// timestamp: 3:26:00
export const useBulkDeleteAccounts = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const res = await client.api.accounts['bulk-delete'].$post({ json });
            return await res.json();
        },
        onSuccess: () => {
            toast.success('Accounts Deleted');
            queryClient.invalidateQueries({ queryKey: ['accounts'] });
            // TODO: also invalidate summary query
        },
        onError: () => {
            toast.error('Failed to Delete Account');
        }
    });

    return mutation;
}

