'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import ReactVirtualizedTable from '@/components/VirtuosoTable';
import AutoSizerTable, { TableColumn } from '@/components/AutoSizer';
import Image from 'next/image'; // Import next/image
import { TableCellRenderer } from 'react-virtualized';
// import VirtualizedTable from '@/components/AutoSizer';

interface Item {
  id: number;
  name: string;
  email: string;
}

function QueryStringComponent() {
  const router = useRouter();

  // Render the thumbnail using the next/image component
  const renderThumbnail: TableCellRenderer = ({ cellData: imgUrl }) => {
    return imgUrl ? (
      <Image src={imgUrl as string} alt='Thumbnail' width={50} height={50} />
    ) : (
      ''
    );
  };

  const renderId: TableCellRenderer = ({ cellData: id }) => (
    <div className='flex justify-center'>{id}</div>
  );

  const columns: TableColumn[] = [
    {
      label: 'Row #',
      dataKey: 'id',
      width: 80,
      // Optionally, specify a custom cell renderer for this column
      cellRenderer: renderId,
    },
    {
      label: 'Image',
      dataKey: 'thumbnailUrl',
      width: 80,
      // Optionally, specify a custom cell renderer for this column
      cellRenderer: renderThumbnail,
    },
    {
      label: 'Title',
      dataKey: 'title',
      // width: 300, // Specify the width for this column
      // Optionally, specify a custom cell renderer for this column
    },
    // Add more columns as needed
  ];

  return (
    <>
      <div className='flex items-center justify-center '>
        <Button
          variant='contained'
          color='primary'
          onClick={() => router.back()}
        >
          Back
        </Button>
      </div>
      <div className='flex items-center justify-center'>
        <div className='w-5/6'>
          <AutoSizerTable columns={columns} />
        </div>
      </div>
    </>
  );
}

export default QueryStringComponent;
