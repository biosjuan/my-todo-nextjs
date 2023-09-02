'use client';
import { useParams } from 'next/navigation';

function TodoPage() {
  const { todoId } = useParams();

  return <div>id: {todoId}</div>;
}

export default TodoPage;
