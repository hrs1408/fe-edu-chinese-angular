import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  courseId!: number;
  course: any;
  isLoading = false;
  error: string | null = null;

  private categoryMap: { [key: number]: string } = {
    1: 'Khóa học sơ cấp',
    2: 'Khóa học trung cấp',
    3: 'Khóa học tiếng Trung du lịch'
  };

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId) {
      this.courseId = +courseId;
      this.loadCourseInfo();
    } else {
      this.error = 'Không tìm thấy thông tin khóa học';
    }
  }

  loadCourseInfo(): void {
    this.isLoading = true;
    this.error = null;

    this.courseService.getCourseById(this.courseId).subscribe({
      next: (response) => {
        this.course = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading course:', error);
        this.error = 'Có lỗi xảy ra khi tải thông tin khóa học. Vui lòng thử lại sau.';
        this.isLoading = false;
      }
    });
  }

  getCategoryName(categoryId: number): string {
    return this.categoryMap[categoryId] || 'Khóa học tiếng Trung';
  }

  getCourseLevel(course: Course): string {
    if (course.course_name.includes('HSK')) {
      return course.course_name;
    }
    return course.course_name.includes('1') ? 'Cơ bản' : 'Nâng cao';
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  }

  getImageUrl(image: any): string {
    return `https://lh3.googleusercontent.com/d/${image.drive_id}`;
  }
}
