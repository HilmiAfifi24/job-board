import { NextResponse } from "next/server";
import { API_CONFIG } from "@/lib/config";

/**
 * GET /api/categories
 * Proxy to backend: GET /api/categories
 */
export async function GET() {
  try {
    const response = await fetch(`${API_CONFIG.BACKEND_URL}/api/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(error, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
