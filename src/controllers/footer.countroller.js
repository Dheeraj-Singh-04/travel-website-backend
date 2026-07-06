import mongoose from "mongoose";
import Footer from "../models/footerSetting.model.js";

// public route
export const footerContent = async (req, res) => {
  try {
    const footerData = await Footer.find();

    return res.status(200).json({
      success: true,
      count: footerData.length,
      data: footerData,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// controller for admin

// controller for footer settings
export const getFooterSettings = async (req, res) => {
  try {
    const footerSettings = await Footer.findOne();

    // check footer settings exist or not
    if (!footerSettings) {
      return res.status(404).json({
        success: false,
        message: "Footer settings not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Footer settings fetched successfully.",
      data: footerSettings,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// controller for updating the footer settings
export const updateFooterSettings = async (req, res) => {
  try {
    const footerID = req.params.id;
    const updatedData = req.body;

    // check footer ID is valid or not
    if (!mongoose.Types.ObjectId.isValid(footerID)) {
      return res.status(400).json({
        success: false,
        message: "Invalid footer ID.",
      });
    }

    const updatedFooter = await Footer.findByIdAndUpdate(
      footerID,
      updatedData,
      {
        new: true,
        runValidators: true,
      },
    );

    // check footer exist or not
    if (!updatedFooter) {
      return res.status(404).json({
        success: false,
        message: "Footer settings not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Footer settings updated successfully.",
      data: updatedFooter,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};