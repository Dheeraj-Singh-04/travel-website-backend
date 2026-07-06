import Destination from "../models/destination.model.js";

// public route
export const getDestination = async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.status(200).json({
      success: true,
      count: destinations.length,
      data: destinations,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// get specific destination
export const destinationDetail = async (req, res) => {
  try {
    const destinationID = req.params.id;

    // check destinationID is valid or not
    if (!mongoose.Types.ObjectId.isValid(destinationID)) {
      return res.status(400).json({
        success: false,
        message: "Invalid destination ID.",
      });
    }

    const findDestination = await Destination.findById(destinationID);

    // check destination exist or not in database
    if (!findDestination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Destination found successfully",
      data: findDestination,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

// admin controller
// controller for creating new destination
export const createDestination = async (req, res) => {
  try {
    const {
      countryId,
      title,
      shortDescription,
      description,
      heroImage,
      gallery,
      isFeatured,
      isActive,
    } = req.body;

    // Validate title
    if (!title || title.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Destination title is required.",
      });
    }

    // Generate slug
    const slug = title
      .trim()
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/\s+/g, "-");

    // Check duplicate
    const existingDestination = await Destination.findOne({
      $or: [{ title: title.trim() }, { slug }],
    });

    if (existingDestination) {
      return res.status(409).json({
        success: false,
        message: "Destination already exists.",
      });
    }

    // Create destination
    const newDestination = await Destination.create({
      countryId,
      title: title.trim(),
      slug,
      shortDescription,
      description,
      heroImage,
      gallery,
      isFeatured,
      isActive,
    });

    return res.status(201).json({
      success: true,
      message: "Destination created successfully.",
      data: newDestination,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// controller for updating the destination
export const updateDestination = async (req, res) => {
  try {
    const destinationId = req.params.id;
    const updateData = req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(destinationId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid destination ID.",
      });
    }

    // Update slug if title changes
    if (updateData.title) {
      updateData.slug = updateData.title
        .trim()
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/\s+/g, "-");
    }

    const updatedDestination = await Destination.findByIdAndUpdate(
      destinationId,
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedDestination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Destination updated successfully.",
      data: updatedDestination,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// controller for deleting the destination
export const deleteDestination = async (req, res) => {
  try {
    const destinationId = req.params.id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(destinationId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid destination ID.",
      });
    }

    const deletedDestination =
      await Destination.findByIdAndDelete(destinationId);

    if (!deletedDestination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Destination deleted successfully.",
      data: deletedDestination,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
