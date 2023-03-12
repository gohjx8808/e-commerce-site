import {
  getLocalStorageItem,
  getProductVariationSuffix,
  roundTo2Dp,
} from "@utils/helper";
import { productLocalStorageKeys } from "@utils/localStorageKeys";
import React, { createContext, useEffect, useState } from "react";

interface productContextState {
  shoppingCart: products.checkoutProduct[];
  addToCart: (
    productData: products.productData,
    isKeyChainSeries: boolean,
    quantity: number,
    variation?: string
  ) => void;
  modifyItemQuantity: (
    itemId: string,
    mode: "increase" | "reduce" | "delete"
  ) => void;
  selectedCheckoutItem: string[];
  updateSelectedCheckoutItem: (itemIds: string[]) => void;
  clearSelectedCheckoutItem: () => void;
  removeCartItem: () => void;
  enlargedImageCarouselData: products.enlargedImageCarouselData;
  updateEnlargedImageCarouselData: (
    value: products.enlargedImageCarouselData
  ) => void;
  filterKeyword: string;
  updateFilterKeyword: (value: string) => void;
}

const initialState: productContextState = {
  shoppingCart: [],
  addToCart: () => {},
  modifyItemQuantity: () => {},
  selectedCheckoutItem: [],
  updateSelectedCheckoutItem: () => {},
  clearSelectedCheckoutItem: () => {},
  removeCartItem: () => {},
  enlargedImageCarouselData: { imageList: [], clickedIndex: 0 },
  updateEnlargedImageCarouselData: () => {},
  filterKeyword: "",
  updateFilterKeyword: () => {},
};

export const ProductContext = createContext(initialState);

const ProductContextProvider = (props: parentComponent) => {
  const { children } = props;

  const [shoppingCart, setShoppingCart] = useState<products.checkoutProduct[]>(
    []
  );
  // only store item ID
  const [selectedCheckoutItem, setSelectedCheckoutItem] = useState<string[]>(
    []
  );
  const [enlargedImageCarouselData, setEnlargedImageCarouselData] =
    useState<products.enlargedImageCarouselData>(
      initialState.enlargedImageCarouselData
    );
  const [filterKeyword, setFilterKeyword] = useState<string>("");

  useEffect(() => {
    setShoppingCart(
      getLocalStorageItem(productLocalStorageKeys.SHOPPING_CART) || []
    );
    setSelectedCheckoutItem(
      getLocalStorageItem(productLocalStorageKeys.SELECTED_CHECKOUT_ITEM) || []
    );
  }, []);

  const addToCart = (
    productData: products.productData,
    isKeyChainSeries: boolean,
    quantity: number,
    variation?: string
  ) => {
    const shoppingCartItems = [...shoppingCart];
    const variationSuffix = getProductVariationSuffix(
      isKeyChainSeries,
      variation
    );
    const productName = productData.name + variationSuffix;

    const price = productData.discountedPrice
      ? roundTo2Dp(productData.discountedPrice)
      : roundTo2Dp(productData.price);

    const formattedData = {
      productId: productData.id + variationSuffix,
      name: productName,
      img: productData.productImages[0],
      pricePerItem: price,
      quantity,
      totalPrice: 0,
    } as products.checkoutProduct;

    const targetIndex = shoppingCartItems.findIndex(
      (item) => item.productId === formattedData.productId
    );
    // no same item in cart storage
    if (targetIndex === -1) {
      formattedData.totalPrice = roundTo2Dp(
        formattedData.pricePerItem * formattedData.quantity
      );
      shoppingCartItems.push(formattedData);
    } else {
      shoppingCartItems[targetIndex].quantity += formattedData.quantity;
      shoppingCartItems[targetIndex].totalPrice +=
        formattedData.pricePerItem * formattedData.quantity;
    }
    localStorage.setItem(
      productLocalStorageKeys.SHOPPING_CART,
      JSON.stringify(shoppingCartItems)
    );
    setShoppingCart(shoppingCartItems);
  };

  const modifyItemQuantity = (
    itemId: string,
    mode: "increase" | "reduce" | "delete"
  ) => {
    const shoppingCartItems = [...shoppingCart];
    const targetIndex = shoppingCartItems.findIndex(
      (item) => item.productId === itemId
    );
    if (mode === "increase") {
      shoppingCartItems[targetIndex].quantity += 1;
      shoppingCartItems[targetIndex].totalPrice +=
        shoppingCartItems[targetIndex].pricePerItem;
    } else if (mode === "reduce") {
      shoppingCartItems[targetIndex].quantity -= 1;
      shoppingCartItems[targetIndex].totalPrice -=
        shoppingCartItems[targetIndex].pricePerItem;
    } else {
      shoppingCartItems.splice(targetIndex, 1);
    }
    setShoppingCart(shoppingCartItems);
    localStorage.setItem(
      productLocalStorageKeys.SHOPPING_CART,
      JSON.stringify(shoppingCartItems)
    );
  };

  const updateSelectedCheckoutItem = (itemIds: string[]) => {
    localStorage.setItem(
      productLocalStorageKeys.SELECTED_CHECKOUT_ITEM,
      JSON.stringify(itemIds)
    );
    setSelectedCheckoutItem(itemIds);
  };

  const clearSelectedCheckoutItem = () => {
    setSelectedCheckoutItem([]);
    localStorage.setItem(
      productLocalStorageKeys.SELECTED_CHECKOUT_ITEM,
      JSON.stringify([])
    );
  };

  const removeCartItem = () => {
    let cartItem = [...shoppingCart];
    cartItem = cartItem.filter(
      (item) => !selectedCheckoutItem.includes(item.productId)
    );
    setShoppingCart(cartItem);
    localStorage.setItem(
      productLocalStorageKeys.SHOPPING_CART,
      JSON.stringify(cartItem)
    );
  };

  return (
    <ProductContext.Provider
      value={{
        shoppingCart,
        addToCart,
        modifyItemQuantity,
        selectedCheckoutItem,
        updateSelectedCheckoutItem,
        clearSelectedCheckoutItem,
        removeCartItem,
        enlargedImageCarouselData,
        updateEnlargedImageCarouselData: setEnlargedImageCarouselData,
        filterKeyword,
        updateFilterKeyword: setFilterKeyword,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
