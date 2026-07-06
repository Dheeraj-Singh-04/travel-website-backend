import Category from "../models/category.model.js";

export const getCategoryData = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// controller for admin route's

// creating new category
export const createCategory = async (req, res) => {
  try {
    const { name, description, icon, isActive } = req.body;

    // Validate input
    if (!name || name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Category name is required.",
      });
    }

    // Generate slug
    const slug = name.trim().toLowerCase().replace(/\s+/g, "-");

    // Check if category already exists
    const existingCategory = await Category.findOne({
      $or: [{ name: name.trim() }, { slug }],
    });

    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: "Category already exists.",
      });
    }

    // Create category
    const category = await Category.create({
      name: name.trim(),
      description,
      icon,
      isActive,
      slug,
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully.",
      data: category,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

// updating category
export const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;

    // check id is valid or not
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID.",
      });
    }

    // find the document/record
    const existCategory = await Category.findById(id);

    if (!existCategory) {
      return res.status(404).json({
        message: "Category not exist",
      });
    }

    // if document/record exist in the database
    const data = req.body;

    if (data.name) {
      data.slug = data.name.toLowerCase().trim().replace(/\s+/g, "-");
    }

    // update the document
    const updatedCategory = await Category.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Category updated Successfully",
      data: updatedCategory,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// delete category
export const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;

    // check id is valid or not
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID.",
      });
    }
    const deletedCategory = await Category.findByIdAndDelete(id);
    // check document exist or not
    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: deletedCategory,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
