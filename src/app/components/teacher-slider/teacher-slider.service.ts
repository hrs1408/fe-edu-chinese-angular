import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TeacherResponse } from '../../models/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class TeacherSliderService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  getTeachers(): Observable<TeacherResponse> {
    return this.http.get<TeacherResponse>(`${this.apiUrl}teachers/list?page=1&limit=100`);
  }
}
