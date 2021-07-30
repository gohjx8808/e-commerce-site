// eslint-disable-next-line import/prefer-default-export
export const formatPrice = (amount:number, currency:string) => {
  const numberFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
  });
  return numberFormat.format(amount);
};
