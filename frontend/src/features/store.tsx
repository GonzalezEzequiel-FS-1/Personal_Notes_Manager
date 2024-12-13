import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./usersSlice";
import dataReducer from './dataSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    update: dataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch;         
export default store;