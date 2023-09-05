'use client';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../../redux/store';
import { getTodos } from '@/redux/todosSlice';
import useCurrentUser from '@/hooks/useCurrentUser';
import UserGreeting from '@/app/(protected)/_components/UserGreeting';
import BasicCard from '@/components/BasicCard';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import { clearError } from '@/redux/errorSlice';

const TodoList: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const errorMessage = useSelector((state: RootState) => state.error.message);

  useEffect(() => {
    dispatch(clearError());
    dispatch(getTodos());
  }, [dispatch]);

  const { user } = useCurrentUser('token');
  const { todos } = useSelector((state: RootState) => state.todos);
  const router = useRouter();

  console.log('errorMessage', errorMessage);

  const onNavigate = (id: number) => {
    router.push(`/${id}`);
  };
  return (
    <>
      <UserGreeting user={user} />
      <div className='flex flex-col items-center'>
        <BasicCard>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                {todo.title}{' '}
                <Button onClick={() => onNavigate(todo.id)}>
                  Go to Individual Todo
                </Button>
              </li>
            ))}
          </ul>
        </BasicCard>
      </div>
    </>
  );
};

export default TodoList;
