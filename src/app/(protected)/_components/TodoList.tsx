'use client';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../../redux/store';
import { getTodos } from '@/redux/todosSlice';
import useCurrentUser from '@/hooks/useCurrentUser';
import UserGreeting from '@/app/(protected)/_components/UserGreeting';

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
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TodoList;
