import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Recaptcha from '../components/Recaptcha';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');


  const loginHandler = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      toast.error('Email and password are required');
      return;
    }
  
    if (!captchaToken) {
      toast.error('Please complete the captcha');
      return;
    }
  
    const toastId = toast.loading('Signing in...');
  
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/admins/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, captchaToken }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
  
        toast.update(toastId, {
          render: 'Login successful',
          type: 'success',
          isLoading: false,
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
        });
  
        setTimeout(() => {
          navigate('/Dashboard');
        }, 5000); // Give toast time to display
      } else {
        toast.update(toastId, {
          render: data.message || 'Login failed',
          type: 'error',
          isLoading: false,
          autoClose: 5000,
        });
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.update(toastId, {
        render: 'Network or server error',
        type: 'error',
        isLoading: false,
        autoClose: 5000,
      });
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
                  <h3 className="title text-white">
                    Welcome to <strong>LottoLab</strong>
                  </h3>
                  <p className="text-white">Admin Login to LottoLab Dashboard</p>
                </div>
                <div className="login-wrapper__body">
                  <form
                    onSubmit={loginHandler}
                    className="cmn-form mt-30 login-form"
                  >
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
                    <div className="form-group">
                      <div className="d-flex justify-content-between">
                        <label htmlFor="password" className="required">
                          Password
                        </label>
                        <Link to="/forgot-password" className="forget-text">
                          Forgot Password?
                        </Link>
                      </div>
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group text-center my-3">
                      <Recaptcha
                        siteKey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                        onVerify={setCaptchaToken}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn cmn-btn w-100"
                      style={{
                        backgroundColor: '#3d2bfb',
                        color: '#fff',
                        height: '50px',
                        marginTop: '15px',
                        borderRadius: '3.2px',
                      }}
                    >
                      LOGIN
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;