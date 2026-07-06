import express from "express";
import { getCategoryData } from "../controllers/category.controller.js";
const router = express.Router();

// route for fetch category
router.get("/categories", getCategoryData);

export default router;
