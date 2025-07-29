import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function Profile() {
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const [admin, setAdmin] = useState({
    name: storedUser.name || '',
    email: storedUser.email || '',
    username: storedUser.username || '',
    image: storedUser.image || '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/admin/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setAdmin(data);
        } else {
          toast.error('Failed to load profile', { autoClose: 5000 });
        }
      } catch (err) {
        console.error('Error loading profile', err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/admin/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: admin.name, email: admin.email, image: admin.image }),
      });
      if (res.ok) {
        const data = await res.json();
        setAdmin(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        toast.success('Profile updated', { autoClose: 5000 });
      } else {
        toast.error('Failed to update profile', { autoClose: 5000 });
      }
    } catch (err) {
      console.error('Update error', err);
      toast.error('Error updating profile', { autoClose: 5000 });
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
                  <img src={admin.image || '/assets/images/avatar.png'} alt="profile" />
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
              <h5 className="card-title mb-4 border-bottom pb-2">Profile Information</h5>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Name</label>
                      <input className="form-control" name="name" value={admin.name} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input className="form-control" name="email" type="email" value={admin.email} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label>Image URL</label>
                      <input className="form-control" name="image" value={admin.image || ''} onChange={handleChange} />
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn--primary btn-block btn-lg">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
