import React from "react";
import { Link } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";

const EmployeeTable = ({ employees }) => {
  const columns = [
    { accessorKey: "employee_code", header: "Employee ID" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone", header: "Mobile" },
    { accessorKey: "designation.title", header: "Designation" },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Link
          to={`/employee/${row.original.id}`}
          className="inline-block bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
        >
          View Details
        </Link>
      ),
    },
  ];

  const table = useReactTable({
    data: employees,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          {table.getHeaderGroups().map((headerGroup) =>
            headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="border border-gray-300 p-2 cursor-pointer"
                onClick={header.column.getToggleSortingHandler()}
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))
          )}
        </tr>
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="border border-gray-300">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="border border-gray-300 p-2">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
