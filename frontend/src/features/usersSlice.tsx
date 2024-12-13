import { createSlice } from "@reduxjs/toolkit";



const userSlice = createSlice({
  name: "user",
  initialState: { 
    value: { 
      name: "", 
      email: "", 
      isAuthenticated: false 
    } 
  },
  reducers: {
    setUser: (state, action) => {
      state.value = { 
        ...action.payload, 
        isAuthenticated: true 
      }; 
    },
    clearUser: (state) => {
      console.log('clearing User')
      state.value = { 
        name: "", 
        email: "", 
        isAuthenticated: false 
      };
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
export const selectedUser = (state: any) =>state.user.value