export const sameAddressDetector = (
  currentAddressList: auth.addressData[],
  insertAddress: auth.addressData
) => {
  const foundAddress = currentAddressList.findIndex((address) => {
    const sameAddressLine1 =
      address.addressLine1 === insertAddress.addressLine1;
    const sameAddressLine2 =
      address.addressLine2 === insertAddress.addressLine2;
    const samePostcode = address.postcode === insertAddress.postcode;
    const sameCity = address.city === insertAddress.city;
    const sameState = address.state === insertAddress.state;
    const sameForeignState =
      address.outsideMalaysiaState === insertAddress.outsideMalaysiaState;
    const sameCountry = address.country === insertAddress.country;

    return (
      sameAddressLine1 &&
      sameAddressLine2 &&
      samePostcode &&
      sameCity &&
      sameState &&
      sameForeignState &&
      sameCountry
    );
  });

  return foundAddress !== -1;
};

export const removeDefaultAddress = (addressList: auth.addressData[]) => {
  const removedDefault = addressList.map((address) => {
    if (address.defaultOption === "1") {
      // eslint-disable-next-line no-param-reassign
      address = { ...address, defaultOption: "0" };
    }
    return address;
  });
  return removedDefault;
};
