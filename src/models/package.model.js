// models/package.model.js

const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema(
  {
    day: Number,
    title: String,
    description: String,
  },
  { _id: false }
);

const packageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    destinationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: true,
    },

    countryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },

    categoryIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],

    durationDays: Number,

    durationNights: Number,

    price: Number,

    discountedPrice: Number,

    maxTravelers: Number,

    rating: {
      type: Number,
      default: 0,
    },

    reviewCount: {
      type: Number,
      default: 0,
    },

    shortDescription: String,

    description: String,

    highlights: [String],

    inclusions: [String],

    exclusions: [String],

    itinerary: [itinerarySchema],

    coverImage: String,

    gallery: [String],

    featured: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

packageSchema.index({ slug: 1 });
packageSchema.index({ countryId: 1 });
packageSchema.index({ destinationId: 1 });
packageSchema.index({ categoryIds: 1 });
packageSchema.index({ price: 1 });

module.exports = mongoose.model(
  "Package",
  packageSchema
);