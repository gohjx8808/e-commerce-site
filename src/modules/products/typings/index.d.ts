declare namespace products {
  interface shoppingCartItemData {
    id: string;
    quantity: number;
    img?: productImageData;
    name: string;
    price: number;
    itemPrice: number;
  }

  interface submitShippingInfoPayload {
    receiverName: string;
    buyerEmail: string;
    receiverCountryCode: string;
    receiverPhoneNumber: string;
    addressLineOne: string;
    addressLineTwo: string;
    postcode: string;
    city: string;
    state: optionsData;
    country: string;
    promoCode: string;
    note: string;
    addToAddressBook: boolean;
    paymentMethod: string;
  }

  interface checkoutFormPayload extends submitShippingInfoPayload {
    state: optionsData;
  }

  interface sendPaymentEmailPayload extends submitShippingInfoPayload {
    currentOrderCount: number;
    totalAmount: number;
    shippingFee: number;
    selectedCheckoutItems: shoppingCartItemData[];
    discountMargin: string;
    discount: number;
    discountedAmount: number;
    accUserName: string;
  }

  interface availablePromoCodeData {
    code: string;
    endDate: string;
    startDate: string;
    discountType: string;
    discountValue: string;
  }

  interface enlargedImageCarouselData {
    imageList: productImageData[];
    clickedIndex: number;
  }

  interface saveOrderPayload extends sendPaymentEmailPayload {
    status: "Pending Payment";
    createdAt: string;
  }

  interface getAllProductPayload {
    search: string;
    sortId: number;
  }

  interface productData {
    name: string;
    productImages: productImageData[];
    price: number;
    contentDescription: import("@contentful/rich-text-types").Document;
    category: string;
    discountedPrice?: number;
    id: string;
  }

  interface productImageData {
    filename: string;
    url: string;
  }

  type groupedProductData = { [x: string]: productData[] };

  interface calculateShippingFeePayload {
    state: optionsData;
    totalAmount: number;
  }

  interface verifyPromoCodePayload {
    promoCode: string;
  }

  interface promoCodeData {
    id: number;
    name: string;
    promoType: string;
    promoValue: number;
  }
}
