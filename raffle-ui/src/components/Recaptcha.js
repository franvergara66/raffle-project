import React, { useEffect } from 'react';

const Recaptcha = ({ onVerify }) => {
  useEffect(() => {
    const scriptId = 'recaptcha-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://www.google.com/recaptcha/api.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
    window.verifyRecaptchaCallback = (token) => {
      if (onVerify) onVerify(token);
    };
    return () => {
      delete window.verifyRecaptchaCallback;
    };
  }, [onVerify]);

  return (
    <div
      className="g-recaptcha"
      data-sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
      data-callback="verifyRecaptchaCallback"
    ></div>
  );
};

export default Recaptcha;
