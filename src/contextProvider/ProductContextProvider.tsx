import { customJSONParse } from "@utils/helper";
import { productLocalStorageKeys } from "@utils/localStorageKeys";
import { useEffect } from "react";
import React, { FC, useState } from "react";
import { createContext } from "react";

const initialState = { shoppingCart: [] };

export const ProductContext = createContext(initialState);

const ProductContextProvider: FC = (props) => {
  const { children } = props;

  const [shoppingCart, setShoppingCart] = useState([]);

  useEffect(() => {
    setShoppingCart(
      customJSONParse(
        localStorage.getItem(productLocalStorageKeys.shoppingCart)
      )
    );
  }, []);

  return (
    <ProductContext.Provider value={{ shoppingCart }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
