
import { toast } from 'sonner';

import { InferRequestType, InferResponseType } from 'hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { client } from '@/lib/hono'; 

type ResponseType = InferResponseType<typeof client.api.accounts.$post>;
type RequestType = InferRequestType<typeof client.api.accounts.$post>['json']; 

// timestamp: 3:26:00
export const useCreateAccount = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const res = await client.api.accounts.$post({ json });
            console.log('res', res)
            return await res.json();
        },
        onSuccess: () => {
            toast.success('Account created successfully');
            queryClient.invalidateQueries({ queryKey: ['accounts'] });
        },
        onError: () => {
            toast.error('Failed to create account');
        }
    });

    return mutation;
}

