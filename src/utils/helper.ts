export const formatPrice = (amount:number, currency:string) => {
  const numberFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
  });
  return numberFormat.format(amount);
};

export const internationalPhoneNumberFormatter = (phoneNumber:number|string) => {
  const strPhoneNumber = phoneNumber.toString();
  return `+${strPhoneNumber.substring(0, 2)} ${strPhoneNumber.substring(2, 4)}-${strPhoneNumber.substring(4, 7)} ${strPhoneNumber.substring(7)}`;
};
