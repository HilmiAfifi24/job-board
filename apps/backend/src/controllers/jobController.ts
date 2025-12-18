import { Request, Response } from "express";
import { jobsData } from "../data/jobs.js";
import { Job, JobQueryParams, PaginatedResponse, CreateJobDTO } from "../types/job.js";

// Default pagination limit
const DEFAULT_LIMIT = 6;

/**
 * GET /api/jobs
 * List jobs with search, filter, ordering, and cursor-based pagination
 */
export const getJobs = (req: Request, res: Response): void => {
  const {
    search,
    category,
    order = "newest",
    cursor,
    limit = DEFAULT_LIMIT,
  } = req.query as unknown as JobQueryParams;

  let jobs = jobsData.getAll();

  // Filter by search (name, jobPosition, category)
  if (search) {
    const searchLower = search.toLowerCase();
    jobs = jobs.filter(
      (job) =>
        job.name.toLowerCase().includes(searchLower) ||
        job.jobPosition.toLowerCase().includes(searchLower) ||
        job.category.toLowerCase().includes(searchLower)
    );
  }

  // Filter by category
  if (category) {
    jobs = jobs.filter(
      (job) => job.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Sort jobs
  switch (order) {
    case "oldest":
      jobs.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      break;
    case "az":
      jobs.sort((a, b) => a.jobPosition.localeCompare(b.jobPosition));
      break;
    case "za":
      jobs.sort((a, b) => b.jobPosition.localeCompare(a.jobPosition));
      break;
    case "newest":
    default:
      jobs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
  }

  const total = jobs.length;
  const limitNum = Number(limit);

  // Cursor-based pagination
  let startIndex = 0;
  if (cursor) {
    const cursorIndex = jobs.findIndex((job) => job.id === cursor);
    if (cursorIndex !== -1) {
      startIndex = cursorIndex + 1;
    }
  }

  // Get paginated data
  const paginatedJobs = jobs.slice(startIndex, startIndex + limitNum);
  const hasMore = startIndex + limitNum < total;
  const nextCursor = hasMore ? paginatedJobs[paginatedJobs.length - 1]?.id : null;

  const response: PaginatedResponse<Job> = {
    data: paginatedJobs,
    nextCursor,
    hasMore,
    total,
  };

  res.json(response);
};

/**
 * GET /api/jobs/:id
 * Get a single job by ID
 */
export const getJobById = (req: Request, res: Response): void => {
  const { id } = req.params;
  const job = jobsData.getById(id);

  if (!job) {
    res.status(404).json({ error: "Job not found" });
    return;
  }

  res.json(job);
};

/**
 * POST /api/jobs
 * Create a new job
 */
export const createJob = (req: Request, res: Response): void => {
  const { name, jobPosition, category } = req.body as CreateJobDTO;

  // Basic validation
  if (!name || !jobPosition || !category) {
    res.status(400).json({
      error: "Validation failed",
      details: {
        name: !name ? "Name is required" : undefined,
        jobPosition: !jobPosition ? "Job position is required" : undefined,
        category: !category ? "Category is required" : undefined,
      },
    });
    return;
  }

  const newJob = jobsData.create({ name, jobPosition, category });
  res.status(201).json(newJob);
};

/**
 * GET /api/categories
 * Get all unique categories
 */
export const getCategories = (_req: Request, res: Response): void => {
  const categories = jobsData.getCategories();
  res.json(categories);
};
