import { PageProps } from 'gatsby';
import React from 'react';
import MessengerChat from './MessengerChat';
import SEO from './modules/SEO';
import { isSSR } from './utils/constants';

const WrapPageElement = (props:PageProps) => {
  const { children } = props;
  return (
    <div>
      {children}
      <MessengerChat />
      {!isSSR && <SEO {...props} />}
    </div>
  );
};

export default WrapPageElement;
