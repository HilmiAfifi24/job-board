"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Job, JobQueryParams, PaginatedResponse } from "@/lib/types";

// Fetch jobs with pagination (for infinite scroll)
async function fetchJobs(params: JobQueryParams): Promise<PaginatedResponse<Job>> {
  const searchParams = new URLSearchParams();
  
  if (params.search) searchParams.set("search", params.search);
  if (params.category) searchParams.set("category", params.category);
  if (params.order) searchParams.set("order", params.order);
  if (params.cursor) searchParams.set("cursor", params.cursor);
  if (params.limit) searchParams.set("limit", String(params.limit));

  const queryString = searchParams.toString();
  const url = `/api/jobs${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }

  return response.json();
}

// Fetch single job by ID
async function fetchJobById(id: string): Promise<Job> {
  const response = await fetch(`/api/jobs/${id}`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch job");
  }

  return response.json();
}

// Fetch categories
async function fetchCategories(): Promise<string[]> {
  const response = await fetch("/api/categories");
  
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
}

/**
 * Hook untuk infinite scroll job list dengan useInfiniteQuery
 */
export function useInfiniteJobs(params: Omit<JobQueryParams, "cursor"> = {}) {
  return useInfiniteQuery({
    queryKey: ["jobs", params],
    queryFn: ({ pageParam }) => fetchJobs({ ...params, cursor: pageParam }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => 
      lastPage.hasMore ? lastPage.nextCursor : undefined,
  });
}

/**
 * Hook untuk fetch single job
 */
export function useJob(id: string) {
  return useQuery({
    queryKey: ["job", id],
    queryFn: () => fetchJobById(id),
    enabled: !!id,
  });
}

/**
 * Hook untuk fetch categories
 */
export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
}
