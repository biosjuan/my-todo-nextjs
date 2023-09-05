import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface User {
  id?: number;
  email: string;
  password: string;
}

interface UserState {
  currentUser: User | null;
}

const initialState: UserState = {
  currentUser: null,
};

export const userLogin = createAsyncThunk(
  'user/login',
  async (user: User, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post('/api/login', user);
      return response.data;
    } catch (error: any) {
      dispatch(error.message);
      return rejectWithValue(error.message);
    }
  }
);

const userSliede = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      document.cookie = `token=${JSON.stringify(action.payload)}`;
      state.currentUser = action.payload;
    });
  },
});

export const { addUser } = userSliede.actions;
export default userSliede.reducer;
