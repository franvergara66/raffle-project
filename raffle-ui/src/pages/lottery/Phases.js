import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function LotteryPhases() {
  const { id } = useParams();
  const [lottery, setLottery] = useState(null);
  const [phases, setPhases] = useState([]);
  const [form, setForm] = useState({ start: '', end: '', quantity: '', at_dr: '1' });
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem('token');

  const fetchData = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    const resLottery = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/lotteries/${id}`, { headers });
    if (resLottery.ok) {
      const data = await resLottery.json();
      setLottery(data);
    }
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/lotteries/${id}/phases`, { headers });
    if (res.ok) {
      const data = await res.json();
      setPhases(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
    const body = JSON.stringify(form);
    const url = editingId
      ? `${process.env.REACT_APP_API_URL}/api/v1/phases/${editingId}`
      : `${process.env.REACT_APP_API_URL}/api/v1/lotteries/${id}/phases`;
    const method = editingId ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers, body });
    if (res.ok) {
      setForm({ start: '', end: '', quantity: '', at_dr: '1' });
      setEditingId(null);
      fetchData();
    }
  };

  const editPhase = (phase) => {
    setForm({
      start: phase.start ? phase.start.substring(0, 16) : '',
      end: phase.end ? phase.end.substring(0, 16) : '',
      quantity: phase.quantity,
      at_dr: String(phase.at_dr),
    });
    setEditingId(phase.id);
  };

  const toggleStatus = async (pid) => {
    const headers = { Authorization: `Bearer ${token}` };
    await fetch(`${process.env.REACT_APP_API_URL}/api/v1/phases/${pid}/status`, { method: 'PATCH', headers });
    fetchData();
  };

  return (
    <div className="bodywrapper__inner">
      <h6 className="page-title">Lottery Phases</h6>
      {lottery && <p><strong>{lottery.name}</strong></p>}
      <form onSubmit={handleSubmit} className="mb-4" style={{ maxWidth: 500 }}>
        <div className="mb-2">
          <label>Start</label>
          <input type="datetime-local" name="start" className="form-control" value={form.start} onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <label>End</label>
          <input type="datetime-local" name="end" className="form-control" value={form.end} onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <label>Quantity</label>
          <input type="number" name="quantity" className="form-control" value={form.quantity} onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <label>Draw Type</label>
          <select name="at_dr" className="form-control" value={form.at_dr} onChange={handleChange} required>
            <option value="1">Auto</option>
            <option value="0">Manual</option>
          </select>
        </div>
        <button className="btn btn-primary" type="submit">{editingId ? 'Update' : 'Create'}</button>
        {editingId && <button type="button" className="btn btn-secondary ms-2" onClick={() => { setEditingId(null); setForm({ start: '', end: '', quantity: '', at_dr: '1' }); }}>Cancel</button>}
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>Phase</th>
            <th>Quantity</th>
            <th>Available</th>
            <th>Start</th>
            <th>End</th>
            <th>Status</th>
            <th>Draw</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {phases.map((p) => (
            <tr key={p.id}>
              <td>{p.phase_number}</td>
              <td>{p.quantity}</td>
              <td>{p.available}</td>
              <td>{p.start}</td>
              <td>{p.end}</td>
              <td>{p.status ? 'Active' : 'Inactive'}</td>
              <td>{p.at_dr ? 'Auto' : 'Manual'}</td>
              <td>
                <button className="btn btn-sm btn-secondary me-1" onClick={() => editPhase(p)}>Edit</button>
                <button className="btn btn-sm btn-warning" onClick={() => toggleStatus(p.id)}>Toggle</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LotteryPhases;
