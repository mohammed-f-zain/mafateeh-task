import Data from "../models/dataModel.js";

// Create a new ticket
export const insertTicket = async (req, res) => {
  try {
    const { name, email, password, maintenanceTicket } = req.body;

    const newTicket = new Data({
      name,
      email,
      password,
      maintenanceTicket,
      createdAt: new Date(),
    });

    await newTicket.save();

    
    res.status(201).json({ message: "Ticket created successfully" });
  } catch (error) {
    
    console.error("Error inserting ticket:", error);
    res.status(500).json({ error: "Failed to insert ticket" });
  }
};

// Find the ticket by ID and update the 'closedAt' field
export const closeTicket = async (req, res) => {
  try {
    const ticketId = req.params.id; 
    const ticket = await Data.findByIdAndUpdate(
      ticketId,
      { closedAt: new Date(), status: "closed" },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.json({ message: "Ticket closed successfully", ticket });
  } catch (error) {
    console.error("Error closing ticket:", error);
    res.status(500).json({ error: "Failed to close ticket" });
  }
};

export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Data.find();
    res.json({ tickets });
  } catch (error) {
    console.error("Error getting all tickets:", error);
    res.status(500).json({ error: "Failed to get all tickets" });
  }
};

export const getTicketById = async (req, res) => {
  try {
    const ticketId = req.params.id; 
    const ticket = await Data.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.json({ ticket });
  } catch (error) {
    console.error("Error getting ticket by ID:", error);
    res.status(500).json({ error: "Failed to get the ticket" });
  }
};
