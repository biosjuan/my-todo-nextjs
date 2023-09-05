'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';

function QueryStringComponent() {
  const params = useSearchParams();
  const name = params.get('name');
  const quality = params.get('quality');
  return (
    <div className='flex items-center justify-center h-screen text-2xl font-semibold'>
      Name: {name}
      <br />
      Quality: {quality}
    </div>
  );
}

export default QueryStringComponent;
