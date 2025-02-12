import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Post {
  id: number;
  title: string;
  description: string;
  image: {
    drive_id: string;
  };
  created_at: string;
  content: string;
  post_type: string;
  author: string;
  views: number;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPosts(page: number = 1, limit: number = 9): Observable<{data: Post[], total: number}> {
    return this.http.get<{data: Post[], total: number}>(`${this.apiUrl}posts/types/news?page=${page}&limit=${limit}`);
  }

  searchPosts(keyword: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}posts/search?q=${keyword}`);
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}posts/by-id/${id}`);
  }

  getRelatedPosts(postType: string, currentPostId: string, limit: number = 3): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}posts/types/${postType}?currentPostId=${currentPostId}&limit=${limit}`);
  }
}
