const mongoose = require("mongoose");
const { type } = require("node:os");

const countrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowecase: true,
    },
    continent: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

countrySchema.index({ name: 1 });
countrySchema.index({ slug: 1 });

module.exports = mongoose.model("Country", countrySchema);