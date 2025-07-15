import React, { useState, useEffect } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API;

function App() {
  const [username, setUsername] = useState("");
  const [price, setPrice] = useState(10);
  const [message, setMessage] = useState("");
  const [tickets, setTickets] = useState([]);
  const [filterUser, setFilterUser] = useState("");

  const fetchAllTickets = async () => {
    try {
      const res = await axios.get(`${API}/api/v1/tickets`);
      setTickets(res.data);
    } catch (error) {
      console.error("Error al obtener todos los tickets:", error.message);
    }
  };

  const fetchTicketsByUser = async (username) => {
    try {
      const res = await axios.get(`${API}/api/v1/tickets/u/${username}`);
      setTickets(res.data);
    } catch (error) {
      console.error("Error al filtrar tickets:", error.message);
    }
  };

  const sellTicket = async () => {
    try {
      await axios.post(`${API}/api/v1/tickets/sell`, { username, price });
      setMessage("🎟️ Ticket vendido con éxito");
      setUsername("");
      setPrice(10);
      filterUser ? fetchTicketsByUser(filterUser) : fetchAllTickets();
    } catch (error) {
      setMessage("❌ Error al vender el ticket");
      console.error(error);
    }
  };

  const deleteTicket = async (id) => {
    try {
      await axios.delete(`${API}/api/v1/tickets/t/${id}`);
      setMessage("🗑️ Ticket eliminado");
      filterUser ? fetchTicketsByUser(filterUser) : fetchAllTickets();
    } catch (error) {
      console.error("Error al eliminar el ticket:", error.message);
    }
  };

  useEffect(() => {
    fetchAllTickets();
  }, []);

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterUser(value);
    if (value.trim() === "") {
      fetchAllTickets();
    } else {
      fetchTicketsByUser(value);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>🎟️ Vender Ticket</h1>

      <div style={{ marginBottom: "1rem" }}>
        <label>Usuario:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginLeft: "1rem", padding: "0.5rem" }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Precio:</label>
        <input
          type="number"
          min="1"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          style={{ marginLeft: "1rem", padding: "0.5rem" }}
        />
      </div>

      <button onClick={sellTicket} style={{ padding: "0.5rem 1rem" }}>
        Vender Ticket
      </button>

      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}

      <hr style={{ margin: "2rem 0" }} />

      <h2>📋 Tickets Vendidos</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label>Filtrar por usuario:</label>
        <input
          type="text"
          value={filterUser}
          onChange={handleFilterChange}
          placeholder="Escribe un nombre..."
          style={{ marginLeft: "1rem", padding: "0.5rem" }}
        />
      </div>

      {tickets.length === 0 ? (
        <p>No hay tickets para mostrar.</p>
      ) : (
        <table
          border="1"
          cellPadding="8"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Precio</th>
              <th>ID</th>
              <th>Fecha</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.username}</td>
                <td>${ticket.price}</td>
                <td>{ticket.id}</td>
                <td>{new Date(ticket.createdAt).toLocaleString()}</td>
                <td>
                  <button
                    onClick={() => deleteTicket(ticket.id)}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
