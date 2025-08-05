import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { apiFetch } from '../utils/api';

function Password() {
  const [admin, setAdmin] = useState({ name: '', email: '', username: '', image: '' });
  const [form, setForm] = useState({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiFetch(`${process.env.REACT_APP_API_URL}/api/v1/admin/profile`);
        if (res.ok) {
          const data = await res.json();
          setAdmin(data);
        }
      } catch (err) {
        console.error('Error fetching profile', err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.current_password || !form.password || !form.password_confirmation) {
      toast.error('All fields are required');
      return;
    }
    if (form.password !== form.password_confirmation) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const res = await apiFetch(`${process.env.REACT_APP_API_URL}/api/v1/admin/change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || 'Password updated');
        setForm({ current_password: '', password: '', password_confirmation: '' });
      } else {
        toast.error(data.message || 'Failed to update password');
      }
    } catch (err) {
      console.error('Error updating password', err);
      toast.error('Error updating password');
    }
  };

  return (
    <div className="bodywrapper__inner">
      <div className="row mb-none-30">
        <div className="col-xl-3 col-lg-4 mb-30">
          <div className="card b-radius--5 overflow-hidden">
            <div className="card-body p-0">
              <div className="d-flex p-3 bg--primary align-items-center">
                <div className="avatar avatar--lg">
                  <img
                    src={
                      admin.image
                        ? admin.image.startsWith('data')
                          ? admin.image
                          : `/assets/admin/images/profile/${admin.image}`
                        : '/assets/admin/images/profile/profile.png'
                    }
                    alt="profile"
                  />
                </div>
                <div className="ps-3">
                  <h4 className="text--white">{admin.name}</h4>
                </div>
              </div>
              <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Name <span className="fw-bold">{admin.name}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Username <span className="fw-bold">{admin.username}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Email <span className="fw-bold">{admin.email}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-xl-9 col-lg-8 mb-30">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4 border-bottom pb-2">Change Password</h5>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="old_password" className="required">Password</label>
                  <input
                    className="form-control"
                    type="password"
                    name="current_password"
                    id="old_password"
                    required
                    value={form.current_password}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="required">New Password</label>
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    id="password"
                    required
                    value={form.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password_confirmation" className="required">Confirm Password</label>
                  <input
                    className="form-control"
                    type="password"
                    name="password_confirmation"
                    id="password_confirmation"
                    required
                    value={form.password_confirmation}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn--primary w-100 btn-lg h-45">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Password;
