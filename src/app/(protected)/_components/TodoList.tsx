'use client';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../../redux/store';
import { getTodos } from '@/redux/todosSlice';
import useCurrentUser from '@/hooks/useCurrentUser';
import UserGreeting from '@/app/(protected)/_components/UserGreeting';
import Card from '@mui/material/Card';

const TodoList: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const { user } = useCurrentUser('token');

  const { todos } = useSelector((state: RootState) => state.todos);
  return (
    <>
      <UserGreeting user={user} />
      <div className='flex flex-col items-center'>
        <Card variant='outlined' className='p-10'>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>{todo.title}</li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
};

export default TodoList;
