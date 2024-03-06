"use client";
import * as React from "react";
import {
    CaretSortIcon,
    ChevronDownIcon,
    DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
    SortingState,
    ColumnFiltersState,
    VisibilityState,
    flexRender,
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    ColumnDef,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export type DataItem = Record<string, any>;

interface DataTableProps {
    data: DataItem[];
    columns: ColumnDef<DataItem>[];
    loading?: boolean;
    total?: number;
}

export type Cell<T = any> = {
    id: string;
    column: {
        id: string;
        columnDef: ColumnDef<T>;
        getCanHide: () => boolean;
        getIsVisible: () => boolean;
        toggleVisibility: (isVisible: boolean) => void;
    };
    getCellProps: () => Record<string, any>;
    getCellState: () => Record<string, any>;
    getIsSelected: () => boolean;
    getValue: () => T[keyof T];
    getContext: () => {
        row: Row<T>;
    };
};

export type Row<T = any> = {
    id: string;
    original: T;
    getIsSelected: () => boolean;
    getVisibleCells: () => Cell<T>[];
    getValue: (accessorKey: keyof T) => T[keyof T];
};

export function DataTable({ data, columns, loading = false, total = 0 }: DataTableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className="w-full bg-white p-2 rounded">
            <div className="flex items-center gap-3 py-4 lowercase">
                <Input
                    placeholder="تصفية..."
                    // @ts-ignore
                    value={(table.getColumn(columns[1]?.accessorKey)?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        // @ts-ignore
                        table.getColumn(columns[1]?.accessorKey)?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu
                >
                    <DropdownMenuTrigger
                        className=" rounded-md p-1"
                        asChild>
                        <button className="ml-auto flex items-center">
                            الأعمدة <ChevronDownIcon className="ml-2 h-4 w-4" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table
                    className=" min-h-48"
                >
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            className={`${header.column.id === 'id' ? 'hidden' : ''}`}
                                            key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            className={`h-12 ${cell.column.id === 'id' ? 'hidden' : ''}`}
                                            key={cell.id}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow
                                className="w-full "
                            >
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-10  text-center flex justify-center items-center w-full"
                                >
                                    لم يتم العثور على بيانات
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter
                        className="w-full bg-muted"

                    >
                        <TableRow
                            className="w-full bg-muted/50"
                        >
                            <TableCell
                                className="text-right font-semibold"
                                colSpan={3}>
                                السعر الإجمالي
                            </TableCell>
                            <TableCell className="text-right font-semibold">
                                {total} د.م
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>

            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} من{" "}
                    {table.getFilteredRowModel().rows.length} صف محدد.
                </div>
                <div className=" flex gap-2 justify-center items-center">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        السابق
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        التالي
                    </Button>
                </div>
            </div>
        </div>
    );
}
export type { ColumnDef };
