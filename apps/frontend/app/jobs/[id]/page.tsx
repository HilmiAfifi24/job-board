"use client";

import { useJob } from "@/hooks/useJobs";
import Link from "next/link";
import { use } from "react";

interface JobDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = use(params);
  const { data: job, isLoading, isError, error } = useJob(id);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-24 mb-8"></div>
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
              <div className="h-8 bg-gray-200 rounded w-32 mb-8"></div>
              <div className="h-4 bg-gray-200 rounded w-40"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8"
          >
            ← Kembali ke Daftar
          </Link>
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-red-500 text-6xl mb-4">❌</div>
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              Pekerjaan Tidak Ditemukan
            </h1>
            <p className="text-gray-600 mb-6">
              {error?.message || "Pekerjaan yang Anda cari tidak tersedia"}
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8 transition-colors"
        >
          ← Kembali ke Daftar
        </Link>

        {/* Job detail card */}
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Job Position */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {job.jobPosition}
          </h1>

          {/* Company Name */}
          <p className="text-lg text-gray-600 mb-4">{job.name}</p>

          {/* Category badge */}
          <span className="inline-block px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-full mb-6">
            {job.category}
          </span>

          {/* Divider */}
          <hr className="my-6" />

          {/* Additional info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-600">
              <span className="text-xl">🏢</span>
              <div>
                <div className="text-sm text-gray-500">Perusahaan</div>
                <div className="font-medium">{job.name}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-600">
              <span className="text-xl">💼</span>
              <div>
                <div className="text-sm text-gray-500">Posisi</div>
                <div className="font-medium">{job.jobPosition}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-600">
              <span className="text-xl">📂</span>
              <div>
                <div className="text-sm text-gray-500">Kategori</div>
                <div className="font-medium">{job.category}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-600">
              <span className="text-xl">📅</span>
              <div>
                <div className="text-sm text-gray-500">Tanggal Posting</div>
                <div className="font-medium">
                  {new Date(job.createdAt).toLocaleDateString("id-ID", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="mt-8">
            <button className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Lamar Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
