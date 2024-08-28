import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",

  initialState: {
    token: null,
    userId: null,
    userName: null,
    userEmail: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setUserEmail: (state, action) => {
      state.userEmail = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken, setUserId, setUserName, setUserEmail } =
  userSlice.actions;

export default userSlice.reducer;
