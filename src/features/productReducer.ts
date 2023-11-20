import { PayloadAction, createSlice ,Reducer} from '@reduxjs/toolkit';
import { ProductInterface ,ProductState } from "../interface/ProductInterface";


const initialState:ProductState = {
    value: 0,
    categoryChoose: "",
    currentProduct: {} as ProductInterface,
    productCompare: [] as ProductInterface[]
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setCategory: (state, action:PayloadAction<string>) => {
      state.categoryChoose = action.payload
    },
    setProduct: (state, action:PayloadAction<ProductInterface>) => {
      state.currentProduct = action.payload
    },
    setProductCompare: (state, action: PayloadAction<ProductInterface>) => {
      state.productCompare.push(action.payload);
      if (state.productCompare.length > 3) {
        state.productCompare = [];
        state.productCompare.push(action.payload);
      }
    }
   
  }
  
});
export type ProductReducer = Reducer<ProductState>
export const { setCategory,setProduct ,setProductCompare } = productSlice.actions;
export default productSlice.reducer;