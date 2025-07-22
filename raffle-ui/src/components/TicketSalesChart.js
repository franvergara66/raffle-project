import React, { useEffect, useRef } from 'react';

const TicketSalesChart = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/tickets`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const tickets = res.ok ? await res.json() : [];
        const counts = {};
        tickets.forEach((t) => {
          const d = new Date(t.createdAt).toISOString().slice(0, 10);
          counts[d] = (counts[d] || 0) + 1;
        });
        const labels = Object.keys(counts).sort();
        const data = labels.map((l) => counts[l]);
        if (window.Chart) {
          new window.Chart(canvasRef.current.getContext('2d'), {
            type: 'line',
            data: {
              labels,
              datasets: [
                {
                  label: 'Tickets',
                  data,
                  borderColor: 'rgba(75,192,192,1)',
                  fill: false,
                },
              ],
            },
          });
        }
      } catch (err) {
        console.error('Error loading chart', err);
      }
    };
    fetchData();
  }, []);

  return <canvas ref={canvasRef} height="200"></canvas>;
};

export default TicketSalesChart;
