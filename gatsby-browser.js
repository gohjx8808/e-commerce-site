import React from 'react';
import RootLayout from './src/layouts/RootLayout';
import WrapPageElement from './src/WrapPageElement';
import '@fontsource/amaranth';
import { toggleLoadingOverlay } from './src/modules/overlay/src/overlayReducer';

// eslint-disable-next-line react/jsx-filename-extension
export const wrapRootElement = ({ element }) => <RootLayout>{element}</RootLayout>;

export const wrapPageElement = WrapPageElement;

export const onInitialClientRender = () => {
  toggleLoadingOverlay(true);
};
