export interface Teacher {
  id: number;
  tc_name: string;
  description?: string;
  image?: {
    id: number;
    drive_id: string;
    parent_id: number;
    file_name: string;
    file_type: string;
    created_at: string;
    updated_at: string;
  };
  created_at: string;
  updated_at: string;
}

export interface TeacherResponse {
  data: Teacher[];
  meta: {
    error: boolean;
    message?: string | null;
  };
  status_code: number;
}
