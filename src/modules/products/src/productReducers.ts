import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface productState{
  shoppingCartItem:products.shoppingCartItemData[]
  isCartSnackbarOpen:boolean
}

const INITIAL_STATE:productState = {
  shoppingCartItem: [],
  isCartSnackbarOpen: false,
};

export const productSlice = createSlice({
  name: 'product',
  initialState: INITIAL_STATE,
  reducers: {
    addToShoppingCart: (state, action:PayloadAction<products.shoppingCartItemData>) => {
      const targetIndex = state.shoppingCartItem.findIndex((item) => item.id === action.payload.id);
      if (targetIndex === -1) {
        state.shoppingCartItem.push(action.payload);
      } else {
        state.shoppingCartItem[targetIndex].quantity += 1;
      }
      state.isCartSnackbarOpen = true;
    },
    toggleCartSnackbar: (state, action:PayloadAction<boolean>) => {
      state.isCartSnackbarOpen = action.payload;
    },
  },
});

export const { addToShoppingCart, toggleCartSnackbar } = productSlice.actions;

export default productSlice.reducer;
