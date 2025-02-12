import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseResponse } from '../models/course';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCoursesByCategory(categoryId: number): Observable<CourseResponse> {
    return this.http.get<CourseResponse>(`${this.apiUrl}/course/list-by-course-category`, {
      params: { course_category: categoryId.toString() }
    });
  }

  getCourseById(courseId: number): Observable<CourseResponse> {
    return this.http.get<CourseResponse>(`${this.apiUrl}/course/${courseId}`);
  }
}
