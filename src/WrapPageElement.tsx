import { PageProps } from "gatsby";
import React from "react";
import MessengerChat from "./MessengerChat";

const WrapPageElement = (props: PageProps) => {
  const { children } = props;
  return (
    <div>
      {children}
      <MessengerChat />
    </div>
  );
};

export default WrapPageElement;
