import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface productState{
  shoppingCartItem:products.shoppingCartItemData[]
}

const INITIAL_STATE:productState = {
  shoppingCartItem: [],
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
    },
    reduceQuantity: (state, action:PayloadAction<string>) => {
      const targetIndex = state.shoppingCartItem.findIndex((item) => item.id === action.payload);
      state.shoppingCartItem[targetIndex].quantity -= 1;
    },
    increaseQuantity: (state, action:PayloadAction<string>) => {
      const targetIndex = state.shoppingCartItem.findIndex((item) => item.id === action.payload);
      state.shoppingCartItem[targetIndex].quantity += 1;
    },
    removeItemFromCart: (state, action:PayloadAction<string>) => {
      const targetIndex = state.shoppingCartItem.findIndex((item) => item.id === action.payload);
      state.shoppingCartItem.splice(targetIndex, 1);
    },
  },
});

export const {
  addToShoppingCart, reduceQuantity, increaseQuantity, removeItemFromCart,
} = productSlice.actions;

export default productSlice.reducer;
