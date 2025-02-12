import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService, Post } from '../../services/post.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post: Post | null = null;
  relatedPosts: Post[] = [];
  loading = true;
  safeContent: SafeHtml = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private sanitizer: DomSanitizer,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadPost(id);
      }
    });
  }

  private loadPost(id: string): void {
    this.loading = true;
    this.postService.getPostById(id).subscribe({
      next: (response: any) => {
        if (response?.data) {
          this.post = response.data;
          this.safeContent = this.sanitizer.bypassSecurityTrustHtml(response.data.content || '');
          this.loadRelatedPosts();
        } else {
          this.toastService.error('Không tìm thấy bài viết');
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading post:', error);
        this.toastService.error('Có lỗi xảy ra khi tải bài viết');
        this.loading = false;
      }
    });
  }

  private loadRelatedPosts(): void {
    if (this.post) {
      this.postService.getRelatedPosts(this.post.post_type, this.post.id.toString()).subscribe({
        next: (posts: any) => {
          this.relatedPosts = posts.data;
        },
        error: (error) => {
          console.error('Error loading related posts:', error);
          this.toastService.error('Có lỗi xảy ra khi tải bài viết liên quan');
        }
      });
    }
  }

  navigateToPost(postId: number): void {
    this.router.navigate(['/post', postId]).then(() => {
      window.scrollTo(0, 0);
    });
  }
}
