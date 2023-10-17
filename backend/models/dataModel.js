import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  maintenanceTicket: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  closedAt: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["in progress", "closed"],
    required: true,
    default: "in progress", 
  },
});

export default mongoose.model("Data", dataSchema);
