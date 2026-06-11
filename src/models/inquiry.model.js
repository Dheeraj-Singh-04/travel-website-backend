// models/inquiry.model.js

const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
  {
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
    },

    destinationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
    },

    name: String,

    email: String,

    phone: String,

    message: String,

    status: {
      type: String,
      enum: [
        "new",
        "contacted",
        "closed",
        "spam",
      ],
      default: "new",
    },

    source: {
      type: String,
      default: "website",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Inquiry",
  inquirySchema
);