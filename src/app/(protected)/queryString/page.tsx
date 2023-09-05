'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';

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
    </>
  );
}

export default QueryStringComponent;
