import ReduxProvider from '@/components/ReduxProvider';
import TodoList from '@/components/TodoList';
import store from '@/redux/store';
import { Provider } from 'react-redux';

export default function Home() {
  return (
    <>
      <h1 className='flex flex-col items-center text-2xl'>Home Page</h1>
      <ReduxProvider>
        <TodoList />
      </ReduxProvider>
    </>
  );
}
