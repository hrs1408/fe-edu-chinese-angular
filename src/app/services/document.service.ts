import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Document, DocumentResponse } from '../models/document';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDocuments(page: number = 1, categoryId?: number): Observable<DocumentResponse> {
    if (categoryId) {
      // Nếu có categoryId, sử dụng API lấy theo danh mục
      return this.http.get<DocumentResponse>(`${this.apiUrl}posts/categories/${categoryId}`);
    } else {
      // Nếu không có categoryId, lấy tất cả
      return this.http.get<DocumentResponse>(`${this.apiUrl}posts/list?skip=${(page - 1) * 10}&limit=10`);
    }
  }

  getDocumentById(id: number): Observable<{ data: Document; meta: { error: boolean }; status_code: number }> {
    return this.http.get<{ data: Document; meta: { error: boolean }; status_code: number }>(`${this.apiUrl}posts/by-id/${id}`);
  }
}
