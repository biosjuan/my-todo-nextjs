import TodoList from '@/app/(protected)/_components/TodoList';
import { StyledEngineProvider } from '@mui/material';
import MuiLink from '@mui/material/Link';
import Button from '@mui/material/Button';
import dynamic from 'next/dynamic';
import Link from 'next/link';

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
      <div className='flex items-center justify-center m-10'>
        <Button
          component={Link}
          href='/queryString?name=Juan&quality=excellent'
          variant='contained'
          color='primary'
        >
          Go to Query Params Component
        </Button>
      </div>
      <TodoList />
      <LazyComponent />
    </>
  );
}
