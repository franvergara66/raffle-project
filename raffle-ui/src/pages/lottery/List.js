import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function LotteryList() {
  const navigate = useNavigate();
  const [lotteries, setLotteries] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/lotteries`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          const withCounts = await Promise.all(
            data.map(async (l) => {
              let phaseCount = 0;
              let drawCount = 0;
              try {
                const pres = await fetch(
                  `${process.env.REACT_APP_API_URL}/api/v1/lotteries/${l.id}/phases`,
                  { headers: { Authorization: `Bearer ${token}` } }
                );
                if (pres.ok) {
                  const phases = await pres.json();
                  phaseCount = phases.length;
                  drawCount = phases.filter((p) => p.draw_status === 1).length;
                }
              } catch (err) {
                console.error('fetch phases', err);
              }
              return { ...l, phaseCount, drawCount };
            })
          );
          setLotteries(withCounts);
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

  const filtered = lotteries.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bodywrapper__inner">
      <div className="d-flex mb-3 justify-content-between align-items-center">
        <h6 className="page-title">Lotteries</h6>
        <div className="d-flex gap-2">
          <input
            type="search"
            className="form-control"
            placeholder="Search lottery"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link
            to="/lottery/create"
            className="btn btn-sm btn-outline--primary d-flex align-items-center"
          >
            <i className="la la-plus me-1" />Add New
          </Link>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Total Phase</th>
            <th>Total Draw</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((l, idx) => (
            <tr key={l.id}>
              <td>{idx + 1}</td>
              <td>{l.image && <img src={l.image} alt="thumb" style={{ width: 50 }} />}</td>
              <td>{l.name}</td>
              <td>{l.price}</td>
              <td>{l.phaseCount}</td>
              <td>{l.drawCount}</td>
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
