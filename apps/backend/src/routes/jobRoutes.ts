import { Router } from "express";
import {
  getJobs,
  getJobById,
  createJob,
  getCategories,
} from "../controllers/jobController.js";

const router = Router();

// GET /api/jobs - List jobs with pagination, search, filter, and ordering
router.get("/jobs", getJobs);

// GET /api/categories - Get all unique categories
router.get("/categories", getCategories);

// GET /api/jobs/:id - Get a single job by ID
router.get("/jobs/:id", getJobById);

// POST /api/jobs - Create a new job
router.post("/jobs", createJob);

export default router;
