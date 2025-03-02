import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudyAbroad, StudyAbroadResponse } from '../models/study-abroad';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudyAbroadService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getStudyAbroads(page: number = 1, categoryId?: number): Observable<StudyAbroadResponse> {
    if (categoryId) {
      return this.http.get<StudyAbroadResponse>(`${this.apiUrl}posts/categories/${categoryId}`);
    } else {
      return this.http.get<StudyAbroadResponse>(`${this.apiUrl}posts/list?skip=${(page - 1) * 10}&limit=10`);
    }
  }

  getStudyAbroadById(id: number): Observable<{ data: StudyAbroad; meta: { error: boolean }; status_code: number }> {
    return this.http.get<{ data: StudyAbroad; meta: { error: boolean }; status_code: number }>(`${this.apiUrl}posts/by-id/${id}`);
  }
}
