// ==================== Authentication ====================
export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: "artisan" | "admin";
  created_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface UserRegister {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

// ==================== Prediction ====================
export interface PredictionRequest {
  product_title: string;
  category: string;
  shop_name: string;
  title_length: number;
  keyword_count: number;
  rating_numeric: number;
  reviews_numeric: number;
  rating_score: number;
  popularity_index: number;
  material_cost: number;
  labor_hours: number;
  hourly_rate: number;
  overhead_cost: number;
}

export interface PredictionResponse {
  production_cost: number;
  predicted_price: number;
  minimum_price: number;
  recommended_price: number;
  premium_price: number;
  margin: number;
}

export interface Prediction extends PredictionRequest {
  id?: string;
  result?: PredictionResponse;
  created_at?: string;
  user_id?: string;
}

// ==================== Explainability ====================
export interface ExplainResponse {
  top_factors: Array<{
    feature: string;
    impact: number;
  }>;
}

// ==================== Simulation ====================
export interface SimulationRequest {
  original_request: PredictionRequest;
  modified_request: PredictionRequest;
}

export interface SimulationResponse {
  original_price: number;
  new_price: number;
  price_difference: number;
}

// ==================== Recommendations ====================
export interface RecommendationResponse {
  recommendations: string[];
}

// ==================== Statistics ====================
export interface Statistics {
  total_predictions: number;
  average_price: number;
  average_margin: number;
  total_profit: number;
  predictions_this_month: number;
  top_product_category: string;
}

// ==================== Dashboard State ====================
export interface DashboardContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  logout: () => void;
}
