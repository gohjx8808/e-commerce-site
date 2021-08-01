declare namespace products{
  interface rawProductQueryData{
    allContentfulProducts:{
      edges:innerProductQueryData[]
    }
  }

  interface innerProductQueryData{
    node:productData
  }

  interface productData{
    category:string
    contentful_id:string
    name:string
    price:number
    contentDescription:productContentDescription
    productImage:import('gatsby-plugin-image').ImageDataLike[]
  }

  interface productContentDescription{
    raw:string
  }

  interface submitCheckoutPayload{
    priceID:string
  }

  interface shoppingCartItemData{
    id:string
    quantity:number
    img?:import('gatsby-plugin-image').IGatsbyImageData
    name:string
    price:string
    itemPrice:string
  }

  interface checkoutData{
    price:string
    quantity:number
  }

  interface submitShippingInfoPayload{
    fullName:string
    email: string
    phoneNo: string
    addressLine1: string
    postcode: string
    city: string
    state: optionsData
    outsideMalaysiaState: string
    country: string
  }

  interface sendEmailPayload{
    fullName:string
    email: string
    phoneNo: string
    addressLine1: string
    addressLine2:string
    postcode: string
    city: string
    state: optionsData
    outsideMalaysiaState: string
    country: string
    currentOrderCount:number
    paymentOptions:string
    totalAmount:number
    shippingFee:number
    selectedCheckoutItems:shoppingCartItemData[]
  }
}
