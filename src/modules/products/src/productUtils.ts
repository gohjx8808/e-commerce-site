import { isSSR } from "@utils/constants";
import { customJSONParse } from "@utils/helper";
import { productLocalStorageKeys } from "@utils/localStorageKeys";
import { getImage } from "gatsby-plugin-image";
import { getProductVariationSuffix, roundTo2Dp } from "../../../utils/helper";

// eslint-disable-next-line import/prefer-default-export
export const addToCart = (
  productData: products.productData,
  isKeyChainSeries: boolean,
  quantity: number,
  variation?: string
) => {
  const shoppingCart: products.shoppingCartItemData[] =
    JSON.parse(
      String(localStorage.getItem(productLocalStorageKeys.shoppingCart))
    ) || [];
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
  const targetIndex = shoppingCart.findIndex(
    (item) => item.id === formattedData.id
  );
  // no same item in cart storage
  if (targetIndex === -1) {
    formattedData.itemPrice = roundTo2Dp(
      formattedData.price * formattedData.quantity
    );
    shoppingCart.push(formattedData);
  } else {
    shoppingCart[targetIndex].quantity += formattedData.quantity;
    shoppingCart[targetIndex].itemPrice +=
      formattedData.price * formattedData.quantity;
  }
  localStorage.setItem(
    productLocalStorageKeys.shoppingCart,
    JSON.stringify(shoppingCart)
  );
};

export const modifyItemQuantity = (
  itemId: string,
  mode: "increase" | "reduce" | "delete"
) => {
  const shoppingCartItems: products.shoppingCartItemData[] =
    (!isSSR &&
      customJSONParse(
        localStorage.getItem(productLocalStorageKeys.shoppingCart)
      )) ||
    [];
  const targetIndex = shoppingCartItems.findIndex((item) => item.id === itemId);
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
  localStorage.setItem(
    productLocalStorageKeys.shoppingCart,
    JSON.stringify(shoppingCartItems)
  );
};
