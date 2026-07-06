import mongoose from "mongoose";
import Testimonial from "../models/testimonial.model.js";

// controller for public route
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();

    return res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// controller for admin route's

// controller to create new testimonial
export const createTestimonials = async (req, res) => {
  try {
    const testimonialData = req.body;

    // validate traveler name
    if (
      !testimonialData.travelerName ||
      testimonialData.travelerName.trim() === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Traveler name is required.",
      });
    }

    // create testimonial
    const newTestimonial = await Testimonial.create(testimonialData);

    return res.status(201).json({
      success: true,
      message: "Testimonial created successfully.",
      data: newTestimonial,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// controller to update the testimonial
export const updateTestimonials = async (req, res) => {
  try {
    const testimonialID = req.params.id;
    const updatedData = req.body;

    // check testimonial ID is valid or not
    if (!mongoose.Types.ObjectId.isValid(testimonialID)) {
      return res.status(400).json({
        success: false,
        message: "Invalid testimonial ID.",
      });
    }

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      testimonialID,
      updatedData,
      {
        new: true,
        runValidators: true,
      },
    );

    // check testimonial exist or not
    if (!updatedTestimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Testimonial updated successfully.",
      data: updatedTestimonial,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// controller to delete the testimonial
export const deleteTestimonials = async (req, res) => {
  try {
    const testimonialID = req.params.id;

    // check testimonial ID is valid or not
    if (!mongoose.Types.ObjectId.isValid(testimonialID)) {
      return res.status(400).json({
        success: false,
        message: "Invalid testimonial ID.",
      });
    }

    const deletedTestimonial = await Testimonial.findByIdAndDelete(
      testimonialID,
    );

    // check testimonial exist or not
    if (!deletedTestimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully.",
      data: deletedTestimonial,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};