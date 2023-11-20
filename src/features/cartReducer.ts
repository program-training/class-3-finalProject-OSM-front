import { createSlice } from '@reduxjs/toolkit';



const initialState = {
    value: 0,
    productsInCart: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
        state.productsInCart = action.payload
    }
  },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;