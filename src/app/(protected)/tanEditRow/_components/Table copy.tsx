'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { data as defaultData, Student } from './data';
import './table.css';

import {
  CellContext,
  ColumnDef,
  ColumnDefTemplate,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

// Define the props for the TableCell component
interface TableCellProps {
  getValue: () => string;
  rowIndex: number; // Added rowIndex prop
  column: ColumnDef<Student>;
  table: any; // You can update this to the correct type if needed
}

const TableCell: React.FC<TableCellProps> = ({
  getValue,
  rowIndex,
  column,
  table,
}) => {
  const initialValue = getValue();
  const [value, setValue] = useState<string>(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // Define the onBlur handler
  const onBlur = () => {
    // Update data based on your logic using rowIndex
    table.options.meta?.updateData(rowIndex, column.id, value);
  };

  // Define the onChange handler
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <input
      type='text' // You can change this to the appropriate input type
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

// Create a wrapper component that adapts TableCell to the ColumnDefTemplate
const TableCellWrapper: ColumnDefTemplate<CellContext<Student, number>> = (
  props
) => {
  const { getValue, cell, column, renderValue, row, table } = props;
  // Pass the rowIndex prop along with other props to TableCell
  return (
    <TableCell
      getValue={() => getValue().toString()}
      column={column}
      rowIndex={row.index}
      table={table}
    />
  );
};

const columnHelper = createColumnHelper<Student>();

export const columns = [
  columnHelper.accessor('studentId', {
    header: 'Student ID',
    cell: TableCellWrapper,
  }),
  columnHelper.accessor('name', {
    header: 'Full Name',
    cell: TableCellWrapper,
  }),
  columnHelper.accessor('dateOfBirth', {
    header: 'Date Of Birth',
    cell: TableCellWrapper,
  }),
  columnHelper.accessor('major', {
    header: 'Major',
    cell: TableCellWrapper,
  }),
];

interface TableProps {
  meta: {
    updateData: (rowIndex: number, columnId: string, value: string) => void;
  };
}

export const Table: React.FC<TableProps> = ({ meta }) => {
  const [data, setData] = useState(() => [...defaultData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      ...meta, // Spread the meta prop here
    },
  });

  return (
    <article className='table-container'>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
};
