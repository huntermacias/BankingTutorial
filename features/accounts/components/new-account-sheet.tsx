import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { AccountForm } from "@/features/accounts/components/account-form";
import { z } from 'zod'; 
import {
    Sheet, 
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle
} from '@/components/ui/sheet'
import { insertAccountSchema } from "@/db/schema";

const formSchema = insertAccountSchema.pick({
    name: true,
})

type FormValues = z.input<typeof formSchema>;


export const NewAccountSheet = () => {
    const { isOpen, close} = useNewAccount(); 

    const mutation = useCreateAccount();

    const onSubmit = (values: FormValues) => {
        mutation.mutate(values, {
            onSuccess: () => {
                close();
            }
        }); 
    }

    return (
        <Sheet open={isOpen} onOpenChange={close}>
            <SheetContent>
                <SheetHeader className='space-y-4'>
                    <SheetTitle>New Account</SheetTitle>
                    <SheetDescription>
                        Create a new account to track your spending
                    </SheetDescription>
                </SheetHeader>
                <AccountForm 
                    onSubmit={onSubmit} 
                    disabled={mutation.isPending} 
                    defaultValues={{ name: '' }}
                />
            </SheetContent>
        </Sheet>
    )
}