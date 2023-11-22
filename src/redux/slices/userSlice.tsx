import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  imgAvater: "",
};
const userSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setStatus } = userSlice.actions;
export default userSlice.reducer;