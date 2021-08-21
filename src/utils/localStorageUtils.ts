import { defaultAddressData } from './constants';

export const loadState = () => {
  try {
    const serialState = localStorage.getItem('appState');
    if (serialState === null) {
      return undefined;
    }
    const parseState = JSON.parse(serialState);
    parseState.product.productFilterKeyword = null;
    parseState.overlay.isLoadingOverlayOpen = false;
    parseState.account.isEditAccDetailModalDisplay = false;
    parseState.account.isAddressModalOpen = false;
    parseState.account.isDeleteAddressConfirmationModalOpen = false;
    parseState.account.selectedAddress = defaultAddressData;
    parseState.auth.isSignOutConfirmationModalOpen = false;
    parseState.status.isStatusModalOpen = false;
    parseState.product.isEnlargedProductImageBackdropOpen = false;
    parseState.product.selectedCheckoutItemsID = [];
    return parseState;
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state:any) => {
  try {
    const serialState = JSON.stringify(state);
    localStorage.setItem('appState', serialState);
  } catch (err) {
    console.log(err);
  }
};
