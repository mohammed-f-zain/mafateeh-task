import express from "express";
import {
  insertTicket,
  closeTicket,
  getAllTickets,
  getTicketById,
} from "../controller/dataController.js";

const router = express.Router();

// Create a new ticket
router.post("/create", insertTicket);

// Close a ticket by its ID
router.put("/close/:id", closeTicket);

// Get all tickets
router.get("/tickets", getAllTickets);

// Get a ticket by its ID
router.get("/tickets/:id", getTicketById);

export default router;
