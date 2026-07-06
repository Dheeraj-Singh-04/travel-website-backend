import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import Admin from "../src/models/admin.model.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URL);

const hashedPassword = await bcrypt.hash("admin123", 10);

await Admin.create({
  name: "admin",
  email: "admin@gmail.com",
  password: hashedPassword,
  role: "super-admin",
});

console.log("Admin created");

process.exit();
