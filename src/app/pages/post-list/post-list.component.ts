import { Component, OnInit } from '@angular/core';
import { PostService, Post } from '../../services/post.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: any[] = [];
  currentPage = 1;
  totalPosts = 0;
  postsPerPage = 9;
  loading = false;
  searchControl = new FormControl('');

  constructor(
    private postService: PostService,
    private router: Router,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.loadPosts();
    this.setupSearch();
  }

  private setupSearch(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      if (value) {
        this.searchPosts(value);
      } else {
        this.loadPosts();
      }
    });
  }

  loadPosts(): void {
    this.loading = true;
    this.postService.getPosts(this.currentPage, this.postsPerPage)
      .subscribe({
        next: (response) => {
          this.posts = response.data;
          this.totalPosts = response.total;
          if (this.posts.length === 0) {
            this.toastService.info('Không có bài viết nào');
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading posts:', error);
          this.toastService.error('Có lỗi xảy ra khi tải danh sách bài viết');
          this.loading = false;
        }
      });
  }

  searchPosts(keyword: string): void {
    this.loading = true;
    this.postService.searchPosts(keyword)
      .subscribe({
        next: (posts) => {
          this.posts = posts;
          if (this.posts.length === 0) {
            this.toastService.info('Không tìm thấy bài viết nào phù hợp');
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Error searching posts:', error);
          this.toastService.error('Có lỗi xảy ra khi tìm kiếm bài viết');
          this.loading = false;
        }
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadPosts();
  }

  getPages(): number[] {
    const pageCount = Math.ceil(this.totalPosts / this.postsPerPage);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  readMore(post: any): void {
    this.router.navigate(['/post', post.id]);
  }
}
