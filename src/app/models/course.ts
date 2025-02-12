export interface Course {
  id: number;
  course_name: string;
  description: string;
  price: number;
  course_category: number;
  created_at: string;
  updated_at: string;
  image?: string;
  level?: string;
}

export interface CourseResponse {
  data: Course[];
  meta: {
    error: boolean;
    message: string | null;
  };
  status_code: number;
}
