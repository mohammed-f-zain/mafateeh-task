import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import dataRoutes from "./routes/dataRoutes.js"

const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());

app.use("/data", dataRoutes);


const port = process.env.PORT;
const url = process.env.URL;

mongoose.connect(url).then(
  app.listen(port, () => {
    console.log(`App is listing on ${port}`);
  })
);
