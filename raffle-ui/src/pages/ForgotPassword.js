import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Recaptcha from '../components/Recaptcha';

function ForgotPassword() {
  const [step, setStep] = useState('request');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');

  const sendResetCode = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Email is required');
      return;
    }
    if (!captchaToken) {
      toast.error('Please complete the captcha');
      return;
    }
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/send-reset-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, captchaToken }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message?.success?.[0] || 'Code sent');
        setEmail(data.data.email);
        setStep('verify');
      } else {
        toast.error(data.message?.error?.[0] || 'Error sending code');
      }
    } catch (err) {
      toast.error('Server error');
    }
  };

  const verifyResetCode = async (e) => {
    e.preventDefault();
    if (!code) {
      toast.error('Verification code is required');
      return;
    }
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/verify-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message?.success?.[0] || 'Code verified');
      } else {
        toast.error(data.message?.error?.[0] || 'Invalid code');
      }
    } catch (err) {
      toast.error('Server error');
    }
  };

  return (
    <div
      className="login-main"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/admin/images/1.jpg)`,
      }}
    >
      <div className="container custom-container">
        <div className="row justify-content-center">
          <div className="col-xxl-5 col-xl-5 col-lg-6 col-md-8 col-sm-11">
            <div className="login-area">
              <div className="login-wrapper">
                <div className="login-wrapper__top">
                  <h3 className="title text-white">Recover Account</h3>
                </div>
                <div className="login-wrapper__body">
                  {step === 'request' && (
                    <form onSubmit={sendResetCode} className="login-form">
                      <div className="form-group">
                        <label htmlFor="email" className="required">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="form-control"
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group text-center my-3">
                        <Recaptcha
                          siteKey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                          onVerify={setCaptchaToken}
                        />
                      </div>
                      <button type="submit" className="btn cmn-btn w-100">
                        Submit
                      </button>
                      <div className="text-center mt-3">
                        <Link to="/login" className="text-white">
                          <i className="las la-sign-in-alt" aria-hidden="true"></i>
                          Back to Login
                        </Link>
                      </div>
                    </form>
                  )}
                  {step === 'verify' && (
                    <form onSubmit={verifyResetCode} className="login-form">
                      <div className="form-group">
                        <label htmlFor="code" className="required">
                          Verification Code
                        </label>
                        <input
                          type="text"
                          id="code"
                          className="form-control"
                          onChange={(e) => setCode(e.target.value)}
                          required
                        />
                      </div>
                      <button type="submit" className="btn cmn-btn w-100">
                        Verify Code
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
