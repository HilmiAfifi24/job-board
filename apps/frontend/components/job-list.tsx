"use client";

import { useEffect, useRef, useCallback } from "react";
import { useInfiniteJobs } from "@/hooks/useJobs";
import { JobCard, JobCardSkeleton } from "./job-card";
import { JobQueryParams } from "@/lib/types";

interface JobListProps {
  filters: Omit<JobQueryParams, "cursor">;
}

export function JobList({ filters }: JobListProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteJobs(filters);

  // Ref for intersection observer
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Callback for intersection observer
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  // Setup intersection observer
  useEffect(() => {
    const element = loadMoreRef.current;
    
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "100px",
      threshold: 0,
    });

    if (element) {
      observerRef.current.observe(element);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  // Loading state
  if (isLoading) {
    return (
      <div className="grid gap-4">
        {[...Array(6)].map((_, i) => (
          <JobCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg mb-2">Terjadi Kesalahan</div>
        <p className="text-gray-600">
          {error?.message || "Gagal memuat data pekerjaan"}
        </p>
      </div>
    );
  }

  // Flatten all pages data
  const jobs = data?.pages.flatMap((page) => page.data) ?? [];
  const total = data?.pages[0]?.total ?? 0;

  // Empty state
  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📭</div>
        <div className="text-gray-600 text-lg mb-2">Tidak Ada Pekerjaan</div>
        <p className="text-gray-500">
          {filters.search || filters.category
            ? "Tidak ada pekerjaan yang sesuai dengan filter Anda"
            : "Belum ada pekerjaan yang tersedia"}
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Results count */}
      <div className="text-sm text-gray-500 mb-4">
        Menampilkan {jobs.length} dari {total} pekerjaan
      </div>

      {/* Job list */}
      <div className="grid gap-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {/* Load more trigger element */}
      <div ref={loadMoreRef} className="h-10 mt-4">
        {isFetchingNextPage && (
          <div className="flex justify-center items-center gap-2 text-gray-500">
            <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            <span>Memuat lebih banyak...</span>
          </div>
        )}
        {!hasNextPage && jobs.length > 0 && (
          <div className="text-center text-gray-500 py-4">
            Semua pekerjaan sudah ditampilkan
          </div>
        )}
      </div>
    </div>
  );
}
