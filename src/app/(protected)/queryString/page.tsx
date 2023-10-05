'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import ReactVirtualizedTable from '@/components/VirtuosoTable';
import AutoSizerTable, { TableColumn } from '@/components/AutoSizer';
import Image from 'next/image'; // Import next/image
import { TableCellRenderer } from 'react-virtualized';
import MultipleSelectCheckmarks from '../_components/selectColumns';
// import VirtualizedTable from '@/components/AutoSizer';

interface Item {
  id: number;
  name: string;
  email: string;
}

function QueryStringComponent() {
  const router = useRouter();
  const params = useSearchParams();
  const name = params.get('name');
  const quality = params.get('quality');

  return (
    <>
      <div className='flex items-center justify-center text-2xl h-40 font-semibold'>
        Name: {name}
        <br />
        Quality: {quality}
        <br />
      </div>
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
        <MultipleSelectCheckmarks />
      </div>
      <div className='flex items-center justify-center'>
        <div className='w-5/6'>
          <AutoSizerTable />
        </div>
      </div>
    </>
  );
}

export default QueryStringComponent;
