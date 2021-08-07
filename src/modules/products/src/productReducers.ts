import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface productState{
  shoppingCartItem:products.shoppingCartItemData[]
  productFilterKeyword:string
  selectedCheckoutItemsID:string[]
  prevOrderCount:number
  prevShippingInfo:products.storageShippingInfoPayload
}

const INITIAL_STATE:productState = {
  shoppingCartItem: [],
  productFilterKeyword: '',
  selectedCheckoutItemsID: [],
  prevOrderCount: 0,
  prevShippingInfo: {
    fullName: '',
    email: '',
    phoneNo: '60',
    addressLine1: '',
    addressLine2: '',
    postcode: '',
    city: '',
    state: '',
    outsideMalaysiaState: '',
    country: '',
    saveShippingInfo: false,
    paymentOptions: '',
  },
};

export const productSlice = createSlice({
  name: 'product',
  initialState: INITIAL_STATE,
  reducers: {
    addToShoppingCart: (state, action:PayloadAction<products.shoppingCartItemData>) => {
      const targetIndex = state.shoppingCartItem.findIndex((item) => item.id === action.payload.id);
      if (targetIndex === -1) {
        // eslint-disable-next-line no-param-reassign
        action.payload.itemPrice = (+action.payload.price * +action.payload.quantity).toFixed(2);
        state.shoppingCartItem.push(action.payload);
      } else {
        state.shoppingCartItem[targetIndex].quantity += 1;
        state.shoppingCartItem[targetIndex].itemPrice = (+state.shoppingCartItem[targetIndex].price
          * +state.shoppingCartItem[targetIndex].quantity).toFixed(2);
      }
    },
    reduceQuantity: (state, action:PayloadAction<string>) => {
      const targetIndex = state.shoppingCartItem.findIndex((item) => item.id === action.payload);
      state.shoppingCartItem[targetIndex].quantity -= 1;
      state.shoppingCartItem[targetIndex].itemPrice = (+state.shoppingCartItem[targetIndex].price
        * +state.shoppingCartItem[targetIndex].quantity).toFixed(2);
    },
    increaseQuantity: (state, action:PayloadAction<string>) => {
      const targetIndex = state.shoppingCartItem.findIndex((item) => item.id === action.payload);
      state.shoppingCartItem[targetIndex].quantity += 1;
      state.shoppingCartItem[targetIndex].itemPrice = (+state.shoppingCartItem[targetIndex].price
        * +state.shoppingCartItem[targetIndex].quantity).toFixed(2);
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
    saveShippingInfo: (state, action:PayloadAction<products.submitShippingInfoPayload>) => {
      state.prevShippingInfo = { ...action.payload, state: action.payload.state.value };
    },
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
  saveShippingInfo,
} = productSlice.actions;

export default productSlice.reducer;
