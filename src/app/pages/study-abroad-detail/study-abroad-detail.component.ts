import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudyAbroadService } from '../../services/study-abroad.service';
import { StudyAbroad } from '../../models/study-abroad';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-study-abroad-detail',
  templateUrl: './study-abroad-detail.component.html',
  styleUrls: ['./study-abroad-detail.component.scss']
})
export class StudyAbroadDetailComponent implements OnInit {
  studyAbroad: StudyAbroad | null = null;
  isLoading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studyAbroadService: StudyAbroadService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.loadStudyAbroad(id);
      }
    });
  }

  loadStudyAbroad(id: number): void {
    this.isLoading = true;
    this.error = null;

    this.studyAbroadService.getStudyAbroadById(id).subscribe({
      next: (response) => {
        if (!response.meta.error && response.data) {
          this.studyAbroad = response.data;
        } else {
          this.error = 'Không tìm thấy bài viết';
          this.router.navigate(['/du-hoc-trung-quoc']);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading study abroad:', error);
        this.error = 'Có lỗi xảy ra khi tải bài viết. Vui lòng thử lại sau.';
        this.isLoading = false;
      }
    });
  }

  getImageUrl(image: any): string {
    if (!image) return 'assets/images/study-abroad-placeholder.jpg';
    return `https://lh3.googleusercontent.com/d/${image.drive_id}`;
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
