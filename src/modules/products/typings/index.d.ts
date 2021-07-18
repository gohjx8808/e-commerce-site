declare namespace products{
  interface productDetails{
    name:string
    prices:productPriceData[]
  }

  interface productPriceData{
    id:string
    unit_amount:number
    currency:string
  }

  interface queryProductData{
    node:pricesData
  }

  interface pricesData{
    active:boolean
    currency:string
    id:string
    product?:productData
    unit_amount:number
    unit_amount_decimal:string
  }

  interface productData{
    description:string
    id:string
    images:string[]
    name:string
    type:string
    prices:pricesData
    localFiles: import('gatsby-plugin-image').ImageDataLike[];
  }

  interface submitCheckoutPayload{
    priceID:string
  }

  interface shoppingCartItemData{
    id:string
    quantity:number
    imgURL?:import('gatsby-plugin-image').ImageDataLike[]
    name:string
    price:string
  }
}
