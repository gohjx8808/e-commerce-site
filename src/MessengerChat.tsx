import React, { useEffect } from 'react';

declare global {
  interface Window {
      FB:any;
      fbAsyncInit:()=>void
  }
}

function MessengerChat() {
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '1214227789043974',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v12.0',
      });
    };
    (function (d, s, id) {
      let js;
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      // eslint-disable-next-line prefer-const
      js = d.createElement(s);
      js.id = id;
      // @ts-ignore
      js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
      fjs.parentNode!.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  });
  return (
    <>
      <div id="fb-root" />
      <div
        className="fb-customerchat"
        // @ts-ignore
        attribution="page_inbox"
        page_id="1927588117459422"
        theme_color="#B67B5E"
      />
    </>
  );
}

export default MessengerChat;
