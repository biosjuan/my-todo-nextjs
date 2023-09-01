import ReduxProvider from '@/components/ReduxProvider';
import TodoList from '@/app/(protected)/_components/TodoList';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

export default function Home() {
  return (
    <>
      <h1 className='flex flex-col items-center text-2xl'>
        <Button variant='contained'>Home Page</Button>
      </h1>

      <TodoList />
    </>
  );
}
