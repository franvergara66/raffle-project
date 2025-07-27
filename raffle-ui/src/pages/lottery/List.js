import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LotteryList() {
  const navigate = useNavigate();
  const [lotteries, setLotteries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/lotteries`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setLotteries(data);
        }
      } catch (err) {
        console.error('fetch lotteries', err);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (id) => {
    navigate(`/lottery/${id}/edit`);
  };

  return (
    <div className="bodywrapper__inner">
      <div className="d-flex mb-3 justify-content-between align-items-center">
        <h6 className="page-title">Lotteries</h6>
        <button className="btn btn-primary" onClick={() => navigate('/lottery/create')}>Create</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {lotteries.map((l) => (
            <tr key={l.id}>
              <td>{l.name}</td>
              <td>{l.price}</td>
              <td>{l.status ? 'Active' : 'Inactive'}</td>
              <td>
                <button className="btn btn-sm btn-secondary" onClick={() => handleEdit(l.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LotteryList;
