import React, { useEffect } from 'react';

/**
 * Simple wrapper to load and render Google reCAPTCHA.
 * Explicitly renders the captcha once the script has loaded.
 */
const Recaptcha = ({ siteKey, onVerify }) => {
  useEffect(() => {
    const scriptId = 'recaptcha-script';

    const renderCaptcha = () => {
      if (window.grecaptcha && siteKey) {
        window.grecaptcha.render('recaptcha-container', {
          sitekey: siteKey,
          callback: onVerify,
        });
      }
    };

    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.onload = renderCaptcha;
      document.body.appendChild(script);
    } else {
      // script already loaded, try rendering immediately
      renderCaptcha();
    }
  }, [siteKey, onVerify]);

  return <div id="recaptcha-container" />;
};

export default Recaptcha;
