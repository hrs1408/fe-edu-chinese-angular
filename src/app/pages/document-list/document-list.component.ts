import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from '../../services/document.service';
import { CategoryService } from '../../services/category.service';
import { Document } from '../../models/document';
import { Category } from '../../models/category';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [];
  categories: Category[] = [];
  currentPage = 1;
  totalPages = 1;
  isLoading = false;
  error: string | null = null;
  categoryId?: number;
  itemsPerPage = 10;
  totalItems = 0;

  constructor(
    private documentService: DocumentService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    // Lấy danh sách danh mục
    this.loadCategories();

    // Lắng nghe query params để lấy category_id
    this.route.queryParams.subscribe(params => {
      this.categoryId = params['category_id'] ? +params['category_id'] : undefined;
      this.currentPage = 1; // Reset về trang 1 khi thay đổi category
      this.loadDocuments();
    });
  }

  loadCategories(): void {
    this.categoryService.getDocumentCategories().subscribe({
      next: (response) => {
        if (!response.meta.error) {
          this.categories = response.data;
        }
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  loadDocuments(): void {
    this.isLoading = true;
    this.error = null;

    this.documentService.getDocuments(this.currentPage, this.categoryId).subscribe({
      next: (response) => {
        if (!response.meta.error) {
          // Lọc chỉ lấy những document có post_type là 'document'
          this.documents = response.data.filter(doc => this.categories.some(category => category.id === doc.category_id));

          // Tính toán phân trang
          if (this.categoryId) {
            // Nếu đang lọc theo danh mục, tính toán phân trang từ tổng số items
            this.totalItems = this.documents.length;
            this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
          } else {
            // Nếu đang xem tất cả, sử dụng phân trang từ API
            this.totalItems = this.documents.length * this.currentPage; // Ước tính tổng số items
            this.totalPages = this.documents.length === this.itemsPerPage ? this.currentPage + 1 : this.currentPage;
          }
        } else {
          this.error = response.meta.message || 'Có lỗi xảy ra khi tải danh sách tài liệu';
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading documents:', error);
        this.error = 'Có lỗi xảy ra khi tải danh sách tài liệu. Vui lòng thử lại sau.';
        this.isLoading = false;
      }
    });
  }

  onCategoryChange(categoryId: number | undefined): void {
    // Nếu categoryId là undefined, xóa query param
    if (categoryId === undefined) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { category_id: null },
        queryParamsHandling: 'merge'
      });
    } else {
      // Nếu có categoryId, thêm vào query param
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { category_id: categoryId },
        queryParamsHandling: 'merge'
      });
    }
  }

  onPageChange(page: number): void {
    // Chỉ gọi API load lại dữ liệu khi không có category_id
    if (!this.categoryId) {
      this.currentPage = page;
      this.loadDocuments();
      window.scrollTo(0, 0);
    } else {
      // Khi có category_id, chỉ cần cập nhật trang hiện tại và scroll lên đầu
      this.currentPage = page;
      window.scrollTo(0, 0);
    }
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

  getDescription(content: string): string {
    // Tạo một div tạm thời để parse HTML
    const div = document.createElement('div');
    div.innerHTML = content;
    // Lấy text content và giới hạn độ dài
    const text = div.textContent || div.innerText || '';
    return text.length > 200 ? text.substring(0, 200) + '...' : text;
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  // Hàm lấy danh sách items cho trang hiện tại khi lọc theo danh mục
  getCurrentPageItems(): Document[] {
    if (!this.categoryId) {
      return this.documents;
    }
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.documents.slice(startIndex, startIndex + this.itemsPerPage);
  }
}
