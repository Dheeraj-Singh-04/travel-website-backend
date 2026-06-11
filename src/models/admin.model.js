// models/admin.model.js

const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    name: String,

    email: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: [
        "super-admin",
        "admin",
        "editor",
      ],
      default: "editor",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    lastLogin: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Admin",
  adminSchema
);