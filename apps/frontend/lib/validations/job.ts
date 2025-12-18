import { z } from "zod";

// Zod schema for job creation validation
export const createJobSchema = z.object({
  name: z
    .string()
    .min(1, "Nama perusahaan wajib diisi")
    .min(3, "Nama perusahaan minimal 3 karakter")
    .max(100, "Nama perusahaan maksimal 100 karakter"),
  jobPosition: z
    .string()
    .min(1, "Posisi pekerjaan wajib diisi")
    .min(2, "Posisi pekerjaan minimal 2 karakter")
    .max(100, "Posisi pekerjaan maksimal 100 karakter"),
  category: z
    .string()
    .min(1, "Kategori wajib diisi")
    .min(2, "Kategori minimal 2 karakter")
    .max(50, "Kategori maksimal 50 karakter"),
});

export type CreateJobInput = z.infer<typeof createJobSchema>;
