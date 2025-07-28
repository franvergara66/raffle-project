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

  const handlePhases = (id) => {
    navigate(`/lottery/${id}/phases`);
  };

  const handleBonus = (id) => {
    navigate(`/lottery/${id}/bonuses`);
  };

  const toggleStatus = async (id) => {
    const token = localStorage.getItem('token');
    await fetch(`${process.env.REACT_APP_API_URL}/api/v1/lotteries/${id}/status`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
    });
    setLotteries((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: l.status ? 0 : 1 } : l))
    );
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
                <button className="btn btn-sm btn-secondary me-1" onClick={() => handleEdit(l.id)}>Edit</button>
                <button className="btn btn-sm btn-info me-1" onClick={() => handlePhases(l.id)}>Phases</button>
                <button className="btn btn-sm btn-success me-1" onClick={() => handleBonus(l.id)}>Bonuses</button>
                <button className="btn btn-sm btn-warning" onClick={() => toggleStatus(l.id)}>Toggle</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LotteryList;
