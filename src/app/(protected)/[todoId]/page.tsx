'use client';
import { useParams } from 'next/navigation';

function TodoPage() {
  const { todoId } = useParams();

  return (
    <div className='flex justify-center items-center h-screen text-2xl'>
      id: {todoId}
    </div>
  );
}

export default TodoPage;
