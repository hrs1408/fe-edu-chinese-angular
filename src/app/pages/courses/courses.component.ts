import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { CourseService } from '../../services/course.service';
import { Category } from '../../models/category';
import { Course } from '../../models/course';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
interface CategoryInfo {
  icon: string;
  description: string;
  image: string;
}

interface CategoryWithCourses extends Category {
  courses?: Course[];
  isLoadingCourses?: boolean;
  courseError?: string;
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  categories: CategoryWithCourses[] = [];
  isLoading = true;
  error: string | null = null;
  id: number = 0;
  // Mapping thông tin bổ sung cho mỗi loại khóa học
  private categoryInfoMap: { [key: string]: CategoryInfo } = {
    'Khoá học sơ cấp': {
      icon: 'fas fa-graduation-cap',
      description: 'Dành cho người mới bắt đầu học tiếng Trung',
      image: 'https://images.unsplash.com/photo-1609678815645-6394fdb0566d?q=80&w=1000&auto=format&fit=crop'
    },
    'Khoá học trung cấp': {
      icon: 'fas fa-chart-line',
      description: 'Phù hợp với học viên đã có kiến thức cơ bản',
      image: 'https://images.unsplash.com/photo-1612859840586-0d68e50ef211?q=80&w=1000&auto=format&fit=crop'
    },
    'Khoá học tiếng trung du lịch': {
      icon: 'fas fa-plane',
      description: 'Trang bị kỹ năng giao tiếp cho người đi du lịch và công tác',
      image: 'https://images.unsplash.com/photo-1540820658620-e933c0ec78aa?q=80&w=1000&auto=format&fit=crop'
    }
  };

  constructor(
    private categoryService: CategoryService,
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    //bắt sự kiện khi id thay đổi để load lại danh sách khoá học
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.loadCategories();
    });
  }

  loadCategories(): void {
    this.isLoading = true;
    this.error = null;

    this.categoryService.getCategories(20).subscribe({
      next: (response) => {
        this.categories = response.data.map(category => ({
          ...category,
          ct_icon: this.categoryInfoMap[category.ct_name]?.icon || 'fas fa-book',
          ct_description: this.categoryInfoMap[category.ct_name]?.description || 'Khóa học tiếng Trung chất lượng cao',
          isLoadingCourses: true
        }));
        this.isLoading = false;
        if (this.id) {
          this.categories = this.categories.filter(category => category.id == this.id);
        }
        this.categories.forEach(category => {
          this.loadCoursesForCategory(category);
        });
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.error = 'Có lỗi xảy ra khi tải danh sách khóa học. Vui lòng thử lại sau.';
        this.isLoading = false;
      }
    });
  }

  loadCoursesForCategory(category: CategoryWithCourses): void {
    category.isLoadingCourses = true;
    category.courseError = undefined;

    this.courseService.getCoursesByCategory(category.id).subscribe({
      next: (response) => {
        category.courses = response.data.map(course => ({
          ...course,
          level: this.getCourseLevel(course)
        }));
        category.isLoadingCourses = false;
      },
      error: (error) => {
        console.error(`Error loading courses for category ${category.id}:`, error);
        category.courseError = 'Không thể tải danh sách khóa học. Vui lòng thử lại sau.';
        category.isLoadingCourses = false;
      }
    });
  }

  retryLoadCourses(category: CategoryWithCourses): void {
    this.loadCoursesForCategory(category);
  }

  getCategoryIcon(categoryName: string): string {
    return this.categoryInfoMap[categoryName]?.icon || 'fas fa-book';
  }

  getCategoryDescription(categoryName: string): string {
    return this.categoryInfoMap[categoryName]?.description || 'Khóa học tiếng Trung chất lượng cao';
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  }

  getCourseImage(course: Course, categoryName: string): string {
    return this.categoryInfoMap[categoryName]?.image || 'assets/images/course-placeholder.jpg';
  }

  getCourseLevel(course: Course): string {
    if (course.course_name.includes('HSK')) {
      return course.course_name;
    }
    return course.course_name.includes('1') ? 'Cơ bản' : 'Nâng cao';
  }
}
