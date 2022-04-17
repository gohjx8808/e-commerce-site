export const formatPrice = (amount: number, currency: string) => {
  const numberFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
  });
  return numberFormat.format(amount);
};

export const internationalPhoneNumberFormatter = (
  phoneNumber: number | string
) => {
  const strPhoneNumber = phoneNumber.toString();
  return `+${strPhoneNumber.substring(0, 2)} ${strPhoneNumber.substring(
    2,
    4
  )}-${strPhoneNumber.substring(4, 7)} ${strPhoneNumber.substring(7)}`;
};

export const getProductVariationSuffix = (
  isKeyChainSeries: boolean,
  selectedItemVariation?: string
) => {
  let variationSuffix = "";
  if (isKeyChainSeries) {
    if (selectedItemVariation === "With Keychain") {
      variationSuffix = " (W)";
    } else {
      variationSuffix = " (N)";
    }
  }
  return variationSuffix;
};

export const compareString = (a: string, b: string) => {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  return 0;
};

export const roundTo2Dp = (value: number) => Number(value.toFixed(2));
