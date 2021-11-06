import React from 'react';
import RootLayout from './src/layouts/RootLayout';
import WrapPageElement from './src/WrapPageElement';
import '@fontsource/amaranth';

// eslint-disable-next-line react/jsx-filename-extension
export const wrapRootElement = ({ element }) => <RootLayout>{element}</RootLayout>;

export const wrapPageElement = WrapPageElement;
