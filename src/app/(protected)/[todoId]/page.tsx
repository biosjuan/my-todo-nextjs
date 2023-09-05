'use client';
import { useParams } from 'next/navigation';

function TodoPage() {
  const { todoId } = useParams();

  return (
    <div className='flex flex-col items-center text-2xl'>id: {todoId}</div>
  );
}

export default TodoPage;
