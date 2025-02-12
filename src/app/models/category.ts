export interface Category {
  id: number;
  ct_name: string;
  ct_description?: string;
  ct_type: number;
  ct_parent_id?: number;
  ct_image?: string;
  ct_icon?: string;
  ct_order?: number;
  ct_status?: number;
  created_at?: string;
  updated_at?: string;
}

export interface CategoryResponse {
  status: number;
  message: string;
  data: Category[];
}
