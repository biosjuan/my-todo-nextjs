'use client';
import Button from '@mui/material/Button';
import { useParams, useRouter } from 'next/navigation';

function TodoPage() {
  const { todoId } = useParams();
  const router = useRouter();

  return (
    <div className='flex flex-col justify-center items-center h-screen text-2xl'>
      id: {todoId} <br />
      <Button variant='contained' color='primary' onClick={() => router.back()}>
        Back
      </Button>
    </div>
  );
}

export default TodoPage;
