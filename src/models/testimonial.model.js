// models/testimonial.model.js

const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
    },

    destinationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
    },

    travelerName: String,

    travelerImage: String,

    rating: {
      type: Number,
      min: 1,
      max: 5,
    },

    review: String,

    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Testimonial",
  testimonialSchema
);