import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { AccountForm } from "@/features/accounts/components/account-form";
import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";

import { z } from 'zod';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle
} from '@/components/ui/sheet'
import { insertAccountSchema } from "@/db/schema";
import { useGetAccount } from "../api/use-get-account";
import { Loader2 } from "lucide-react";

const formSchema = insertAccountSchema.pick({
    name: true,
})

type FormValues = z.input<typeof formSchema>;


export const EditAccountSheet = () => {
    const { isOpen, close, id } = useOpenAccount();

    const accountQuery = useGetAccount(id);
    const mutation = useCreateAccount();
    const isLoading = accountQuery.isLoading || mutation.isPending;



    const onSubmit = (values: FormValues) => {
        mutation.mutate(values, {
            onSuccess: () => {
                close();
            }
        });
    }

    const defaultValues = accountQuery.data ? {
        name: accountQuery.data.name
    } : {
        name: ''
    }



    return (
        <Sheet open={isOpen} onOpenChange={close}>
            <SheetContent>
                <SheetHeader className='space-y-4'>
                    <SheetTitle>Edit Account</SheetTitle>
                    <SheetDescription>
                        Edit existing account
                    </SheetDescription>
                </SheetHeader>
                {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="size-4 text-muted-foreground animate-spin" />
                    </div>
                ) : (
                    <AccountForm
                        id={id}
                        onSubmit={onSubmit}
                        disabled={mutation.isPending}
                        defaultValues={defaultValues}
                    />
                )}

            </SheetContent>
        </Sheet>
    )
}