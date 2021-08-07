export const loadState = () => {
  try {
    const serialState = localStorage.getItem('appState');
    if (serialState === null) {
      return undefined;
    }
    const parseState = JSON.parse(serialState);
    parseState.product.productFilterKeyword = null;
    parseState.account.isEditAccDetailModalDisplay = false;
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
