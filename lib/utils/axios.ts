 import axios from "axios";

const axiosWithAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "",
  timeout: 600000
});

// Checks session storage if keycloak object is stored
const checkStorage = () => {
  let account: any = sessionStorage.getItem("account");
  try {
    if (account) {
      account = JSON.parse(account);
      if (account.token) return account;
    }
  } catch (error) {
    console.log(error);
  }
};

// Remove keycloak object from local storage
const handleLogout = () => {
  sessionStorage.removeItem("account");
};

// Request interceptor
axiosWithAuth.interceptors.request.use(
  (config) => {
    // (add headers, authentication tokens)
    const account = checkStorage();
 
    let accessToken;
    if (account && account.token) accessToken = account.token;
    // If token is present add it to request Authorization Header
    if (accessToken && config.headers) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }
    return config;
  },
  (error) => {
    // Normalize error structure
    const normalizedError = new Error(error.message || "Request configuration failed");
    return Promise.reject(normalizedError);
  }
);

// Response interceptor
axiosWithAuth.interceptors.response.use(
  (response) => {
    // Modify the response data here
    return response;
  },
  (error) => {
    let errorMessage = "Something went wrong.";

    if (typeof error.response === "undefined") {
      errorMessage = error.message || "Network error or request timeout";
      console.error(errorMessage);
    } else {
      if (error.response.status === 401) {
        errorMessage = error.response.data?.message || "Unauthorized access";
        window.location.href = "/";
        console.error(errorMessage);
      }
      if (error.response.status === 403) {
        errorMessage = error.response.data?.message || "Access forbidden";
        console.error(errorMessage);
        handleLogout();
        window.location.href = "/";
      }
      if (
        error.response.status >= 400 &&
        error.response.status !== 401 &&
        error.response.status !== 403
      ) {
        errorMessage =
          error.response.data?.error?.data?.message ||
          error.data?.message ||
          `Request failed with status ${error.response.status}`;
      }
    }

    // Create a normalized error object with message property
    const normalizedError = new Error(errorMessage);
    // Preserve original error properties if needed
    (normalizedError as any).originalError = error;
    (normalizedError as any).status = error.response?.status;

    return Promise.reject(normalizedError);
  }
);

export default axiosWithAuth;
