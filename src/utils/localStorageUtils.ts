import { defaultAddressData } from './constants';

export const loadState = () => {
  try {
    if (typeof localStorage !== 'undefined') {
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
      parseState.product.isEnlargedProductImageModalOpen = false;
      return parseState;
    }
    return undefined;
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state:any) => {
  try {
    if (typeof localStorage !== 'undefined') {
      const serialState = JSON.stringify(state);
      localStorage.setItem('appState', serialState);
    }
  } catch (err) {
    console.log(err);
  }
};
