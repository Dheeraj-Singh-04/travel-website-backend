import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import app from "./src/app.js";
// For development only
import cors from "cors";
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;

// server start

app.listen(PORT, () => {
  console.log(`Server start on the PORT ${PORT}`);
});

//http://localhost:5000
