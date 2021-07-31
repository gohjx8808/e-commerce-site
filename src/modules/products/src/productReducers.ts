import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface productState{
  shoppingCartItem:products.shoppingCartItemData[]
  productFilterKeyword:string
  selectedCheckoutItemsID:string[]
  prevOrderCount:number
}

const INITIAL_STATE:productState = {
  shoppingCartItem: [],
  productFilterKeyword: '',
  selectedCheckoutItemsID: [],
  prevOrderCount: 0,
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
    updateProductFilterKeyword: (state, action:PayloadAction<string>) => {
      state.productFilterKeyword = action.payload;
    },
    updateSelectedCheckoutItemsID: (state, action:PayloadAction<string[]>) => {
      state.selectedCheckoutItemsID = action.payload;
    },
    updatePrevOrderCount: (state, action:PayloadAction<number>) => {
      state.prevOrderCount = action.payload;
    },
    sendPaymentEmailAction: (_state, _action:PayloadAction<products.sendEmailPayload>) => {},
  },
});

export const {
  addToShoppingCart,
  reduceQuantity,
  increaseQuantity,
  removeItemFromCart,
  updateProductFilterKeyword,
  updateSelectedCheckoutItemsID,
  updatePrevOrderCount,
  sendPaymentEmailAction,
} = productSlice.actions;

export default productSlice.reducer;
