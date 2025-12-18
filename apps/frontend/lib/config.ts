// API configuration
// Backend URL is only used on server-side, never exposed to client
export const API_CONFIG = {
  BACKEND_URL: process.env.BACKEND_URL || "http://localhost:4000",
  DEFAULT_LIMIT: 6,
} as const;
