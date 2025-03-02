export interface Category {
  id: number;
  ct_name: string;
  ct_type: number;
  created_at: string;
  updated_at: string;
}

export interface CategoryResponse {
  data: Category[];
  meta: {
    error: boolean;
    message: string | null;
  };
  status_code: number;
}
