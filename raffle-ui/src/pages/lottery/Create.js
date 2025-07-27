import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LotteryCreate() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [detail, setDetail] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/lotteries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name, price, detail, image }),
    });
    if (res.ok) {
      navigate('/lottery');
    }
  };

  return (
    <div className="bodywrapper__inner">
      <h6 className="page-title">Create Lottery</h6>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div className="mb-2">
          <input placeholder="Name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-2">
          <input type="number" placeholder="Price" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div className="mb-2">
          <textarea placeholder="Detail" className="form-control" value={detail} onChange={(e) => setDetail(e.target.value)} />
        </div>
        <div className="mb-2">
          <input placeholder="Image URL" className="form-control" value={image} onChange={(e) => setImage(e.target.value)} />
        </div>
        <button className="btn btn-primary" type="submit">Save</button>
      </form>
    </div>
  );
}

export default LotteryCreate;
