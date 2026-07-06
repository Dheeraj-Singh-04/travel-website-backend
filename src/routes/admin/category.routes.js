import express from "express";
import {
  getCategoryData,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../controllers/category.controller.js";
import { adminAuth } from "../../middleware/adminAuth.middleware.js";
const router = express.Router();

// route to get category content
router.get("/admin/categories", getCategoryData);

// route for creating new category
router.post("/admin/categories", adminAuth, createCategory);

// route for updating category
router.put("/admin/categories/:id", adminAuth, updateCategory);

// route for delete category
router.delete("/admin/categories/:id", adminAuth, deleteCategory);

export default router;
