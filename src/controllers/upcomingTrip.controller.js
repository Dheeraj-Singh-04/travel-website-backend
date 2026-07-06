import mongoose from "mongoose";
import UpcomingTrip from "../models/upcomingTrip.model.js";

// controller for public route
export const upcomingTrip = async (req, res) => {
  try {
    const trips = await UpcomingTrip.find();

    return res.status(200).json({
      success: true,
      count: trips.length,
      data: trips,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// controller for admin route's

// controller to create new UpcomingTrip
export const createUpcomingTrip = async (req, res) => {
  try {
    const tripData = req.body;

    // validate package ID
    if (!tripData.packageId) {
      return res.status(400).json({
        success: false,
        message: "Package ID is required.",
      });
    }

    // create upcoming trip
    const newTrip = await UpcomingTrip.create(tripData);

    return res.status(201).json({
      success: true,
      message: "Upcoming trip created successfully.",
      data: newTrip,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// controller to update the UpcomingTrip
export const updateUpcomingTrip = async (req, res) => {
  try {
    const tripID = req.params.id;
    const updatedData = req.body;

    // check trip ID is valid or not
    if (!mongoose.Types.ObjectId.isValid(tripID)) {
      return res.status(400).json({
        success: false,
        message: "Invalid trip ID.",
      });
    }

    const updatedTrip = await UpcomingTrip.findByIdAndUpdate(
      tripID,
      updatedData,
      {
        new: true,
        runValidators: true,
      },
    );

    // check trip exist or not
    if (!updatedTrip) {
      return res.status(404).json({
        success: false,
        message: "Upcoming trip not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Upcoming trip updated successfully.",
      data: updatedTrip,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// controller to delete the UpcomingTrip
export const deleteUpcomingTrip = async (req, res) => {
  try {
    const tripID = req.params.id;

    // check trip ID is valid or not
    if (!mongoose.Types.ObjectId.isValid(tripID)) {
      return res.status(400).json({
        success: false,
        message: "Invalid trip ID.",
      });
    }

    const deletedTrip = await UpcomingTrip.findByIdAndDelete(tripID);

    // check trip exist or not
    if (!deletedTrip) {
      return res.status(404).json({
        success: false,
        message: "Upcoming trip not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Upcoming trip deleted successfully.",
      data: deletedTrip,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};