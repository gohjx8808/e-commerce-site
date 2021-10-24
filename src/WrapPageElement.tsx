import React from 'react';
import MessengerChat from './MessengerChat';

const WrapPageElement = ({ element }) => (
  <div>
    {element}
    <MessengerChat />
  </div>

);

export default WrapPageElement;
