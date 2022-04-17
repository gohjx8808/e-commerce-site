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
}

const initialState: productContextState = {
  shoppingCart: [],
  addToCart: () => {},
};

export const ProductContext = createContext(initialState);

const ProductContextProvider: FC = (props) => {
  const { children } = props;

  const [shoppingCart, setShoppingCart] = useState<
    products.shoppingCartItemData[]
  >([]);

  useEffect(() => {
    setShoppingCart(
      customJSONParse(
        localStorage.getItem(productLocalStorageKeys.shoppingCart)
      )
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

  return (
    <ProductContext.Provider value={{ shoppingCart, addToCart }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
