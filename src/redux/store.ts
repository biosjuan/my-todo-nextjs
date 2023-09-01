import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import todosReducer from './todosSlice';
import usersSlie from './usersSlice';

const store = configureStore({
  reducer: {
    todos: todosReducer,
    users: usersSlie,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default store;
