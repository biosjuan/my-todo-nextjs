'use client';
import { useMemo, useState } from 'react';
import { Column, ColumnDef, Row } from '@tanstack/react-table';
import mockDataPerson from '../../MOCK_DATA.json';
import Spinner from '@/ui/spinner';
import GenericTable from './GenericTable';

export type Person = {
  id: number;
  first_name: string;
  last_name: string;
  age: number;
  visit: number;
  status: string;
  profile: boolean;
  isLoading: string;
};

export type GenericCellProps<T> = {
  row: {
    original: T;
  };
  column: {
    id: string;
  };
};

export default function TableCreator() {
  const initialData: Person[] = useMemo(() => mockDataPerson, []).map((p) => ({
    ...p,
    isLoading: 'no-sp',
  }));

  const [data, setData] = useState<Person[]>(initialData);

  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      {
        header: 'First Name',
        accessorKey: 'first_name',
        cell: ({ row, column }) => renderCell(row, column),
      },
      {
        header: 'Last Name',
        accessorKey: 'last_name',
        cell: ({ row, column }) => renderCell(row, column),
      },
      {
        header: 'Age',
        accessorKey: 'age',
        cell: ({ row, column }) => renderCell(row, column),
      },
      {
        header: 'Visit',
        accessorKey: 'visit',
        cell: ({ row, column }) => renderCell(row, column),
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: ({ row, column }) => renderCell(row, column),
      },
      {
        header: 'Profile',
        accessorKey: 'profile',
        cell: ({ row, column }) => renderCell(row, column),
      },
    ],
    []
  );

  function renderCell(row: Row<any>, column: Column<Person>) {
    const isLoading = row.original.isLoading === column.id;
    return (
      <>
        {isLoading ? (
          <Spinner />
        ) : typeof row.original[column.id] === 'boolean' ? (
          <div
            onClick={() => onRowClicked(row.original.id, column.id)}
            className='cursor-pointer'
          >
            {row.original.profile ? 'Active' : 'No Active'}
          </div>
        ) : (
          <div
            onClick={(e) => onRowClicked(row.original.id, column.id)}
            className='cursor-pointer'
          >
            {row.original[column.id]}
          </div>
        )}
      </>
    );
  }

  function onRowClicked(id: number, columnId: string) {
    const updatedData = data.map((p) =>
      p.id === id ? { ...p, isLoading: columnId, [columnId]: 'UPDATED' } : p
    );

    setData(updatedData);
    setTimeout(() => {
      // Update the isLoading property to false after 1 second
      const updatedDataAfterDelay = updatedData.map((p) =>
        p.id === id ? { ...p, isLoading: 'no-sp' } : p
      );
      setData(updatedDataAfterDelay);
    }, 1000);
  }

  return <GenericTable data={data} columns={columns} />;
}
