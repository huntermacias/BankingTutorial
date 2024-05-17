'use client';

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useBulkDeleteAccounts } from "@/features/accounts/api/use-bulk-delete";

import { Loader2, PlusIcon } from "lucide-react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";

const AccountsPage = () => {
    const newAccount = useNewAccount();
    const deleteAccount = useBulkDeleteAccounts();
    const accountQuery = useGetAccounts();
    const accounts = accountQuery.data || []

    const isDisabled = accountQuery.isLoading || deleteAccount.isPending; 

    if(accountQuery.isLoading) {
        return (
            <div className="pt-64 lg:pt-80 text-white">
                <Card className="bg-opacity-80 bg-dark backdrop-blur-sm shadow-lg border border-gray-300/30">
                    <CardHeader>
                        <Skeleton className="h-8 w-48" />
                    </CardHeader>
                    <CardContent>
                        <div className="h-[500px] w-full flex items-center justify-center">
                            <Loader2 className="size-6 text-slate-300 animate-spin" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }


    return (
        <div className="pt-64 lg:pt-80 text-white">
            <div className="max-w-screen-2xl mx-auto w-full pb-10">
                <Card className="bg-opacity-80 bg-dark backdrop-blur-sm shadow-lg border border-gray-300/30">
                    <CardHeader className="text-white gap-y-2 lg:flex-row lg:items-center lg:justify-between border-b border-gray-300/30 rounded-md">
                        <CardTitle className="text-xl">Accounts</CardTitle>
                        <Button className="bg-teal-600 text-white" size="sm" onClick={newAccount.open}>
                            <PlusIcon className="h-4 w-4 mr-2" />
                            Add New
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <DataTable
                            columns={columns}
                            data={accounts}
                            filteredKey='name'
                            onDelete={(row) => {
                                const ids = row.map((r) => r.original.id);
                                deleteAccount.mutate({ ids });
                            }}
                            disabled={isDisabled}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default AccountsPage;