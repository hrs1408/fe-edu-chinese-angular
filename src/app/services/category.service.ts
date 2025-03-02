import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, CategoryResponse } from '../models/category';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCategories(limit: number = 20): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(`${this.apiUrl}category/list-by-type?ct_type=20`);
  }

  getDocumentCategories(): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(`${this.apiUrl}category/list-by-type?ct_type=30`);
  }

  getStudyAbroadCategories(): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(`${this.apiUrl}category/list-by-type?ct_type=50`);
  }
}
