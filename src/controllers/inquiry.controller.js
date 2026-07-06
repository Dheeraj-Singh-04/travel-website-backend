import Inquiry from "../models/inquiry.model.js";

// public route
export const formSubmit = async (req, res) => {
  try {
    const data = req.body;
    const inquiry = await Inquiry.create(data);
    res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully.",
      data: inquiry,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// controller for the admin

// controller for getting inquiries
export const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find();
    res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// controller for updating the inquiry status or solve queries
export const updateInquiryStatus = async (req, res) => {
  try {
    const inquiryID = req.params.id;
    const { status } = req.body;

    // check id is valid or not
    if (!mongoose.Types.ObjectId.isValid(inquiryID)) {
      return res.status(400).json({
        success: false,
        message: "Invalid inquiry ID.",
      });
    }

    // check status
    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required.",
      });
    }

    const updatedInquiry = await Inquiry.findByIdAndUpdate(
      inquiryID,
      { status },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedInquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Inquiry updated successfully",
      data: updatedInquiry,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// controller to delete the inquiry
export const deleteInquiry = async (req, res) => {
  try {
    const inquiryID = req.params.id;

    // check id is valid or not
    if (!mongoose.Types.ObjectId.isValid(inquiryID)) {
      return res.status(400).json({
        success: false,
        message: "Invalid inquiry ID",
      });
    }

    const deleteInquiry=await Inquiry.findByIdAndDelete
  } catch (err) {}
};
