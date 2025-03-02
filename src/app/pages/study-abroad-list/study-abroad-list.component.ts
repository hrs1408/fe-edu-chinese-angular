import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudyAbroadService } from '../../services/study-abroad.service';
import { CategoryService } from '../../services/category.service';
import { StudyAbroad } from '../../models/study-abroad';
import { Category } from '../../models/category';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-study-abroad-list',
  templateUrl: './study-abroad-list.component.html',
  styleUrls: ['./study-abroad-list.component.scss']
})
export class StudyAbroadListComponent implements OnInit {
  studyAbroads: StudyAbroad[] = [];
  categories: Category[] = [];
  currentPage = 1;
  totalPages = 1;
  isLoading = false;
  error: string | null = null;
  categoryId?: number;
  itemsPerPage = 10;
  totalItems = 0;

  constructor(
    private studyAbroadService: StudyAbroadService,
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
      const categoryId = params['category_id'];
      this.categoryId = categoryId ? +categoryId : undefined;
      this.currentPage = 1; // Reset về trang 1 khi thay đổi category
      this.loadStudyAbroads();
    });
  }

  loadCategories(): void {
    this.categoryService.getStudyAbroadCategories().subscribe({
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

  loadStudyAbroads(): void {
    this.isLoading = true;
    this.studyAbroadService.getStudyAbroads(this.currentPage, this.categoryId).subscribe({
      next: (response) => {
        if (!response.meta.error) {
          // Lọc chỉ lấy những bài viết có post_type là 'study_abroad'
          this.studyAbroads = response.data.filter(item => this.categories.some(category => category.id === item.category_id));

          // Tính toán phân trang
          if (this.categoryId) {
            // Nếu đang lọc theo danh mục, tính toán phân trang từ tổng số items
            this.totalItems = this.studyAbroads.length;
            this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
          } else {
            // Nếu đang xem tất cả, sử dụng phân trang từ API
            this.totalItems = this.studyAbroads.length * this.currentPage;
            this.totalPages = this.studyAbroads.length === this.itemsPerPage ? this.currentPage + 1 : this.currentPage;
          }
        } else {
          this.error = response.meta.message || 'Có lỗi xảy ra khi tải danh sách bài viết';
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading study abroads:', error);
        this.error = 'Có lỗi xảy ra khi tải danh sách bài viết. Vui lòng thử lại sau.';
        this.isLoading = false;
      }
    });
  }

  onCategoryChange(categoryId: number | undefined): void {
    this.categoryId = categoryId;
    // Cập nhật URL với query parameter mới
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: categoryId ? { category_id: categoryId } : {},
    }).then(() => {
      this.loadStudyAbroads();
    });
  }

  onPageChange(page: number): void {
    // Chỉ gọi API load lại dữ liệu khi không có category_id
    if (!this.categoryId) {
      this.currentPage = page;
      this.loadStudyAbroads();
      window.scrollTo(0, 0);
    } else {
      // Khi có category_id, chỉ cần cập nhật trang hiện tại và scroll lên đầu
      this.currentPage = page;
      window.scrollTo(0, 0);
    }
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

  getDescription(content: string): string {
    const div = document.createElement('div');
    div.innerHTML = content;
    const text = div.textContent || div.innerText || '';
    return text.length > 200 ? text.substring(0, 200) + '...' : text;
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  getCurrentPageItems(): StudyAbroad[] {
    if (!this.categoryId) {
      return this.studyAbroads;
    }
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.studyAbroads.slice(startIndex, startIndex + this.itemsPerPage);
  }
}
