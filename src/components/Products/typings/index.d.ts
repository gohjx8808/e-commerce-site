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
}
