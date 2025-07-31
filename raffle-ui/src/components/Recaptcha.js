import React, { useEffect } from 'react';

const Recaptcha = ({ siteKey, onVerify }) => {
  useEffect(() => {
    const scriptId = 'recaptcha-script';

    const initCaptcha = () => {
      console.log('[reCAPTCHA] Script cargado');
      if (!window.grecaptcha) {
        console.error('[reCAPTCHA] grecaptcha no está disponible');
        return;
      }

      window.grecaptcha.ready(() => {
        console.log('[reCAPTCHA] grecaptcha.ready ejecutado');

        const container = document.getElementById('recaptcha-container');
        if (container) {
          container.innerHTML = ''; // limpiar si fue renderizado antes
        }

        window.grecaptcha.render('recaptcha-container', {
          sitekey: siteKey,
          callback: onVerify,
        });
      });
    };

    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.onload = initCaptcha;
      document.body.appendChild(script);
    } else {
      // ya está cargado, intenta iniciar directamente
      initCaptcha();
    }
  }, [siteKey, onVerify]);

  return <div id="recaptcha-container" style={{ minHeight: 80 }} />;
};

export default Recaptcha;
