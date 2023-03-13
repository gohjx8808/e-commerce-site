declare namespace products {
  interface checkoutFormPayload {
    receiverName: string;
    buyerEmail: string;
    receiverCountryCode: string;
    receiverPhoneNumber: string;
    addressLineOne: string;
    addressLineTwo: string;
    postcode: string;
    city: string;
    state: optionsData;
    country: "Malaysia";
    promoCode?: string;
    note?: string;
    addToAddressBook: boolean;
    paymentMethod: string;
  }

  interface enlargedImageCarouselData {
    imageList: productImageData[];
    clickedIndex: number;
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

  interface checkoutProduct {
    productId: string;
    name: string;
    pricePerItem: number;
    quantity: number;
    totalPrice: number;
    img?: productImageData;
  }

  interface checkoutPayload {
    products: checkoutProduct[];
    addressId?: number;
    buyerEmail: string;
    receiverName?: string;
    receiverCountryCode?: string;
    receiverPhoneNumber?: string;
    addressLineOne?: string;
    addressLineTwo?: string;
    postcode?: string;
    city?: string;
    state?: optionsData;
    country?: "Malaysia";
    promoCodeUsed?: promoCodeData;
    paymentMethod: string;
    note?: string;
    addToAddressBook: boolean;
    totalAmount: number;
    shippingFee: number;
  }

  interface shippingFeeData {
    shippingFee: number;
    valid: boolean;
  }
}
