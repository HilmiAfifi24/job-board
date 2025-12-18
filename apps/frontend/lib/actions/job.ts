"use server";

import { createJobSchema } from "@/lib/validations/job";
import { FormState } from "@/lib/types";
import { API_CONFIG } from "@/lib/config";
import { revalidatePath } from "next/cache";

/**
 * Server Action untuk membuat job baru
 * Menggunakan Zod validation dan mengembalikan FormState untuk useActionState
 */
export async function createJobAction(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // Extract form data
  const rawData = {
    name: formData.get("name") as string,
    jobPosition: formData.get("jobPosition") as string,
    category: formData.get("category") as string,
  };

  // Validate with Zod
  const validationResult = createJobSchema.safeParse(rawData);

  if (!validationResult.success) {
    const fieldErrors = validationResult.error.flatten().fieldErrors;
    return {
      success: false,
      message: "Validasi gagal. Periksa kembali input Anda.",
      errors: {
        name: fieldErrors.name,
        jobPosition: fieldErrors.jobPosition,
        category: fieldErrors.category,
      },
    };
  }

  try {
    // Send to backend via proxy
    const response = await fetch(`${API_CONFIG.BACKEND_URL}/api/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validationResult.data),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        message: error.error || "Gagal membuat job baru",
      };
    }

    // Revalidate jobs list
    revalidatePath("/");
    
    return {
      success: true,
      message: "Job berhasil dibuat!",
    };
  } catch (error) {
    console.error("Error creating job:", error);
    return {
      success: false,
      message: "Terjadi kesalahan server. Silakan coba lagi.",
    };
  }
}
