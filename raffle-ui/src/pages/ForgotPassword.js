import React, { useState } from 'react';
import { toast } from 'react-toastify';

function ForgotPassword() {
  const [step, setStep] = useState('request');
  const [type, setType] = useState('email');
  const [value, setValue] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const sendResetCode = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/send-reset-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, value }),
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
    <div className="login-page" style={{ minHeight: '100vh' }}>
      <div className="login-box">
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <h1><b>Admin</b>Forgot Password</h1>
          </div>
          <div className="card-body">
            {step === 'request' && (
              <form onSubmit={sendResetCode}>
                <div className="mb-3">
                  <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="email">Email</option>
                    <option value="username">Username</option>
                  </select>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter value"
                    onChange={(e) => setValue(e.target.value)}
                    required
                  />
                </div>
                <div className="row">
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary btn-block">Send Code</button>
                  </div>
                </div>
              </form>
            )}

            {step === 'verify' && (
              <form onSubmit={verifyResetCode}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Code"
                    onChange={(e) => setCode(e.target.value)}
                    required
                  />
                </div>
                <div className="row">
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary btn-block">Verify Code</button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
