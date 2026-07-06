import mongoose from "mongoose";

const upcomingTripSchema = new mongoose.Schema(
  {
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      required: true,
    },

    departureDate: Date,

    returnDate: Date,

    totalSeats: Number,

    availableSeats: Number,

    price: Number,

    status: {
      type: String,
      enum: ["open", "sold-out", "cancelled", "completed"],
      default: "open",
    },
  },
  {
    timestamps: true,
  },
);

const UpcomingTrip = mongoose.model("UpcomingTrip", upcomingTripSchema);

export default UpcomingTrip;
