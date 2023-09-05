import TodoList from '@/app/(protected)/_components/TodoList';
import Button from '@mui/material/Button';
import dynamic from 'next/dynamic';

const LazyComponent = dynamic(() => import('./_components/LazyComponent'), {
  loading: () => <p>Loading...</p>,
});
// https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading
export default function Home() {
  return (
    <>
      <h1 className='flex flex-col items-center text-2xl'>
        <Button variant='contained' color='secondary'>
          Home Page
        </Button>
      </h1>

      <TodoList />
      <LazyComponent />
    </>
  );
}
