// models/footerSetting.model.js

const mongoose = require("mongoose");

const footerSettingSchema = new mongoose.Schema(
  {
    quickLinks: [
      {
        label: String,
        url: String,
      },
    ],

    destinations: [
      {
        label: String,
        slug: String,
      },
    ],

    specialCategories: [
      {
        label: String,
        slug: String,
      },
    ],

    socialLinks: {
      facebook: String,
      instagram: String,
      youtube: String,
      linkedin: String,
    },

    contactInfo: {
      phone: String,
      email: String,
      address: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "FooterSetting",
  footerSettingSchema
);