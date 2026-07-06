import express from "express";
import { getTestimonials } from "../controllers/testimonial.controller.js";
const router = express.Router();

// get all testimonials
router.get("/testimonials", getTestimonials);

export default router;
