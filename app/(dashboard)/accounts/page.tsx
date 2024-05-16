'use client';

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { PlusIcon } from "lucide-react";
import { DataTable } from "./data-table";
import { Payment, columns } from "./columns";

const AccountsPage = () => {
    const newAccount = useNewAccount();

    const data: Payment[] = [
        { id: "728ed52f", amount: 100, status: "pending", email: "m@example.com" },
        { id: "728ed52f", amount: 150, status: "pending", email: "a@example.com" }
    ];

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
                            data={data}
                            filteredKey='email'
                            onDelete={() => {}}
                            disabled={false}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default AccountsPage;