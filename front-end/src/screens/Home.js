import React, { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";

function Home() {
  const [tickets, setTickets] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newTicket, setNewTicket] = useState({
    name: "",
    email: "",
    maintenanceTicket: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/data/tickets")
      .then((response) => {
        const { tickets } = response.data;
        setTickets(tickets);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [tickets]);

  const addTicket = () => {
    if (newTicket.name && newTicket.email && newTicket.maintenanceTicket) {
      axios
        .post("http://localhost:8080/data/create", {
          name: newTicket.name,
          email: newTicket.email,
          maintenanceTicket: newTicket.maintenanceTicket,
          status: "in progress",
        })
        .then((response) => {
          setTickets([...tickets, response.data]);
        })
        .catch((error) => {
          console.error("Error adding a new ticket:", error);
        });

      setNewTicket({
        name: "",
        email: "",
        maintenanceTicket: "",
      });
      setShowPopup(false);
    }
  };

  const closeTicket = (ticketId) => {
    axios
      .put(`http://localhost:8080/data/close/${ticketId}`, { status: "closed" })
      .then(() => {
        const updatedTickets = tickets.map((ticket) => {
          if (ticket._id === ticketId) {
            return { ...ticket, status: "closed" };
          }
          return ticket;
        });
        setTickets(updatedTickets);
      })
      .catch((error) => {
        console.error("Error closing the ticket:", error);
      });
  };

  return (
    <div className="home-container">
      <h1>Welcome to Your Ticket Manager</h1>
      <button className="add-btn" onClick={() => setShowPopup(true)}>
        Add New Ticket +
      </button>

      {showPopup && (
        <div className="popup-container">
          <div className="popup">
            <input
              type="text"
              placeholder="Name"
              value={newTicket.name}
              onChange={(e) =>
                setNewTicket({ ...newTicket, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Email"
              value={newTicket.email}
              onChange={(e) =>
                setNewTicket({ ...newTicket, email: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Maintenance Ticket"
              value={newTicket.maintenanceTicket}
              onChange={(e) =>
                setNewTicket({
                  ...newTicket,
                  maintenanceTicket: e.target.value,
                })
              }
            />
            <button className="add-btn" onClick={addTicket}>
              Add
            </button>
            <button className="cancel-btn" onClick={() => setShowPopup(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <table className="ticket-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Maintenance Ticket</th>
            <th>Created At</th>
            <th>Closed At</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr
              key={ticket._id}
              style={{
                backgroundColor: ticket.status === "closed" ? "red" : "white",
              }}
            >
              <td>{ticket.name}</td>
              <td>{ticket.email}</td>
              <td>{ticket.maintenanceTicket}</td>
              <td>{new Date(ticket.createdAt).toLocaleString()}</td>
              <td>
                {ticket.closedAt
                  ? new Date(ticket.closedAt).toLocaleString()
                  : ""}
              </td>
              <td>{ticket.status}</td>
              <td>
                {ticket.status === "in progress" && (
                  <button onClick={() => closeTicket(ticket._id)}>Close</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
