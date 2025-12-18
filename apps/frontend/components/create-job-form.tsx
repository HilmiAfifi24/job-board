"use client";

import { useActionState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createJobSchema, CreateJobInput } from "@/lib/validations/job";
import { createJobAction } from "@/lib/actions/job";
import { FormState } from "@/lib/types";
import { useQueryClient } from "@tanstack/react-query";

interface CreateJobFormProps {
  onSuccess?: () => void;
}

const initialState: FormState = {
  success: false,
  message: "",
};

export function CreateJobForm({ onSuccess }: CreateJobFormProps) {
  const queryClient = useQueryClient();
  const formRef = useRef<HTMLFormElement>(null);
  
  // useActionState for server action
  const [state, formAction, isPending] = useActionState(createJobAction, initialState);

  // react-hook-form for client-side validation
  const {
    register,
    formState: { errors },
    reset,
    trigger,
  } = useForm<CreateJobInput>({
    resolver: zodResolver(createJobSchema),
    mode: "onBlur",
  });

  // Handle success
  useEffect(() => {
    if (state.success) {
      reset();
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      onSuccess?.();
    }
  }, [state.success, reset, queryClient, onSuccess]);

  // Combine client and server errors
  const getFieldError = (field: keyof CreateJobInput) => {
    if (errors[field]?.message) {
      return errors[field].message;
    }
    if (state.errors?.[field]?.[0]) {
      return state.errors[field]![0];
    }
    return null;
  };

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      {/* Success message */}
      {state.success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          {state.message}
        </div>
      )}

      {/* Error message */}
      {!state.success && state.message && !state.errors && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {state.message}
        </div>
      )}

      {/* Name field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nama Perusahaan *
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          onBlur={() => trigger("name")}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
            getFieldError("name") ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Contoh: PT Teknologi Indonesia"
        />
        {getFieldError("name") && (
          <p className="mt-1 text-sm text-red-600">{getFieldError("name")}</p>
        )}
      </div>

      {/* Job Position field */}
      <div>
        <label htmlFor="jobPosition" className="block text-sm font-medium text-gray-700 mb-1">
          Posisi Pekerjaan *
        </label>
        <input
          id="jobPosition"
          type="text"
          {...register("jobPosition")}
          onBlur={() => trigger("jobPosition")}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
            getFieldError("jobPosition") ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Contoh: Frontend Developer"
        />
        {getFieldError("jobPosition") && (
          <p className="mt-1 text-sm text-red-600">{getFieldError("jobPosition")}</p>
        )}
      </div>

      {/* Category field */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Kategori *
        </label>
        <input
          id="category"
          type="text"
          {...register("category")}
          onBlur={() => trigger("category")}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
            getFieldError("category") ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Contoh: Technology"
        />
        {getFieldError("category") && (
          <p className="mt-1 text-sm text-red-600">{getFieldError("category")}</p>
        )}
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isPending && (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        )}
        {isPending ? "Menyimpan..." : "Tambah Pekerjaan"}
      </button>
    </form>
  );
}
