"use client";

import { useState } from "react";
import { JobList } from "@/components/job-list";
import { JobFilters } from "@/components/job-filters";
import { CreateJobForm } from "@/components/create-job-form";
import { JobQueryParams } from "@/lib/types";
import Link from "next/link";

export default function HomePage() {
  const [filters, setFilters] = useState<Omit<JobQueryParams, "cursor">>({
    order: "newest",
  });
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">💼</span>
              <h1 className="text-xl font-bold text-gray-900">Job Board</h1>
            </Link>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              {showCreateForm ? "Tutup" : "+ Tambah Job"}
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Create Job Form */}
        {showCreateForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Tambah Pekerjaan Baru
            </h2>
            <CreateJobForm onSuccess={() => setShowCreateForm(false)} />
          </div>
        )}

        {/* Filters */}
        <JobFilters filters={filters} onFilterChange={setFilters} />

        {/* Job List with Infinite Scroll */}
        <JobList filters={filters} />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
          <p>© 2025 Job Board. Built with Next.js & Express.js</p>
        </div>
      </footer>
    </div>
  );
}
