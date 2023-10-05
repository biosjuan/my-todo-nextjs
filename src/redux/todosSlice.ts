import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setError } from './errorSlice';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

export const getTodos = createAsyncThunk(
  'todos/getTodos',
  async (_, { dispatch, getState, rejectWithValue }) => {
    const { todos } = getState() as TodoState;
    if (todos.length > 0) {
      return todos;
    }
    try {
      const response = await axios.get('/api/todos');
      return response.data;
    } catch (error: any) {
      // Handle the error and dispatch it to the error slice
      console.log(JSON.stringify(error.message));
      dispatch(setError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos = [...state.todos, action.payload];
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.todos = action.payload.payload;
    });
    // ... other cases ...
  },
});

export const { addTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
// function dispatch(arg0: any) {
//   throw new Error('Function not implemented.');
// }
