// Job entity type (shared with backend)
export interface Job {
  id: string;
  name: string;
  jobPosition: string;
  category: string;
  createdAt: string;
}

// DTO for creating a job
export interface CreateJobDTO {
  name: string;
  jobPosition: string;
  category: string;
}

// Paginated response for infinite scroll
export interface PaginatedResponse<T> {
  data: T[];
  nextCursor: string | null;
  hasMore: boolean;
  total: number;
}

// Query parameters for listing jobs
export interface JobQueryParams {
  search?: string;
  category?: string;
  order?: "newest" | "oldest" | "az" | "za";
  cursor?: string;
  limit?: number;
}

// Form state for useActionState
export interface FormState {
  success: boolean;
  message: string;
  errors?: {
    name?: string[];
    jobPosition?: string[];
    category?: string[];
  };
}
