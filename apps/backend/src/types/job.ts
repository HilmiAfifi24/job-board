// Job entity type
export interface Job {
  id: string;
  name: string;
  jobPosition: string;
  category: string;
  createdAt: Date;
}

// DTO for creating a job
export interface CreateJobDTO {
  name: string;
  jobPosition: string;
  category: string;
}

// Query parameters for listing jobs
export interface JobQueryParams {
  search?: string;
  category?: string;
  order?: "newest" | "oldest" | "az" | "za";
  cursor?: string;
  limit?: number;
}

// Paginated response for infinite scroll
export interface PaginatedResponse<T> {
  data: T[];
  nextCursor: string | null;
  hasMore: boolean;
  total: number;
}
