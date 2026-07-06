import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import Admin from "../src/models/admin.model.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URL);

// Hash password from .env
const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

// Check if admin already exists
const adminExist = await Admin.findOne({
  email: process.env.ADMIN_EMAIL,
});

if (adminExist) {
  console.log("Admin already exists.");
  process.exit();
}

// Create Admin
await Admin.create({
  name: process.env.ADMIN_NAME,
  email: process.env.ADMIN_EMAIL,
  password: hashedPassword,
  role: "super-admin",
});

console.log("Admin created");

process.exit();
