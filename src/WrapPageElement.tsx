import React, { ReactElement } from 'react';
import MessengerChat from './MessengerChat';

interface WrapPageElementOwnProps{
  element:ReactElement
}

const WrapPageElement = (props:WrapPageElementOwnProps) => {
  const { element } = props;
  return (
    <div>
      {element}
      <MessengerChat />
    </div>
  );
};

export default WrapPageElement;
