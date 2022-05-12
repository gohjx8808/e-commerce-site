import { PageProps } from "gatsby";
import React from "react";
import MessengerChat from "./MessengerChat";
import SEO from "./modules/SEO";

const WrapPageElement = (props: PageProps) => {
  const { children } = props;
  return (
    <div>
      {children}
      <MessengerChat />
      <SEO {...props} />
    </div>
  );
};

export default WrapPageElement;
