import ReduxProvider from '@/components/ReduxProvider';
import TodoList from '@/app/(protected)/_components/TodoList';

export default function Home() {
  return (
    <>
      <h1 className='flex flex-col items-center text-2xl'>Home Page</h1>
      <TodoList />
    </>
  );
}
