import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

interface CategoryResponse {
  data: {
    id: number;
    name: string;
    type: number;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  getCategoriesCourseById(id: number): Observable<any> {
    return this.http.get<CategoryResponse>(`${this.apiUrl}category/list-by-type`, { params: { ct_type: id } });
  }
}
