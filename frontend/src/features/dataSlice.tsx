import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DataState {
  isUpdating: boolean;
}

const initialState: DataState = {
  isUpdating: false,
};

const dataSlice = createSlice({
  name: "update",
  initialState,
  reducers: {
    setUpdate: (state, action: PayloadAction<boolean>) => {
      state.isUpdating = action.payload;
    },
    resetUpdate: (state) => {
      state.isUpdating = false;
    },
  },
});

export const { setUpdate, resetUpdate } = dataSlice.actions;
export default dataSlice.reducer;
