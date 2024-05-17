"use client"

import { Trash } from "lucide-react"
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    useReactTable,
    SortingState,
    VisibilityState,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    Row,

} from "@tanstack/react-table"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useConfirm } from "@/hooks/use-confirm"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    filteredKey: string,
    onDelete: (rows: Row<TData>[]) => void,
    disabled?: boolean,

}

export function DataTable<TData, TValue>({
    columns,
    data,
    filteredKey,
    onDelete,
    disabled,
}: DataTableProps<TData, TValue>) {

    const [ConfirmationDialog, confirm] = useConfirm(
        "Are you sure?",
        "This action cannot be undone."
    )
    const [sorting, setSorting] = useState<SortingState>([])

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,

        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })



    return (
        <div className="text-white">
            <ConfirmationDialog />
            {/* <!-- Filter Input --> */}
            <div className="flex items-center py-4">
                <Input
                    placeholder={`Filter ${filteredKey}`}
                    value={(table.getColumn(filteredKey)?.getFilterValue() as string) ?? ""}
                    onChange={(event) => table.getColumn(filteredKey)?.setFilterValue(event.target.value)}
                    className="max-w-sm bg-dark-light rounded text-white placeholder-gray-light"
                />
                {/* <!-- Delete Section --> */}
                {
                    table.getFilteredSelectedRowModel().rows.length > 0 && (
                        <Button
                            disabled={disabled}
                            size="sm"
                            variant="outline"
                            onClick={async () => {
                                const confirmDelete = await confirm()
                                if (confirmDelete) {
                                    onDelete(table.getFilteredSelectedRowModel().rows)
                                    table.resetRowSelection()

                                }
                            }}
                            className="ml-auto font-normal text-sm border-red-600/60 bg-gray-600/30 hover:bg-gray-800/30 hover:text-white"
                        >
                            <Trash className="h-4 w-4 mr-2 text-red-600" />
                            Delete ({table.getFilteredSelectedRowModel().rows.length})
                        </Button>
                    )
                }
            </div>
            {/* <!-- Dropdown Menu --> */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto bg-teal-dark shadow-soft mb-4 text-white">
                        Columns
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-gray-dark">
                    {table
                        .getAllColumns()
                        .filter(column => column.getCanHide())
                        .map(column => (
                            <DropdownMenuCheckboxItem
                                key={column.id}
                                className="capitalize text-white"
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                            >
                                {column.id}
                            </DropdownMenuCheckboxItem>
                        ))}
                </DropdownMenuContent>
            </DropdownMenu>
            {/* <!-- Data Table --> */}
            <div className="rounded-md border border-gray-dark">
                <Table>
                    <TableHeader className="">
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <TableHead key={header.id} className="text-teal-light">
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map(row => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className={cn(row.getIsSelected() && "bg-teal-light text-dark", "bg-dark hover:bg-gray-dark")}
                                >
                                    {row.getVisibleCells().map(cell => (
                                        <TableCell key={cell.id} className="text-white">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center text-gray-light">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-gray-light">
                    {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="bg-teal-main shadow-soft mb-4 text-white"
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="bg-teal-main shadow-soft mb-4 text-white"
                >
                    Next
                </Button>
            </div>
        </div>
    )
}
