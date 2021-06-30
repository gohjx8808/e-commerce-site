import React, { ReactElement } from 'react';

import { Provider } from 'react-redux';
import store from './store';

interface WrappedWithProviderOwnProps{
  element:ReactElement
}

export default (props:WrappedWithProviderOwnProps) => {
  const { element } = props;
  return <Provider store={store}>{element}</Provider>;
};
