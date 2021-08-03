export const loadState = () => {
  try {
    const serialState = localStorage.getItem('appState');
    if (serialState === null) {
      return undefined;
    }
    return JSON.parse(serialState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state:any) => {
  try {
    state.product.productFilterKeyword = null;
    const serialState = JSON.stringify(state);
    localStorage.setItem('appState', serialState);
  } catch (err) {
    console.log(err);
  }
};
