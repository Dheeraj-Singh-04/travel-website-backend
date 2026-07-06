import express from "express";
const router = express.Router();
import {
  getFooterSettings,
  updateFooterSettings,
} from "../../controllers/footer.countroller.js";
import { adminAuth } from "../../middleware/adminAuth.middleware.js";


// route for getting footer settings
router.get("/admin/footer", adminAuth, getFooterSettings);

// route for updating the footer settings
router.put("/admin/footer", adminAuth, updateFooterSettings);

export default router;
