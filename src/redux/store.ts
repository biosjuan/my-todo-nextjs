import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import todosReducer from './todosSlice';
import usersSlie from './usersSlice';
import errorSlice from './errorSlice';
import photosSlice from './photosSlice';
import tableColumnsSlice from './tableSlice';

const store = configureStore({
  reducer: {
    todos: todosReducer,
    users: usersSlie,
    photos: photosSlice,
    columns: tableColumnsSlice,
    error: errorSlice,
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
