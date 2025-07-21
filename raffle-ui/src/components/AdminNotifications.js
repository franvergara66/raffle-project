import React, { useEffect, useState } from 'react';

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/v1/admin-notifications`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.ok) {
          const data = await res.json();
          setNotifications(data);
        }
      } catch (err) {
        console.error('Error fetching notifications', err);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div>
      <h3>Admin Notifications</h3>
      <ul>
        {notifications.map((n) => (
          <li key={n.id}>{n.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminNotifications;
