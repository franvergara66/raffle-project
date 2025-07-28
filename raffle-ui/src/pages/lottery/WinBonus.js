import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function WinBonus() {
  const { id } = useParams();
  const [lottery, setLottery] = useState(null);
  const [bonuses, setBonuses] = useState([]);
  const [levels, setLevels] = useState(0);
  const [formLevels, setFormLevels] = useState([]);

  const token = localStorage.getItem('token');

  const fetchData = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    const resLottery = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/lotteries/${id}`, { headers });
    if (resLottery.ok) {
      const data = await resLottery.json();
      setLottery(data);
    }
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/lotteries/${id}/bonuses`, { headers });
    if (res.ok) {
      const data = await res.json();
      setBonuses(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const generateLevels = () => {
    const arr = [];
    for (let i = 1; i <= levels; i++) {
      arr.push({ level: i, amount: '' });
    }
    setFormLevels(arr);
  };

  const handleAmountChange = (idx, value) => {
    const arr = [...formLevels];
    arr[idx].amount = value;
    setFormLevels(arr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
    const body = JSON.stringify({ levels: formLevels });
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/lotteries/${id}/bonuses`, { method: 'POST', headers, body });
    if (res.ok) {
      setLevels(0);
      setFormLevels([]);
      fetchData();
    }
  };

  return (
    <div className="bodywrapper__inner">
      <h6 className="page-title">Win Bonus</h6>
      {lottery && <p><strong>{lottery.name}</strong></p>}
      <div className="row">
        <div className="col-md-6">
          <h6>Current Setting</h6>
          <table className="table">
            <thead>
              <tr>
                <th>Level</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {bonuses.map((b) => (
                <tr key={b.id}>
                  <td>{b.level}</td>
                  <td>{b.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          <h6>Change Setting</h6>
          <div className="mb-3 d-flex">
            <input type="number" className="form-control me-2" value={levels} onChange={(e) => setLevels(e.target.value)} placeholder="How many winner" />
            <button className="btn btn-primary" type="button" onClick={generateLevels}>Generate</button>
          </div>
          {formLevels.length > 0 && (
            <form onSubmit={handleSubmit}>
              {formLevels.map((f, idx) => (
                <div className="input-group mb-2" key={idx}>
                  <span className="input-group-text">{f.level}</span>
                  <input type="number" className="form-control" value={f.amount} onChange={(e) => handleAmountChange(idx, e.target.value)} required placeholder="Win Bonus" />
                </div>
              ))}
              <button className="btn btn-primary" type="submit">Save</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default WinBonus;
