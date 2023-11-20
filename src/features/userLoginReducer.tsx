import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  imgAvater: "",
};
const userLoginSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setStatus } = userLoginSlice.actions;
export default userLoginSlice.reducer;
