import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { apiFetch } from '../utils/api';

function Profile() {
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const [admin, setAdmin] = useState({
    name: storedUser.name || '',
    email: storedUser.email || '',
    username: storedUser.username || '',
    image: storedUser.image || '',
  });
  const [preview, setPreview] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiFetch(
          `${process.env.REACT_APP_API_URL}/api/v1/admin/profile`
        );
        if (res.ok) {
          const data = await res.json();
          setAdmin(data);
        } else {
          toast.error('Failed to load profile');
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

  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    const reader = new FileReader();
    reader.onloadend = () => {
      setAdmin({ ...admin, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiFetch(`${process.env.REACT_APP_API_URL}/api/v1/admin/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: admin.name, email: admin.email, image: admin.image }),
      });
      if (res.ok) {
        const data = await res.json();
        setAdmin(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        window.dispatchEvent(new Event('profileUpdated'));
        toast.success('Profile updated');
      } else {
        toast.error('Failed to update profile');
      }
    } catch (err) {
      console.error('Update error', err);
      toast.error('Error updating profile');
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
                      preview ||
                      (admin.image
                        ? admin.image.startsWith('data')
                          ? admin.image
                          : `/assets/admin/images/profile/${admin.image}`
                        : '/assets/admin/images/profile/profile.png')
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
                      <label>Image</label>
                      <div className="image--uploader w-100">
                        <div className="image-upload-wrapper">
                          <div
                            className="image-upload-preview"
                            style={{
                              backgroundImage: `url(${
                                preview ||
                                (admin.image
                                  ? admin.image.startsWith('data')
                                    ? admin.image
                                    : `/assets/admin/images/profile/${admin.image}`
                                  : '/assets/admin/images/profile/profile.png')
                              })`,
                            }}
                          ></div>
                          <div className="image-upload-input-wrapper">
                            <input
                              type="file"
                              className="image-upload-input"
                              id="image-upload-input"
                              accept=".png, .jpg, .jpeg"
                              onChange={handleImageChange}
                            />
                            <label htmlFor="image-upload-input" className="bg--primary">
                              <i className="la la-cloud-upload"></i>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2">
                        <small className="mt-3 text-muted">
                          Supported Files: <b>.png, .jpg, .jpeg.</b> Image will be resized into{' '}
                          <b>400x400</b>px
                        </small>
                      </div>
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
