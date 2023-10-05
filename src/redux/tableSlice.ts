import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TableColumnState {
  columns: string[] | null;
}

const initialState: TableColumnState = {
  columns: null,
};

const tableColumnsSlice = createSlice({
  name: 'table-columns',
  initialState,
  reducers: {
    setTableColums: (state, action: PayloadAction<string[]>) => {
      state.columns = action.payload;
    },
    clearColumns: (state) => {
      state.columns = [];
    },
  },
});

export const { setTableColums, clearColumns } = tableColumnsSlice.actions;

export default tableColumnsSlice.reducer;
