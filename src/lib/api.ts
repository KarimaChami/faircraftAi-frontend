import {
  User,
  AuthResponse,
  UserRegister,
  PredictionRequest,
  PredictionResponse,
  ExplainResponse,
  SimulationRequest,
  SimulationResponse,
  RecommendationResponse,
  Statistics,
} from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// ==================== Utility Functions ====================

/**
 * Get JWT token from localStorage
 */
export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token");
  }
  return null;
};

/**
 * Store JWT token in localStorage
 */
export const setToken = (token: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("access_token", token);
  }
};

/**
 * Remove JWT token from localStorage
 */
export const removeToken = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token");
  }
};

/**
 * Check if token exists and is valid
 */
export const isTokenValid = (): boolean => {
  const token = getToken();
  if (!token) return false;

  try {
    // Decode JWT payload (without verification on client - should be done on server)
    const parts = token.split(".");
    if (parts.length !== 3) return false;

    const payload = JSON.parse(atob(parts[1]));
    const currentTime = Date.now() / 1000;

    return payload.exp > currentTime;
  } catch {
    return false;
  }
};

/**
 * Fetch wrapper with automatic token attachment
 */
const fetchAPI = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(typeof options.headers === "object" && options.headers !== null
      ? Object.fromEntries(Object.entries(options.headers))
      : {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || `API Error: ${response.status}`);
  }

  const data = await response.json();
  return data as T;
};

// ==================== Authentication Endpoints ====================

/**
 * Register a new user
 */
export const registerUser = async (data: UserRegister): Promise<User> => {
  return fetchAPI("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

/**
 * Login user
 */
export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const formData = new FormData();
  formData.append("username", email);
  formData.append("password", password);

  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  return response.json();
};

/**
 * Get current user profile
 */
export const getCurrentUser = async (): Promise<User> => {
  return fetchAPI("/auth/profile");
};

/**
 * Logout (client-side only)
 */
export const logoutUser = (): void => {
  removeToken();
};

// ==================== Prediction Endpoints ====================

/**
 * Make a price prediction
 */
export const predictPrice = async (
  data: PredictionRequest
): Promise<PredictionResponse> => {
  return fetchAPI("/api/v1/predict", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

/**
 * Get feature importance explanation
 */
export const explainPrediction = async (
  data: PredictionRequest
): Promise<ExplainResponse> => {
  return fetchAPI("/api/v1/explain", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

/**
 * Simulate price changes with different parameters
 */
export const simulatePrediction = async (
  data: SimulationRequest
): Promise<SimulationResponse> => {
  return fetchAPI("/api/v1/simulate", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

/**
 * Get AI recommendations
 */
export const getRecommendations = async (
  data: PredictionRequest
): Promise<RecommendationResponse> => {
  return fetchAPI("/api/v1/recommendations", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// ==================== Statistics Endpoints (Mock - to be replaced) ====================

/**
 * Get user statistics
 * Note: Backend endpoint not yet implemented, using mock data
 */
export const getStatistics = async (): Promise<Statistics> => {
  // TODO: Replace with actual backend endpoint once available
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        total_predictions: 47,
        average_price: 285.5,
        average_margin: 45.2,
        total_profit: 13425.75,
        predictions_this_month: 12,
        top_product_category: "Carpets",
      });
    }, 500);
  });
};

/**
 * Get prediction history
 * Note: Backend endpoint not yet implemented, using mock data
 */
export const getPredictionHistory = async (
  page: number = 1,
  limit: number = 10
): Promise<{ items: any[]; total: number }> => {
  // TODO: Replace with actual backend endpoint once available
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        items: [
          {
            id: "1",
            product_title: "Handmade Wool Carpet",
            category: "Carpets",
            shop_name: "Marrakech Crafts",
            predicted_price: 450,
            production_cost: 250,
            margin: 80,
            created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            status: "completed",
          },
          {
            id: "2",
            product_title: "Leather Babouche Slippers",
            category: "Footwear",
            shop_name: "Fez Leather Works",
            predicted_price: 65,
            production_cost: 35,
            margin: 85.7,
            created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            status: "completed",
          },
          {
            id: "3",
            product_title: "Argan Oil Bottle",
            category: "Beauty",
            shop_name: "Atlas Essentials",
            predicted_price: 28,
            production_cost: 12,
            margin: 133.3,
            created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            status: "completed",
          },
        ],
        total: 47,
      });
    }, 500);
  });
};
