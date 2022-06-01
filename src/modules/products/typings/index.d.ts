declare namespace products {
  interface rawProductQueryData {
    allContentfulProducts: {
      edges: innerProductQueryData[];
    };
  }

  interface innerProductQueryData {
    node: productData;
  }

  interface productData {
    category: string;
    contentful_id: string;
    name: string;
    price: number;
    contentDescription?: productContentDescription;
    productImage: import("gatsby-plugin-image").ImageDataLike[];
    discountedPrice: number;
  }

  interface productContentDescription {
    raw: string;
  }

  interface submitCheckoutPayload {
    priceID: string;
  }

  interface shoppingCartItemData {
    id: string;
    quantity: number;
    img?: import("gatsby-plugin-image").IGatsbyImageData;
    name: string;
    price: number;
    itemPrice: number;
  }

  interface checkoutData {
    price: string;
    quantity: number;
  }

  interface submitShippingInfoPayload {
    fullName: string;
    email: string;
    phoneNumber: string;
    addressLine1: string;
    addressLine2: string;
    postcode: string;
    city: string;
    state: string;
    outsideMalaysiaState: string;
    country: string;
    promoCode: string;
    note: string;
    saveShippingInfo: boolean;
    paymentOptions: string;
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
    imageList: import("gatsby-plugin-image").ImageDataLike[];
    clickedIndex: number;
  }

  interface saveOrderPayload extends sendPaymentEmailPayload {
    status: "Pending Payment";
    createdAt: string;
  }
}
