import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
  {
    countryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: false,
    },

    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
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
  },
);

destinationSchema.index({ countryId: 1 });
destinationSchema.index({ isFeatured: 1 });

const Destination = mongoose.model("Destination", destinationSchema);
export default Destination;
