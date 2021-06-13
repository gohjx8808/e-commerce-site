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
  }

  interface submitCheckoutPayload{
    priceID:string
  }
}
