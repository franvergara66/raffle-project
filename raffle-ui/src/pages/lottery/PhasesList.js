import React, { useEffect, useState } from 'react';

function PhasesList() {
  const token = localStorage.getItem('token');
  const [phases, setPhases] = useState([]);
  const [search, setSearch] = useState('');
  const [date, setDate] = useState('');
  const [lotteries, setLotteries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    lottery_id: '',
    start: '',
    end: '',
    quantity: '',
    at_dr: '1',
  });
  const [editingId, setEditingId] = useState(null);
  const [soldCount, setSoldCount] = useState(0);

  const fetchPhases = async () => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (date) {
      const [s, e] = date.split(' - ');
      if (s && e) {
        params.append('start', s);
        params.append('end', e);
      }
    }
    const url = `${process.env.REACT_APP_API_URL}/api/v1/lotteries/phases?${params.toString()}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setPhases(data);
    }
  };

  const fetchLotteries = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/lotteries`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setLotteries(data.filter((l) => l.status === 1));
    }
  };

  useEffect(() => {
    fetchLotteries();
  }, []);

  useEffect(() => {
    fetchPhases();
  }, [search, date]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setForm({ lottery_id: '', start: '', end: '', quantity: '', at_dr: '1' });
    setEditingId(null);
    setSoldCount(0);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
    let url;
    let method;
    const body = { ...form };
    if (editingId) {
      body.available = Number(form.quantity) - soldCount;
      url = `${process.env.REACT_APP_API_URL}/api/v1/lotteries/phases/${editingId}`;
      method = 'PUT';
    } else {
      url = `${process.env.REACT_APP_API_URL}/api/v1/lotteries/${form.lottery_id}/phases`;
      method = 'POST';
    }
    const res = await fetch(url, { method, headers, body: JSON.stringify(body) });
    if (res.ok) {
      closeModal();
      fetchPhases();
    }
  };

  const editPhase = (p) => {
    setForm({
      lottery_id: p.lottery_id,
      start: p.start ? p.start.substring(0, 10) : '',
      end: p.end ? p.end.substring(0, 10) : '',
      quantity: p.quantity,
      at_dr: String(p.at_dr),
    });
    setSoldCount(p.salled || 0);
    setEditingId(p.id);
    setShowModal(true);
  };

  const toggleStatus = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/api/v1/lotteries/phases/${id}/status`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchPhases();
  };

  return (
    <div className="bodywrapper__inner">
      <div className="d-flex mb-30 flex-wrap gap-3 justify-content-between align-items-center">
        <h6 className="page-title">Lottery Phases</h6>
        <div className="d-flex flex-wrap justify-content-end gap-2 align-items-center breadcrumb-plugins">
          <form
            className="d-flex flex-wrap gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              fetchPhases();
            }}
          >
            <div className="input-group w-auto flex-fill">
              <input
                type="search"
                name="search"
                className="form-control bg--white"
                placeholder="Lottery Name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn--primary" type="submit">
                <i className="la la-search"></i>
              </button>
            </div>
            <div className="input-group w-auto flex-fill">
              <input
                type="text"
                className="form-control bg--white pe-2"
                placeholder="Start Date - End Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <button className="btn btn--primary input-group-text" type="submit">
                <i className="la la-search"></i>
              </button>
            </div>
          </form>

          <button className="btn btn-sm btn-outline--primary" type="button" onClick={openModal}>
            <i className="las la-plus"></i>Add new
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body p-0">
              <div className="table-responsive--sm table-responsive">
                <table className="table--light style--two table">
                  <thead>
                    <tr>
                      <th>SL</th>
                      <th>Image</th>
                      <th>Lottery Name | Phase Number</th>
                      <th>Ticket Qty</th>
                      <th>Sold Tickets | Remaining Qty</th>
                      <th>Start Date | Draw Date</th>
                      <th>Draw Status | Draw Type</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className="list">
                    {phases.map((p, idx) => (
                      <tr key={p.id}>
                        <td>{idx + 1}</td>
                        <td>
                          <div className="customer-details d-block">
                            <a className="thumb" href="javascript:void(0)">
                              {p.image && <img src={p.image} alt="image" />}
                            </a>
                          </div>
                        </td>
                        <td>
                          <span className="fw-bold">{p.lottery_name}</span>
                          <br />Phase# {p.phase_number}
                        </td>
                        <td>{p.quantity}</td>
                        <td>
                          <span className="fw-bold">{p.salled}</span>
                          <br />
                          {p.available}
                        </td>
                        <td>
                          {p.start?.substring(0, 10)}
                          <br />
                          {p.end?.substring(0, 10)}
                        </td>
                        <td>
                          <span className={`badge badge--${p.draw_status ? 'success' : 'primary'}`}>
                            {p.draw_status ? 'Complete' : 'Running'}
                          </span>
                          <br />
                          <span className={`badge badge--${p.at_dr === 1 ? 'success' : 'warning'}`}>
                            {p.at_dr === 1 ? 'Auto Draw' : 'Manual Draw'}
                          </span>
                        </td>
                        <td>
                          <span className={`badge badge--${p.status ? 'success' : 'danger'}`}>
                            {p.status ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          <div className="button-group">
                            <button
                              className="btn btn-outline--primary btn-sm"
                              onClick={() => editPhase(p)}
                            >
                              <i className="las la-pen"></i>Edit
                            </button>
                            <button
                              className="btn btn-sm btn-outline--danger ms-1"
                              onClick={() => toggleStatus(p.id)}
                            >
                              <i className="la la-eye-slash"></i>{' '}
                              {p.status ? 'Inactive' : 'Active'}
                            </button>
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
      </div>

      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingId ? 'Edit Lottery Phase' : 'Add Lottery Phase'}
                </h5>
                <button type="button" className="close" onClick={closeModal}>
                  <i className="las la-times"></i>
                </button>
              </div>
              <form onSubmit={submitForm}>
                <div className="modal-body">
                  <div className="form-group">
                    <label className="required">Lottery</label>
                    <select
                      className="form-control"
                      name="lottery_id"
                      required
                      value={form.lottery_id}
                      onChange={handleChange}
                      disabled={!!editingId}
                    >
                      <option value="" disabled>
                        Select One
                      </option>
                      {lotteries.map((l) => (
                        <option key={l.id} value={l.id}>
                          {l.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="required">Start Date</label>
                    <input
                      type="date"
                      name="start"
                      className="form-control bg--white"
                      value={form.start}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="required">Draw Date</label>
                    <input
                      type="date"
                      name="end"
                      className="form-control bg--white"
                      value={form.end}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="required">Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      className="form-control"
                      value={form.quantity}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="required">Draw Type</label>
                    <select
                      className="form-control"
                      name="at_dr"
                      value={form.at_dr}
                      onChange={handleChange}
                      required
                    >
                      <option value="1">Auto Draw</option>
                      <option value="2">Manual Draw</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn--primary" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PhasesList;

