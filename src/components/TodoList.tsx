'use client';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../redux/store';
import { getTodos } from '@/redux/todosSlice';

const TodoList: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const { todos } = useSelector((state: RootState) => state.todos);
  console.log('component', todos);
  return (
    <>
      <h1 className='flex flex-col items-center'>JUSN</h1>
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
