import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userName: "Guest",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setUser: (state, action) => {
      state.userName = action.payload;
    },
  },
});

export const { setStatus, setUser } = userSlice.actions;
export default userSlice.reducer;
