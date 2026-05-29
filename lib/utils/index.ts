import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function logServerError(error: any) {
  let errorMessage = error.message || "Something went wrong";
  let statusCode = 500;
  const timestamp = new Date().toISOString();

  if (axios.isAxiosError(error)) {
    const response = error.response;
    statusCode = response?.status || 500;

    // Custom error messages for metadata service
    if (error.code === "ECONNABORTED") errorMessage = "Request timeout";
    else if (response?.status === 404) errorMessage = "File not found";
    else if (response?.status === 401) errorMessage = "Unauthorized access";
    else if (response?.status && response.status >= 500)
      errorMessage = "Service unavailable";
    else errorMessage = response?.data || "Error occurred during the request";

    console.error(`\n[${timestamp}] HTTP Error:`, {
      url: error.config?.url,
      method: error.config?.method,
      headers: error.config?.headers,
      data: error.config?.data,
      status: statusCode,
      response: response?.data,
    });
  } else {
    console.error(`\n[${timestamp}] Runtime Error:`, error.message);
  }

  return { errorMessage, statusCode };
}
