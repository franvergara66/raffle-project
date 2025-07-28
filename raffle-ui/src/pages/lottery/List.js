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
        <div className="d-flex flex-wrap justify-content-end gap-2 align-items-center breadcrumb-plugins">
          <form className="d-flex flex-wrap gap-2" onSubmit={(e) => e.preventDefault()}>
            <div className="input-group w-auto flex-fill">
              <input
                type="search"
                id="search"
                name="search"
                className="form-control bg--white"
                placeholder="Search lottery"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn--primary" type="submit">
                <i className="la la-search" />
              </button>
            </div>
          </form>
          <Link
            to="/lottery/create"
            className="btn btn-sm btn-outline--primary"
          >
            <i className="la la-plus" />Add New
          </Link>
        </div>
      </div>
      <div className="card">
        <div className="card-body p-0">
          <div className="table-responsive--sm table-responsive">
            <table className="table table--light style--two">
              <thead>
                <tr>
                  <th>S.N.</th>
                  <th>Image</th>
                  <th>Lottery Name</th>
                  <th>Price</th>
                  <th>Total Phase</th>
                  <th>Total Draw</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((l, idx) => (
                  <tr key={l.id}>
                    <td data-label="S.N.">{idx + 1}</td>
                    <td data-label="Image">
                      <div className="customer-details d-block">
                        <a className="thumb" href="javascript:void(0)">
                          {l.image && <img src={l.image} alt="image" />}
                        </a>
                      </div>
                    </td>
                    <td data-label="Lottery Name">{l.name}</td>
                    <td data-label="Price">${l.price}</td>
                    <td data-label="Total Phase">{l.phaseCount}</td>
                    <td data-label="Total Draw">{l.drawCount}</td>
                    <td data-label="Status">
                      <span className={`badge badge--${l.status ? 'success' : 'danger'}`}>{l.status ? 'Active' : 'Inactive'}</span>
                    </td>
                    <td data-label="Action">
                      <div className="button--group">
                        <button
                          className="btn btn-sm btn-outline--primary editBtn"
                          onClick={() => handleEdit(l.id)}
                        >
                          <i className="la la-pen"></i> Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline--danger confirmationBtn"
                          onClick={() => toggleStatus(l.id)}
                        >
                          <i className={`la ${l.status ? 'la-eye-slash' : 'la-eye'}`}></i>{' '}
                          {l.status ? 'Inactive' : 'Active'}
                        </button>
                        <button
                          className="btn btn-sm btn-outline--info dropdown-toggle"
                          data-bs-toggle="dropdown"
                          type="button"
                          aria-expanded="false"
                        >
                          <i className="la la-ellipsis-v"></i>More
                        </button>
                        <div className="dropdown-menu">
                          <li>
                            <button
                              className="dropdown-item text--info"
                              onClick={() => handleBonus(l.id)}
                            >
                              <i className="las la-trophy"></i> Set Win Bonus
                            </button>
                          </li>
                          <li>
                            <button
                              className="dropdown-item text--warning"
                              onClick={() => handlePhases(l.id)}
                            >
                              <i className="fas fa-layer-group"></i> Ticket phases
                            </button>
                          </li>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LotteryList;
