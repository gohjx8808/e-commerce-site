import {
  customJSONParse,
  getProductVariationSuffix,
  roundTo2Dp,
} from "@utils/helper";
import { productLocalStorageKeys } from "@utils/localStorageKeys";
import { useEffect } from "react";
import React, { FC, useState } from "react";
import { createContext } from "react";
import { getImage } from "gatsby-plugin-image";

interface productContextState {
  shoppingCart: products.shoppingCartItemData[];
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
};

export const ProductContext = createContext(initialState);

const ProductContextProvider: FC = (props) => {
  const { children } = props;

  const [shoppingCart, setShoppingCart] = useState<
    products.shoppingCartItemData[]
  >([]);
  // only store item ID
  const [selectedCheckoutItem, setSelectedCheckoutItem] = useState<string[]>(
    []
  );
  const [enlargedImageCarouselData, setEnlargedImageCarouselData] =
    useState<products.enlargedImageCarouselData>(
      initialState.enlargedImageCarouselData
    );

  useEffect(() => {
    setShoppingCart(
      customJSONParse(
        localStorage.getItem(productLocalStorageKeys.shoppingCart)
      ) || []
    );
    setSelectedCheckoutItem(
      customJSONParse(
        localStorage.getItem(productLocalStorageKeys.selectedCheckoutItem)
      ) || []
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
    const formattedData = {
      id: productData.contentful_id + variationSuffix,
      name: productName,
      img: getImage(productData.productImage[0]),
      price: productData.discountedPrice
        ? roundTo2Dp(productData.discountedPrice)
        : roundTo2Dp(productData.price),
      quantity,
    } as products.shoppingCartItemData;
    const targetIndex = shoppingCartItems.findIndex(
      (item) => item.id === formattedData.id
    );
    // no same item in cart storage
    if (targetIndex === -1) {
      formattedData.itemPrice = roundTo2Dp(
        formattedData.price * formattedData.quantity
      );
      shoppingCartItems.push(formattedData);
    } else {
      shoppingCartItems[targetIndex].quantity += formattedData.quantity;
      shoppingCartItems[targetIndex].itemPrice +=
        formattedData.price * formattedData.quantity;
    }
    localStorage.setItem(
      productLocalStorageKeys.shoppingCart,
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
      (item) => item.id === itemId
    );
    if (mode === "increase") {
      shoppingCartItems[targetIndex].quantity += 1;
      shoppingCartItems[targetIndex].itemPrice +=
        shoppingCartItems[targetIndex].price;
    } else if (mode === "reduce") {
      shoppingCartItems[targetIndex].quantity -= 1;
      shoppingCartItems[targetIndex].itemPrice -=
        shoppingCartItems[targetIndex].price;
    } else {
      shoppingCartItems.splice(targetIndex, 1);
    }
    setShoppingCart(shoppingCartItems);
    localStorage.setItem(
      productLocalStorageKeys.shoppingCart,
      JSON.stringify(shoppingCartItems)
    );
  };

  const updateSelectedCheckoutItem = (itemIds: string[]) => {
    localStorage.setItem(
      productLocalStorageKeys.selectedCheckoutItem,
      JSON.stringify(itemIds)
    );
    setSelectedCheckoutItem(itemIds);
  };

  const clearSelectedCheckoutItem = () => {
    setSelectedCheckoutItem([]);
    localStorage.setItem(
      productLocalStorageKeys.selectedCheckoutItem,
      JSON.stringify([])
    );
  };

  const removeCartItem = () => {
    let cartItem = [...shoppingCart];
    cartItem = cartItem.filter(
      (item) => !selectedCheckoutItem.includes(item.id)
    );
    setShoppingCart(cartItem);
    localStorage.setItem(
      productLocalStorageKeys.shoppingCart,
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
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
