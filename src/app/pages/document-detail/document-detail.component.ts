import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from '../../services/document.service';
import { Document } from '../../models/document';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.scss']
})
export class DocumentDetailComponent implements OnInit {
  document: Document | null = null;
  isLoading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private documentService: DocumentService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.loadDocument(id);
      }
    });
  }

  loadDocument(id: number): void {
    this.isLoading = true;
    this.error = null;

    this.documentService.getDocumentById(id).subscribe({
      next: (response) => {
        if (!response.meta.error && response.data) {
          this.document = response.data;
        } else {
          this.error = 'Không tìm thấy tài liệu';
          this.router.navigate(['/tai-lieu']);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading document:', error);
        this.error = 'Có lỗi xảy ra khi tải tài liệu. Vui lòng thử lại sau.';
        this.isLoading = false;
      }
    });
  }

  getImageUrl(image: any): string {
    if (!image) return 'assets/images/document-placeholder.jpg';
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
