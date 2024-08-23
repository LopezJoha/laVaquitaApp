import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",

  initialState: {
    token: null,
    userId: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken, setUserId } = userSlice.actions;

export default userSlice.reducer;
