"use client";

import { useCategories } from "@/hooks/useJobs";
import { JobQueryParams } from "@/lib/types";

interface JobFiltersProps {
  filters: Omit<JobQueryParams, "cursor">;
  onFilterChange: (filters: Omit<JobQueryParams, "cursor">) => void;
}

export function JobFilters({ filters, onFilterChange }: JobFiltersProps) {
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search input */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Cari
          </label>
          <input
            id="search"
            type="text"
            placeholder="Cari nama, posisi, atau kategori..."
            value={filters.search || ""}
            onChange={(e) =>
              onFilterChange({ ...filters, search: e.target.value || undefined })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        {/* Category filter */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Kategori
          </label>
          <select
            id="category"
            value={filters.category || ""}
            onChange={(e) =>
              onFilterChange({ ...filters, category: e.target.value || undefined })
            }
            disabled={categoriesLoading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-100"
          >
            <option value="">Semua Kategori</option>
            {categories?.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Order filter */}
        <div>
          <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-1">
            Urutkan
          </label>
          <select
            id="order"
            value={filters.order || "newest"}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                order: e.target.value as JobQueryParams["order"],
              })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          >
            <option value="newest">Terbaru</option>
            <option value="oldest">Terlama</option>
            <option value="az">A-Z (Posisi)</option>
            <option value="za">Z-A (Posisi)</option>
          </select>
        </div>
      </div>

      {/* Clear filters button */}
      {(filters.search || filters.category || filters.order !== "newest") && (
        <div className="mt-4">
          <button
            onClick={() => onFilterChange({ order: "newest" })}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            Hapus semua filter
          </button>
        </div>
      )}
    </div>
  );
}
