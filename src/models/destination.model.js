// models/destination.model.js

const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
  {
    countryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    shortDescription: String,

    description: String,

    heroImage: String,

    gallery: [String],

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

destinationSchema.index({ countryId: 1 });
destinationSchema.index({ slug: 1 });

module.exports = mongoose.model(
  "Destination",
  destinationSchema
);